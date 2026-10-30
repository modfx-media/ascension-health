import type { Metadata } from "next";
import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";
import { missingPayloadEnv } from "@/lib/cms/required-env";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> | Metadata => {
  if (missingPayloadEnv().length) {
    return { title: "Payload admin is not configured", robots: { index: false, follow: false } };
  }
  return generatePageMetadata({ config, params, searchParams });
};

const Page = ({ params, searchParams }: Args) => {
  if (missingPayloadEnv().length) return null;
  return RootPage({ config, params, searchParams, importMap });
};

export default Page;
