import { headers } from "next/headers";
import { CMSPageView } from "./CMSPageView";
import { normalizePath } from "@/lib/cms/path";
import { findPublishedOverlay } from "@/lib/cms/queries";
import { cmsConfiguredForRequest, withCMS } from "@/lib/cms/safe";

/**
 * Published Payload document replaces the designed page.
 * Anything else, including a down database, renders the existing page.
 */
export async function CMSRoute({ children }: { children: React.ReactNode }) {
  if (!cmsConfiguredForRequest()) return children;

  const headerList = await headers();
  const rawPath = headerList.get("x-pathname");
  if (!rawPath) return children;

  const path = normalizePath(rawPath);
  const doc = await withCMS(() => findPublishedOverlay(path), null);
  if (!doc) return children;
  return <CMSPageView doc={doc} />;
}
