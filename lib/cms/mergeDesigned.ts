import type { Metadata } from "next";

import { absoluteSiteUrl } from "./path";

/**
 * Payload stays the data plane. A designed route always renders its own
 * component. A document may fill SEO and schema fields that are actually
 * set. It must not replace the page with the generic renderer.
 */

export const TITLE_TEMPLATE_SUFFIX = " | Ascension Health";

const GOOGLEBOT_DIRECTIVES = {
  "max-image-preview": "large" as const,
  "max-snippet": -1 as const,
  "max-video-preview": -1 as const,
};

export type RoutedDocLike = {
  collection: "pages" | "posts";
  doc: Record<string, unknown>;
} | null;

export type RoutedBody = "designed" | "generic" | "none";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function nonEmpty(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") return undefined;
  return trimmed;
}

/** Title string for the page segment. The layout template adds the suffix. */
export function titleForTemplate(title: string): string {
  return title.endsWith(TITLE_TEMPLATE_SUFFIX)
    ? title.slice(0, -TITLE_TEMPLATE_SUFFIX.length)
    : title;
}

function readJsonObject(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    try {
      return readJsonObject(JSON.parse(trimmed) as unknown);
    } catch {
      return undefined;
    }
  }
  if (!isRecord(value) || Object.keys(value).length === 0) return undefined;
  return value;
}

