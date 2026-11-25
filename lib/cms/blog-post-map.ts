import type { BlogAuthor, BlogBlock, BlogPost } from "@/lib/blog";

/**
 * Public blog posts are the designed `BlogPost` shape plus the SEO fields
 * the detail page uses as metadata. Components only read the `BlogPost` fields.
 */
export type PublishedBlogPost = BlogPost & {
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    excludeFromSitemap?: boolean;
  };
};

export const FALLBACK_AUTHOR: BlogAuthor = {
  name: "Ascension Health",
  role: "Chiropractic & Wellness Team",
  bio: "Fernley’s trusted team for chiropractic care, joint injections, hormone therapy and medical weight loss, helping Northern Nevada live pain-free.",
};

export const FALLBACK_COVER = "/images/blog/default-cover.jpg";

const REMOTE_COVER_HOSTS = ["images.unsplash.com", "picsum.photos"];

export function blogSlugFromLookup(input: string): string {
  const trimmed = input.trim();
  const bare = (trimmed.split("?")[0]?.split("#")[0] ?? trimmed).replace(/\/+$/, "");
  const path = bare.startsWith("/") ? bare : `/${bare}`;
  const parts = path.split("/").filter(Boolean).map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  });
  if (parts[0] === "blog" && parts[1]) return parts[1];
  return parts[parts.length - 1] ?? bare.replace(/^\/+/, "");
}

/** Publish date is in the future. Date-only values are UTC midnight. */
export function isFuturePublished(publishedAt: string | null | undefined, now: Date = new Date()): boolean {
  if (!publishedAt) return false;
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return false;
  return date.getTime() > now.getTime();
}

const SAME_ORIGIN_COVER_HOSTS = new Set(["ascensionhealthnv.com", "www.ascensionhealthnv.com"]);

const MEDIA_FILE_PATH = /^\/api\/media\/file\/([^/]+)$/;

function hostnameFromSiteUrl(value: string | null | undefined): string | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const host = new URL(withProtocol).hostname.toLowerCase().replace(/\.$/, "");
    return host || null;
  } catch {
    return null;
  }
}

function isSameOriginCoverHost(hostname: string, siteUrl: string | null | undefined): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (SAME_ORIGIN_COVER_HOSTS.has(host)) return true;
  const configured = hostnameFromSiteUrl(siteUrl);
  return configured !== null && host === configured;
}

function safeMediaFilePath(pathname: string): string | null {
  const match = MEDIA_FILE_PATH.exec(pathname);
  const encoded = match?.[1];
  if (!encoded) return null;
  let name: string;
  try {
    name = decodeURIComponent(encoded);
  } catch {
    return null;
  }
  if (!name || name === "." || name === ".." || /[/\\]/.test(name) || name.includes("\0")) return null;
  return pathname;
}

/**
 * Payload stores live covers as absolute same-origin file URLs. next/image
 * 400s those because the site host is not in images.remotePatterns, so they
 * become `/api/media/file/<name>` before render. Returns null otherwise.
 */
export function rewriteSameOriginCoverSrc(
  src: string,
  siteUrl: string | null | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string | null {
  try {
    const url = new URL(src);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!isSameOriginCoverHost(url.hostname, siteUrl)) return null;
    return safeMediaFilePath(url.pathname);
  } catch {
    return null;
  }
}

/**
 * Sources next/image can render as-is. Relative paths are same-origin.
 * Absolute same-origin media URLs stay rejected here; rewrite them first.
 */
