import type { MetadataRoute } from "next";
import { BLOG_PUBLIC } from "@/lib/blog-visibility";
import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: BLOG_PUBLIC ? ["/api/"] : ["/api/", "/blog/"],
    },
    sitemap: `${resolvePublicSiteOrigin()}/sitemap.xml`,
  };
}
