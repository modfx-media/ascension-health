import type { Metadata } from "next";

import { CmsOnlyPage, cmsOnlyMetadata } from "@/components/cms/cmsOnly";
import { normalizePath } from "@/lib/cms/path";

type Params = { service: string; city: string; rest: string[] };

function toPath(params: Params): string {
  return normalizePath(["", params.service, params.city, ...params.rest].filter(Boolean).join("/"));
}

export const dynamicParams = true;

export function generateStaticParams(): { service: string; city: string; rest: string[] }[] {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return cmsOnlyMetadata(toPath(await params));
}

export default async function CmsDeepPage({ params }: { params: Promise<Params> }) {
  return <CmsOnlyPage path={toPath(await params)} />;
}
