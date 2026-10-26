import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const SERVICE_REDIRECTS = [
  "joint-injections",
  "trigger-point-injections",
  "nutritional-ivs",
  "bioidentical-hormone-replacement-therapy",
  "gainswave",
  "medical-weight-loss",
];

const CONDITION_REDIRECTS = [
  "neuropathy",
  "joint-pain",
  "knee-pain",
  "pain-relief",
  "sexual-dysfunction",
  "hormonal-imbalance",
  "neck-pain",
];

const nextConfig: NextConfig = {
  // Match the live site's URL structure (e.g. /about/, /services/chiropractic-care/)
  trailingSlash: true,
  outputFileTracingExcludes: {
    "*": ["./public/images/**", "./public/**/*.mp4", "./public/**/*.webm"],
  },
  outputFileTracingIncludes: {
    "/admin/**/*": [
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
      "./node_modules/sharp/**/*",
    ],
  },
  serverExternalPackages: [
    "pg",
    "@payloadcms/db-vercel-postgres",
    "@neondatabase/serverless",
    "@vercel/postgres",
    "sharp",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
  async redirects() {
    return [
      ...SERVICE_REDIRECTS.map((slug) => ({
        source: `/${slug}/`,
        destination: `/services/${slug}/`,
        permanent: true,
      })),
      ...CONDITION_REDIRECTS.map((slug) => ({
        source: `/${slug}/`,
        destination: `/conditions-treated/${slug}/`,
        permanent: true,
      })),
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