export function isAllowedCoverSrc(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    if (REMOTE_COVER_HOSTS.includes(host)) return true;
    return host.endsWith(".blob.vercel-storage.com") || host.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function readingMinutes(blocks: BlogBlock[]): number {
  const words = blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
        case "heading":
        case "quote":
          return block.text;
        case "callout":
          return `${block.title ?? ""} ${block.body}`;
        case "list":
          return block.items.join(" ");
        default:
          return "";
      }
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function inferCategory(title: string): string {
  const t = title.toLowerCase();
  if (/sciatica|piriformis/.test(t)) return "Sciatica";
  if (/headache|migraine/.test(t)) return "Headaches";
  if (/hormone|bhrt/.test(t)) return "Hormone Health";
  if (/weight|diet/.test(t)) return "Weight Loss";
  if (/shoulder/.test(t)) return "Shoulder Pain";
  if (/knee/.test(t)) return "Knee Pain";
  if (/neck/.test(t)) return "Neck Pain";
  if (/chiropractic|adjustment|spine|back|decompression/.test(t)) return "Chiropractic Care";
  return "Wellness";
}

function textOf(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const record = node as Record<string, unknown>;
  if (typeof record.text === "string") return record.text;
  if (record.type === "linebreak") return " ";
  if (record.type === "link" || record.type === "autolink") {
    const fields = record.fields && typeof record.fields === "object" ? (record.fields as Record<string, unknown>) : {};
    const href = typeof fields.url === "string" ? fields.url : typeof record.url === "string" ? record.url : "";
    const label = Array.isArray(record.children) ? record.children.map(textOf).join("") : "";
    if (href && label.trim()) return `[${label.trim()}](${href})`;
    return label;
  }
  if (Array.isArray(record.children)) return record.children.map(textOf).join("");
  return "";
}

export function lexicalToBlocks(content: unknown): BlogBlock[] {
  if (!content || typeof content !== "object") return [];
  const root = (content as { root?: { children?: unknown[] } }).root;
  if (!root || !Array.isArray(root.children)) return [];
  const blocks: BlogBlock[] = [];
  for (const node of root.children) {
    if (!node || typeof node !== "object") continue;
    const record = node as Record<string, unknown>;
    const type = record.type;
    if (type === "heading") {
      const text = textOf(node).trim();
      if (!text) continue;
      blocks.push({ type: "heading", level: record.tag === "h3" ? 3 : 2, text });
      continue;
    }
    if (type === "list") {
      const items = Array.isArray(record.children)
        ? record.children.map((item) => textOf(item).trim()).filter(Boolean)
        : [];
      if (!items.length) continue;
      blocks.push({
        type: "list",
        style: record.listType === "number" ? "number" : "bullet",
        items,
      });
      continue;
    }
    if (type === "quote") {
      const text = textOf(node).trim();
      if (text) blocks.push({ type: "quote", text });
      continue;
    }
    const text = textOf(node).trim();
    if (text) blocks.push({ type: "paragraph", text });
  }
  return blocks;
}

function asBlocks(value: unknown): BlogBlock[] | null {
  let data = value;
  if (typeof data === "string") {
    const trimmed = data.trim();
    if (!trimmed) return null;
    try {
      data = JSON.parse(trimmed) as unknown;
    } catch {
      return null;
    }
  }
  if (!Array.isArray(data)) return null;
  const blocks: BlogBlock[] = [];
  for (const item of data) {
    if (!item || typeof item !== "object") continue;
    const block = item as Record<string, unknown>;
    if (block.type === "paragraph" && typeof block.text === "string") {
      blocks.push({ type: "paragraph", text: block.text });
    } else if (block.type === "heading" && typeof block.text === "string") {
      blocks.push({ type: "heading", text: block.text, level: block.level === 3 ? 3 : 2 });
    } else if (block.type === "list" && Array.isArray(block.items)) {
      const items = block.items.filter((entry): entry is string => typeof entry === "string");
      if (items.length) {
        blocks.push({ type: "list", items, style: block.style === "number" ? "number" : "bullet" });
      }
    } else if (block.type === "quote" && typeof block.text === "string") {
      blocks.push({
        type: "quote",
        text: block.text,
        ...(typeof block.attribution === "string" ? { attribution: block.attribution } : {}),
      });
    } else if (block.type === "callout" && typeof block.body === "string") {
      const variant = block.variant === "tip" || block.variant === "warning" || block.variant === "info" ? block.variant : undefined;
      blocks.push({
        type: "callout",
        body: block.body,
        ...(typeof block.title === "string" ? { title: block.title } : {}),
        ...(variant ? { variant } : {}),
      });
    } else if (block.type === "divider") {
      blocks.push({ type: "divider" });
    } else if (block.type === "cta") {
      blocks.push({
        type: "cta",
        ...(typeof block.heading === "string" ? { heading: block.heading } : {}),
        ...(typeof block.body === "string" ? { body: block.body } : {}),
        ...(typeof block.buttonLabel === "string" ? { buttonLabel: block.buttonLabel } : {}),
        ...(typeof block.buttonHref === "string" ? { buttonHref: block.buttonHref } : {}),
      });
    } else if (block.type === "image" && (typeof block.src === "string") && typeof block.alt === "string") {
      blocks.push({
        type: "image",
        src: block.src,
        alt: block.alt,
        ...(typeof block.caption === "string" ? { caption: block.caption } : {}),
      });
    }
  }
  return blocks.length ? blocks : null;
}

export type PayloadPostLike = {
  title?: string | null;
  slug?: string | null;
  path?: string | null;
  excerpt?: string | null;
  lede?: string | null;
  category?: { name?: string | null } | number | null;
  author?: { name?: string | null; role?: string | null; bio?: string | null } | number | null;
  tags?: string[] | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  readingMinutes?: number | null;
  coverAlt?: string | null;
  coverSrc?: string | null;
  cover?: { url?: string | null; alt?: string | null } | number | null;
  relatedSlugs?: string[] | null;
  legacyBlocks?: unknown;
  content?: unknown;
  meta?: {
    title?: string | null;
    description?: string | null;
    canonicalUrl?: string | null;
    noIndex?: boolean | null;
    noFollow?: boolean | null;
    excludeFromSitemap?: boolean | null;
  } | null;
  _status?: "draft" | "published" | null;
};

function nonEmpty(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function coverFromDoc(doc: PayloadPostLike, title: string): { src: string; alt: string } {
  const alt = nonEmpty(doc.coverAlt) || (doc.cover && typeof doc.cover === "object" ? nonEmpty(doc.cover.alt) : undefined) || title;
  const remote = doc.cover && typeof doc.cover === "object" ? nonEmpty(doc.cover.url) : undefined;
  const stored = nonEmpty(doc.coverSrc);
  const candidate = remote || (stored ? (stored.startsWith("/") || stored.startsWith("http") ? stored : `/${stored}`) : undefined);
  if (!candidate) return { src: FALLBACK_COVER, alt };
  const rewritten = rewriteSameOriginCoverSrc(candidate) ?? candidate;
  if (isAllowedCoverSrc(rewritten)) return { src: rewritten, alt };
  return { src: FALLBACK_COVER, alt };
}

export function payloadDocToBlogPost(doc: PayloadPostLike): PublishedBlogPost | null {
  if (doc._status && doc._status !== "published") return null;
  const slug = nonEmpty(doc.slug) ? blogSlugFromLookup(doc.slug as string) : doc.path ? blogSlugFromLookup(doc.path) : "";
  const title = nonEmpty(doc.title);
  if (!slug || !title) return null;

  const legacy = asBlocks(doc.legacyBlocks);
  const content = legacy ?? lexicalToBlocks(doc.content);
  const excerpt = nonEmpty(doc.excerpt) || nonEmpty(doc.meta?.description) || nonEmpty(doc.lede) || title;
  const category =
    doc.category && typeof doc.category === "object" ? nonEmpty(doc.category.name) : undefined;
  const authorRecord = doc.author && typeof doc.author === "object" ? doc.author : undefined;
  const authorName = nonEmpty(authorRecord?.name);
  const tags = (doc.tags ?? []).filter((tag): tag is string => typeof tag === "string" && Boolean(tag.trim()));
  const related = (doc.relatedSlugs ?? []).map((value) => (typeof value === "string" ? blogSlugFromLookup(value) : "")).filter(Boolean);
  const publishedAt = nonEmpty(doc.publishedAt) || nonEmpty(doc.createdAt) || nonEmpty(doc.updatedAt) || "";
  const seoTitle = nonEmpty(doc.meta?.title);
  const seoDescription = nonEmpty(doc.meta?.description);
  const canonicalUrl = nonEmpty(doc.meta?.canonicalUrl);
  const seo =
    seoTitle || seoDescription || canonicalUrl || doc.meta?.noIndex || doc.meta?.noFollow || doc.meta?.excludeFromSitemap
      ? {
          ...(seoTitle ? { title: seoTitle } : {}),
          ...(seoDescription ? { description: seoDescription } : {}),
          ...(canonicalUrl ? { canonicalUrl } : {}),
          ...(doc.meta?.noIndex ? { noIndex: true } : {}),
          ...(doc.meta?.noFollow ? { noFollow: true } : {}),
          ...(doc.meta?.excludeFromSitemap ? { excludeFromSitemap: true } : {}),
        }
      : undefined;

  return {
    slug,
    title,
    excerpt,
    category: category || inferCategory(title),
    ...(tags.length ? { tags } : {}),
    publishedAt,
    ...(nonEmpty(doc.updatedAt) ? { updatedAt: nonEmpty(doc.updatedAt) } : {}),
    readingMinutes:
      typeof doc.readingMinutes === "number" && doc.readingMinutes > 0
        ? doc.readingMinutes
        : readingMinutes(content),
    cover: coverFromDoc(doc, title),
    author: authorName
      ? {
          name: authorName,
          ...(nonEmpty(authorRecord?.role) ? { role: nonEmpty(authorRecord?.role) } : {}),
          ...(nonEmpty(authorRecord?.bio) ? { bio: nonEmpty(authorRecord?.bio) } : {}),
        }
      : FALLBACK_AUTHOR,
    ...(nonEmpty(doc.lede) ? { lede: nonEmpty(doc.lede) } : {}),
    content,
    ...(related.length ? { related } : {}),
    ...(seo ? { seo } : {}),
  };
}

/**
 * Local posts fill gaps. A Payload post with the same slug replaces the
 * local one, keeping the designed cover when Payload has no renderable image
 * and the local body when Payload has no blocks.
 */
export function mergeBlogPosts(localPosts: BlogPost[], payloadPosts: PublishedBlogPost[]): PublishedBlogPost[] {
  const bySlug = new Map<string, PublishedBlogPost>();
  for (const post of localPosts) bySlug.set(post.slug, post);
  for (const post of payloadPosts) {
    const local = bySlug.get(post.slug);
    if (!local) {
      bySlug.set(post.slug, post);
      continue;
    }
    const payloadHasCover = typeof post.cover.src === "string" && post.cover.src !== FALLBACK_COVER;
    bySlug.set(post.slug, {
      ...local,
      ...post,
      excerpt: post.excerpt || local.excerpt,
      category: post.category || local.category,
      tags: post.tags?.length ? post.tags : local.tags,
      publishedAt: post.publishedAt || local.publishedAt,
      updatedAt: post.updatedAt ?? local.updatedAt,
      readingMinutes: post.readingMinutes || local.readingMinutes,
      cover: payloadHasCover ? post.cover : local.cover,
      author: post.author?.name ? post.author : local.author,
      lede: post.lede || local.lede,
      content: post.content.length ? post.content : local.content,
      related: post.related?.length ? post.related : local.related,
      seo: post.seo,
    });
  }
  return [...bySlug.values()]
    .map(ensureBody)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

function ensureBody(post: PublishedBlogPost): PublishedBlogPost {
  if (post.content.length || !post.excerpt) return post;
  return { ...post, content: [{ type: "paragraph", text: post.excerpt }] };
}

export function isIndexableBlogPost(post: PublishedBlogPost): boolean {
  return !post.seo?.noIndex && !post.seo?.excludeFromSitemap;
}
