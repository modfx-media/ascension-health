import type { Metadata } from "next";

import { mergeCmsMetadata } from "./mergeDesigned";
import { isHiddenBlogPath, findDocForMetadata } from "./queries";
import { normalizePath } from "./path";
import { cmsConfiguredForRequest, withCMS } from "./safe";

/**
 * Published CMS meta wins field by field. A set meta.title is rendered
 * verbatim as the absolute document title (and as og:title / twitter:title);
 * the layout template does not append a brand suffix and the text is not
 * truncated. Empty meta leaves the hardcoded metadata untouched. Drafts are
 * read only while Next draft mode is on.
 */
export async function withCmsMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  const normalized = normalizePath(path);
  if (!cmsConfiguredForRequest()) return fallback;
  if (isHiddenBlogPath(normalized)) return fallback;
  const doc = await withCMS(() => findDocForMetadata(normalized), null);
  if (!doc) return fallback;
  return mergeCmsMetadata(fallback, doc, normalized);
}
