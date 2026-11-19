import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isDesignedPath } from "@/lib/cms/designed-routes";
import { mergeCmsMetadata, pageHasRealContent } from "@/lib/cms/mergeDesigned";
import { findDocForMetadata, type CmsDoc } from "@/lib/cms/queries";
import { withCMS } from "@/lib/cms/safe";
import { CMSPageView } from "./CMSPageView";

async function loadRenderableDoc(path: string): Promise<CmsDoc | null> {
  if (isDesignedPath(path)) return null;
  const doc = await withCMS(() => findDocForMetadata(path), null);
  if (!doc || !pageHasRealContent(doc)) return null;
  return doc;
}

export async function cmsOnlyMetadata(path: string): Promise<Metadata> {
  const doc = await loadRenderableDoc(path);
  if (!doc) {
    return {
      title: { absolute: "404: This page could not be found." },
      robots: { index: false, follow: true },
    };
  }
  const base: Metadata = {
    title: typeof doc.title === "string" && doc.title.trim() ? doc.title : "Page",
  };
  return mergeCmsMetadata(base, doc, path);
}

export async function CmsOnlyPage({ path }: { path: string }) {
  const doc = await loadRenderableDoc(path);
  if (!doc) notFound();
  return <CMSPageView doc={doc} />;
}
