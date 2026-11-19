import { headers } from "next/headers";

import { isDesignedPath } from "@/lib/cms/designed-routes";
import { pageHasRealContent } from "@/lib/cms/mergeDesigned";
import { normalizePath } from "@/lib/cms/path";
import { findPublishedOverlay } from "@/lib/cms/queries";
import { cmsConfiguredForRequest, withCMS } from "@/lib/cms/safe";
import { CMSPageView } from "./CMSPageView";

/**
 * Designed routes always render their page component, in draft preview and
 * after publish. A CMS document may only supply SEO and schema data.
 * The generic view is for a path with no designed page and real content.
 */
export async function CMSRoute({ children }: { children: React.ReactNode }) {
  if (!cmsConfiguredForRequest()) return children;

  const headerList = await headers();
  const rawPath = headerList.get("x-pathname");
  if (!rawPath) return children;

  const path = normalizePath(rawPath);
  if (isDesignedPath(path)) return children;

  const doc = await withCMS(() => findPublishedOverlay(path), null);
  if (!doc || !pageHasRealContent(doc)) return children;
  return <CMSPageView doc={doc} />;
}