export type CmsImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export function readCmsImage(value: unknown): CmsImage | undefined {
  if (typeof value === "number") return undefined;
  if (typeof value === "string") {
    const url = nonEmpty(value);
    return url ? { url } : undefined;
  }
  if (!isRecord(value)) return undefined;
  const url = nonEmpty(value.url);
  if (!url) return undefined;
  const alt = nonEmpty(value.alt);
  const width = typeof value.width === "number" ? value.width : undefined;
  const height = typeof value.height === "number" ? value.height : undefined;
  return {
    url,
    ...(alt ? { alt } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };
}

export type CmsSeoFields = {
  title?: string;
  description?: string;
  image?: CmsImage;
  canonicalUrl?: string;
  schemaType?: string;
  breadcrumbLabel?: string;
  noIndex: boolean;
  noFollow: boolean;
  jsonLd?: Record<string, unknown>;
};

function asRecord(doc: object | null | undefined): Record<string, unknown> | null {
  if (!doc) return null;
  return doc as Record<string, unknown>;
}

export function readCmsSeo(doc: object | null | undefined): CmsSeoFields {
  const record = asRecord(doc);
  const meta = isRecord(record?.meta) ? record.meta : {};
  const jsonLd =
    readJsonObject(meta.jsonLd) ??
    readJsonObject(meta.schema) ??
    readJsonObject(record?.jsonLd) ??
    readJsonObject(record?.schema);
  const canonical = nonEmpty(meta.canonicalUrl);

  return {
    title: nonEmpty(meta.title),
    description: nonEmpty(meta.description),
    image: readCmsImage(meta.image),
    canonicalUrl: canonical
      ? canonical.startsWith("http://") || canonical.startsWith("https://")
        ? absoluteSiteUrl(canonical)
        : absoluteSiteUrl(canonical.startsWith("/") ? canonical : `/${canonical}`)
      : undefined,
    schemaType: nonEmpty(meta.schemaType) ?? nonEmpty(record?.schemaType),
    breadcrumbLabel: nonEmpty(meta.breadcrumbLabel) ?? nonEmpty(record?.breadcrumbLabel),
    noIndex: meta.noIndex === true,
    noFollow: meta.noFollow === true,
    jsonLd,
  };
}

function nodeHasText(node: unknown): boolean {
  if (typeof node === "string") return Boolean(nonEmpty(node));
  if (Array.isArray(node)) return node.some((child) => nodeHasText(child));
  if (!isRecord(node)) return false;
  if (typeof node.text === "string" && node.text.trim()) return true;
  if (Array.isArray(node.children) && node.children.some((child) => nodeHasText(child))) {
    return true;
  }
  if ("root" in node) return nodeHasText(node.root);
  return false;
}

export function pageLayoutHasContent(doc: object): boolean {
  const record = doc as Record<string, unknown>;
  if (!Array.isArray(record.layout)) return false;
  return record.layout.some((block) => {
    if (!isRecord(block)) return false;
    const type = nonEmpty(block.blockType);
    if (type === "cta") {
      return Boolean(nonEmpty(block.heading) || nonEmpty(block.body) || nonEmpty(block.label));
    }
    if (type === "content") return nodeHasText(block.body);
    return Object.entries(block).some(([key, value]) => {
      if (key === "blockType" || key === "id" || key === "blockName") return false;
      return typeof value === "string" ? Boolean(nonEmpty(value)) : nodeHasText(value);
    });
  });
}

/** Real body copy. A title or excerpt alone is not content. */
export function pageHasRealContent(doc: object | null | undefined): boolean {
  if (!doc) return false;
  const record = doc as Record<string, unknown>;
  if (pageLayoutHasContent(record)) return true;
  return nodeHasText(record.content);
}

/**
 * Designed pages win even when a published doc is empty or only a thin
 * imported body. The generic renderer is reserved for paths with no
 * designed page and real content.
 */
export function selectRoutedBody(input: {
  hasDesignedPage: boolean;
  doc: RoutedDocLike;
}): RoutedBody {
  if (input.hasDesignedPage) return "designed";
  if (!input.doc) return "none";
  return pageHasRealContent(input.doc.doc) ? "generic" : "none";
}

export function cmsOnlyDocIsRenderable(doc: RoutedDocLike): doc is NonNullable<RoutedDocLike> {
  return selectRoutedBody({ hasDesignedPage: false, doc }) !== "none";
}

/** Public visitors never see a draft. Draft mode can. */
export function docVisibleForRequest<T extends { _status?: "draft" | "published" | null }>(
  doc: T | null | undefined,
  draftMode: boolean,
): T | null {
  if (!doc) return null;
  if (!draftMode && doc._status && doc._status !== "published") return null;
  return doc;
}

function patchOpenGraph(
  current: Metadata["openGraph"],
  patch: Record<string, unknown>,
): Metadata["openGraph"] {
  if (current && typeof current === "object" && !Array.isArray(current)) {
    return { ...current, ...patch };
  }
  return { type: "website", ...patch };
}

function patchTwitter(
  current: Metadata["twitter"],
  patch: Record<string, unknown>,
): Metadata["twitter"] {
  if (current && typeof current === "object") return { ...current, ...patch };
  return { card: "summary_large_image", ...patch };
}

function patchRobots(
  current: Metadata["robots"],
  noIndex: boolean,
  noFollow: boolean,
): Metadata["robots"] {
  const base =
    current && typeof current === "object" ? { ...current } : { index: true, follow: true };
  if (noIndex) base.index = false;
  if (noFollow) base.follow = false;
  const previousBot =
    base.googleBot && typeof base.googleBot === "object" ? base.googleBot : {};
  base.googleBot = {
    ...GOOGLEBOT_DIRECTIVES,
    ...previousBot,
    ...(noIndex ? { index: false as const } : {}),
    ...(noFollow ? { follow: false as const } : {}),
  };
  return base;
}

/**
 * Overlay only meta fields an editor actually set. The document title and
 * excerpt are not SEO fields. Unchecked robots flags leave the hardcoded
 * robots and googleBot tags unchanged. The title stays a string so the
 * layout template (`%s | Ascension Health`) still supplies the suffix.
 */
export function mergeCmsMetadata(
  fallback: Metadata,
  doc: object | null | undefined,
  path = "/",
): Metadata {
  void path;
  if (!doc) return fallback;
  const seo = readCmsSeo(doc);
  if (
    !seo.title &&
    !seo.description &&
    !seo.canonicalUrl &&
    !seo.image &&
    !seo.noIndex &&
    !seo.noFollow
  ) {
    return fallback;
  }

  let next: Metadata = { ...fallback };
  if (seo.title) {
    const title = titleForTemplate(seo.title);
    next = {
      ...next,
      title,
      openGraph: patchOpenGraph(next.openGraph, { title }),
      twitter: patchTwitter(next.twitter, { title }),
    };
  }
  if (seo.description) {
    next = {
      ...next,
      description: seo.description,
      openGraph: patchOpenGraph(next.openGraph, { description: seo.description }),
      twitter: patchTwitter(next.twitter, { description: seo.description }),
    };
  }
  if (seo.canonicalUrl) {
    next = {
      ...next,
      alternates: { ...next.alternates, canonical: seo.canonicalUrl },
      openGraph: patchOpenGraph(next.openGraph, { url: seo.canonicalUrl }),
    };
  }
  if (seo.image) {
    const image = {
      url: seo.image.url,
      ...(seo.image.alt ? { alt: seo.image.alt } : {}),
      ...(seo.image.width ? { width: seo.image.width } : {}),
      ...(seo.image.height ? { height: seo.image.height } : {}),
    };
    next = {
      ...next,
      openGraph: patchOpenGraph(next.openGraph, { images: [image] }),
      twitter: patchTwitter(next.twitter, { images: [seo.image.url] }),
    };
  }
  if (seo.noIndex || seo.noFollow) {
    next = { ...next, robots: patchRobots(next.robots, seo.noIndex, seo.noFollow) };
  }
  return next;
}

/** Page JSON-LD only when a schema field is set. SEO-only edits do not add a script. */
export function cmsSchemaJsonLd(
  path: string,
  doc: object | null | undefined,
): Record<string, unknown> | null {
  if (!doc) return null;
  const seo = readCmsSeo(doc);
  if (!seo.schemaType && !seo.breadcrumbLabel && !seo.jsonLd) return null;
  const url = seo.canonicalUrl ?? absoluteSiteUrl(path);
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#cms`,
    url,
  };
  const next: Record<string, unknown> = seo.jsonLd ? { ...base, ...seo.jsonLd } : { ...base };
  if (seo.schemaType) next["@type"] = seo.schemaType;
  if (seo.title) next.name = titleForTemplate(seo.title);
  if (seo.description) next.description = seo.description;
  if (seo.breadcrumbLabel) next.alternateName = seo.breadcrumbLabel;
  if (seo.image) next.image = seo.image.url;
  if (seo.canonicalUrl) {
    next.url = seo.canonicalUrl;
    if (!seo.jsonLd || next["@id"] === `${url}#cms` || String(next["@id"]).endsWith("#cms")) {
      next["@id"] = `${seo.canonicalUrl}#cms`;
    }
  }
  return next;
}
