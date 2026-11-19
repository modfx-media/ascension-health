import { headers } from "next/headers";

import { cmsSchemaJsonLd } from "@/lib/cms/mergeDesigned";
import { normalizePath } from "@/lib/cms/path";
import { findDocForMetadata } from "@/lib/cms/queries";
import { cmsConfiguredForRequest, withCMS } from "@/lib/cms/safe";

function ldJson(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

/**
 * Extra JSON-LD only when a schema field is set on the document.
 * SEO title and description edits do not add a tag.
 */
export async function CmsSchemaOverlay() {
  if (!cmsConfiguredForRequest()) return null;
  const headerList = await headers();
  const rawPath = headerList.get("x-pathname");
  if (!rawPath) return null;
  const path = normalizePath(rawPath);
  const doc = await withCMS(() => findDocForMetadata(path), null);
  const data = cmsSchemaJsonLd(path, doc);
  if (!data) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />
  );
}
