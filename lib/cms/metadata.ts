import type { Metadata } from "next";
import { isHiddenBlogPath, findDocForMetadata, type CmsDoc } from "./queries";
import { absoluteSiteUrl, normalizePath } from "./path";
import { cmsConfiguredForRequest, withCMS } from "./safe";

function fullTitle(title: string): string {
  if (title.includes("Ascension Health")) return title;
  return `${title} | Ascension Health`;
}

function metadataFromDoc(doc: CmsDoc, fallback: Metadata): Metadata {
  const meta = doc.meta ?? {};
  const titleSource = meta.title || doc.title || "";
  const description = meta.description || doc.excerpt || undefined;
  const rawCanonical = meta.canonicalUrl || doc.path || undefined;
  const canonical =
    rawCanonical && /^https?:\/\//i.test(rawCanonical)
      ? absoluteSiteUrl(rawCanonical)
      : rawCanonical;
  const next: Metadata = { ...fallback };

  if (titleSource) {
    const absolute = fullTitle(titleSource);
    next.title = { absolute };
  }
  if (description) next.description = description;
  if (canonical) {
    const previous =
      fallback.alternates && typeof fallback.alternates === "object" ? fallback.alternates : {};
    next.alternates = { ...previous, canonical };
  }
  if (meta.noIndex || meta.noFollow) {
    next.robots = {
      index: !meta.noIndex,
      follow: !meta.noFollow,
    };
  }

  const ogTitle = titleSource ? fullTitle(titleSource) : undefined;
  if (ogTitle || description || canonical) {
    const previousOg =
      fallback.openGraph && typeof fallback.openGraph === "object" ? fallback.openGraph : {};
    next.openGraph = {
      ...previousOg,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(description ? { description } : {}),
      ...(canonical ? { url: absoluteSiteUrl(canonical) } : {}),
    };
    const previousTwitter =
      fallback.twitter && typeof fallback.twitter === "object" ? fallback.twitter : {};
    next.twitter = {
      ...previousTwitter,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(description ? { description } : {}),
    };
  }

  return next;
}

/**
 * Published CMS meta wins. Otherwise the existing hardcoded metadata is returned unchanged.
 * Drafts are read only while Next draft mode is on.
 */
export async function withCmsMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  const normalized = normalizePath(path);
  if (!cmsConfiguredForRequest()) return fallback;
  if (isHiddenBlogPath(normalized)) return fallback;
  const doc = await withCMS(() => findDocForMetadata(normalized), null);
  if (!doc) return fallback;
  return metadataFromDoc(doc, fallback);
}
