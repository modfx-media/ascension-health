import { draftMode } from "next/headers";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { BLOG_PUBLIC } from "@/lib/blog-visibility";
import { normalizePath } from "./path";
import { withCMS } from "./safe";

export type CmsSeo = {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  excludeFromSitemap?: boolean | null;
};

export type CmsDoc = {
  id?: string | number;
  title?: string | null;
  path?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: unknown;
  _status?: "draft" | "published" | null;
  meta?: CmsSeo | null;
  updatedAt?: string;
  nav?: { label?: string | null; href?: string | null }[] | null;
  links?: { label?: string | null; href?: string | null }[] | null;
  blurb?: string | null;
};

let payloadClient: Promise<Payload> | null = null;

export function getPayloadClient(): Promise<Payload> {
  if (!payloadClient) {
    payloadClient = getPayload({ config }).catch((error: unknown) => {
      payloadClient = null;
      throw error;
    });
  }
  return payloadClient;
}

async function readDraftMode(): Promise<boolean> {
  try {
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

export function isHiddenBlogPath(path: string): boolean {
  if (BLOG_PUBLIC) return false;
  return path === "/blog/" || path.startsWith("/blog/");
}

function visibleDoc(doc: CmsDoc | null | undefined, draft: boolean): CmsDoc | null {
  if (!doc) return null;
  if (!draft && doc._status && doc._status !== "published") return null;
  return doc;
}

async function findOne(
  collection: "pages" | "posts",
  path: string,
  draft: boolean,
): Promise<CmsDoc | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection,
    depth: 0,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      path: {
        equals: path,
      },
    },
  });
  return visibleDoc((result.docs[0] as CmsDoc | undefined) ?? null, draft);
}

export async function findPublishedOverlay(path: string): Promise<CmsDoc | null> {
  const normalized = normalizePath(path);
  if (isHiddenBlogPath(normalized)) return null;
  const draft = await readDraftMode();
  if (normalized.startsWith("/blog/") && normalized !== "/blog/") {
    return findOne("posts", normalized, draft);
  }
  const page = await findOne("pages", normalized, draft);
  if (page) return page;
  if (BLOG_PUBLIC && normalized === "/blog/") return null;
  return page;
}

export async function findDocForMetadata(path: string): Promise<CmsDoc | null> {
  return findPublishedOverlay(path);
}

export type SitemapCmsEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
};

function skippedBySeo(doc: CmsDoc): boolean {
  return Boolean(doc.meta?.noIndex || doc.meta?.excludeFromSitemap);
}

export async function getPublishedSitemapPaths(): Promise<SitemapCmsEntry[]> {
  const payload = await getPayloadClient();
  const [pages, posts] = await Promise.all([
    payload.find({
      collection: "pages",
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: "published" } },
    }),
    payload.find({
      collection: "posts",
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: "published" } },
    }),
  ]);

  const entries: SitemapCmsEntry[] = [];
  for (const doc of [...pages.docs, ...posts.docs] as CmsDoc[]) {
    if (!doc.path || skippedBySeo(doc)) continue;
    const path = normalizePath(doc.path);
    if (isHiddenBlogPath(path)) continue;
    entries.push({
      path,
      priority: path.startsWith("/blog/") ? 0.7 : 0.6,
      changeFrequency: path.startsWith("/blog/") ? "weekly" : "monthly",
    });
  }
  return entries;
}

export async function safeSitemapEntries(): Promise<SitemapCmsEntry[]> {
  return withCMS(() => getPublishedSitemapPaths(), []);
}

type HeaderDoc = {
  _status?: "draft" | "published" | null;
  nav?: { label?: string | null; href?: string | null; children?: { label?: string | null; href?: string | null }[] | null }[] | null;
  phone?: string | null;
  phoneHref?: string | null;
  address?: string | null;
};

type FooterDoc = {
  _status?: "draft" | "published" | null;
  blurb?: string | null;
  links?: { label?: string | null; href?: string | null }[] | null;
  phone?: string | null;
  address?: string | null;
};

export async function getPublishedHeader(): Promise<HeaderDoc | null> {
  const payload = await getPayloadClient();
  const draft = await readDraftMode();
  const doc = (await payload.findGlobal({
    slug: "header",
    depth: 0,
    draft,
    overrideAccess: draft,
  })) as HeaderDoc | null;
  if (!doc) return null;
  if (!draft && doc._status && doc._status !== "published") return null;
  const nav = (doc.nav ?? []).filter((item) => item?.label && item?.href);
  if (nav.length === 0) return null;
  return doc;
}

export async function getPublishedFooter(): Promise<FooterDoc | null> {
  const payload = await getPayloadClient();
  const draft = await readDraftMode();
  const doc = (await payload.findGlobal({
    slug: "footer",
    depth: 0,
    draft,
    overrideAccess: draft,
  })) as FooterDoc | null;
  if (!doc) return null;
  if (!draft && doc._status && doc._status !== "published") return null;
  const links = (doc.links ?? []).filter((item) => item?.label && item?.href);
  if (!doc.blurb && links.length === 0) return null;
  return doc;
}
