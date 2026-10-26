import { readFileSync } from "node:fs";
import type { ContentExport } from "./export-content";

type Manifest = {
  urls: string[];
};

function blogSlugsFromSource(): string[] {
  const source = readFileSync("lib/blog.ts", "utf8");
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]!);
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const exported = JSON.parse(readFileSync("data/content-export.json", "utf8")) as ContentExport;
const manifest = JSON.parse(readFileSync("migration-data/url-manifest.json", "utf8")) as Manifest;

if (exported.version !== 1) fail(`export version ${exported.version} is not 1`);
if (!Array.isArray(exported.records)) fail("export.records is missing");
if (!exported.globals || typeof exported.globals !== "object") fail("export.globals is missing");

const posts = exported.records.filter((record) => record.collection === "posts");
function normalizeUrl(url: string): string {
  const parsed = new URL(url);
  let pathname = parsed.pathname || "/";
  if (!pathname.endsWith("/")) pathname += "/";
  return `${parsed.origin}${pathname}`;
}

const covered = new Set<string>();
for (const record of posts) {
  const data = record.data as { slug?: string; path?: string };
  if (record.sourceUrl) covered.add(normalizeUrl(record.sourceUrl));
  if (data.path) covered.add(normalizeUrl(`https://ascensionhealthnv.com${data.path}`));
  if (data.slug) covered.add(normalizeUrl(`https://ascensionhealthnv.com/blog/${data.slug}/`));
}

const manifestBlogUrls = manifest.urls.filter((url) => {
  try {
    const pathname = new URL(url).pathname;
    return pathname === "/blog" || pathname === "/blog/" || pathname.startsWith("/blog/");
  } catch {
    return false;
  }
});

const missingManifest = manifestBlogUrls.filter((url) => !covered.has(normalizeUrl(url)));
if (missingManifest.length) {
  fail(`export is missing ${missingManifest.length} manifest blog URLs:\n${missingManifest.join("\n")}`);
}

const slugs = blogSlugsFromSource();
const missingSlugs = slugs.filter(
  (slug) => !posts.some((record) => (record.data as { slug?: string }).slug === slug),
);
if (missingSlugs.length) {
  fail(`export is missing hardcoded blog posts:\n${missingSlugs.join("\n")}`);
}

console.log(
  `cms:validate-export ok posts=${posts.length} manifestBlogUrls=${manifestBlogUrls.length} hardcodedSlugs=${slugs.length}`,
);
