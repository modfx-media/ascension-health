import type { MetadataRoute } from "next";
import { BLOG_PUBLIC } from "@/lib/blog-visibility";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: BLOG_PUBLIC ? ["/api/"] : ["/api/", "/blog/"],
    },
    sitemap: "https://ascensionhealthnv.com/sitemap.xml",
  };
}
