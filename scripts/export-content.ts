import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { blocksToLexical } from "../lib/cms/lexical";
import { SITE } from "../lib/navigation";

type BlogAuthor = {
  name: string;
  role?: string;
  bio?: string;
};

type BlogBlock = {
  type: string;
  text?: string;
  level?: 2 | 3;
  items?: string[];
  style?: string;
  attribution?: string;
  title?: string;
  body?: string;
  heading?: string;
  buttonLabel?: string;
  buttonHref?: string;
  alt?: string;
  caption?: string;
  src?: string | { src?: string };
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  cover: { src: string | { src?: string }; alt: string };
  author: BlogAuthor;
  lede?: string;
  content: BlogBlock[];
  related?: string[];
};

export type ContentRecord = {
  collection: "posts" | "pages" | "categories" | "authors";
  legacyId: string;
  sourceUrl?: string | null;
  data: Record<string, unknown>;
};

export type ContentExport = {
  version: 1;
  records: ContentRecord[];
  globals: {
    header: Record<string, unknown>;
    footer: Record<string, unknown>;
    "site-settings": Record<string, unknown>;
  };
};

const SITE_ORIGIN = "https://ascensionhealthnv.com";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function imageSrc(src: string | { src?: string } | undefined): string {
  if (!src) return "";
  if (typeof src === "string") return src;
  return src.src ?? "";
}

function serializeBlock(block: BlogBlock): BlogBlock {
  if (block.type !== "image") return block;
  return { ...block, src: imageSrc(block.src) };
}

async function loadPosts(): Promise<{ posts: BlogPost[]; author: BlogAuthor }> {
  const source = readFileSync(path.resolve("lib/blog.ts"), "utf8");
  const transformed = source.replace(
    /import\s+(\w+)\s+from\s+"(@\/images\/[^"]+)"\s*;?/g,
    (_match, name: string, spec: string) =>
      `const ${name} = { src: ${JSON.stringify(spec.replace("@/", ""))} };`,
  );
  const file = path.join(os.tmpdir(), "ascension-blog-export.ts");
  writeFileSync(file, transformed);
  const mod = (await import(pathToFileURL(file).href)) as {
    BLOG_POSTS: BlogPost[];
    DEFAULT_AUTHOR: BlogAuthor;
  };
  return { posts: mod.BLOG_POSTS, author: mod.DEFAULT_AUTHOR };
}

function pageFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...pageFiles(full));
    else if (entry === "page.tsx") out.push(full);
  }
  return out;
}

function routeFromFile(file: string): string | null {
  const rel = file.split(`app${path.sep}(site)${path.sep}`)[1] ?? "";
  if (rel.includes("[")) return null;
  const route = rel.replace(/page\.tsx$/, "").replaceAll(path.sep, "/");
  if (route === "" || route === "/") return "/";
  return `/${route.replace(/\/$/, "")}/`;
}

function firstString(source: string, key: string): string | undefined {
  const match = source.match(new RegExp(`${key}:\\s*(?:\\n\\s*)?["'\`]([^"'\`]*)["'\`]`));
  return match?.[1];
}

function pageRecords(): ContentRecord[] {
  const records: ContentRecord[] = [];
  for (const file of pageFiles(path.resolve("app/(site)"))) {
    const route = routeFromFile(file);
    if (!route || route.startsWith("/next/")) continue;
    const source = readFileSync(file, "utf8");
    const title =
      firstString(source, "title") ||
      (route === "/"
        ? "Chiropractor & Wellness Clinic in Fernley, NV | Ascension Health"
        : route);
    const description =
      firstString(source, "description") ||
      (route === "/"
        ? "Chiropractic care, joint injections and medical weight loss in Fernley, NV. Same-week appointments, insurance accepted. Book online today."
        : "");
    records.push({
      collection: "pages",
      legacyId: `page:${route}`,
      sourceUrl: `${SITE_ORIGIN}${route === "/" ? "/" : route}`,
      data: {
        title,
        path: route,
        slug: route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replaceAll("/", "-"),
        excerpt: description,
      },
    });
  }
  return records;
}

async function main() {
  const { posts, author } = await loadPosts();
  const categories = [...new Set(posts.map((post) => post.category))].sort();
  const records: ContentRecord[] = [];

  records.push({
    collection: "authors",
    legacyId: "author:ascension-health",
    sourceUrl: SITE_ORIGIN,
    data: {
      name: author.name,
      slug: "ascension-health",
      role: author.role ?? "",
      bio: author.bio ?? "",
    },
  });

  for (const name of categories) {
    const slug = slugify(name);
    records.push({
      collection: "categories",
      legacyId: `category:${slug}`,
      sourceUrl: null,
      data: { name, slug },
    });
  }

  for (const post of posts) {
    const categorySlug = slugify(post.category);
    records.push({
      collection: "posts",
      legacyId: `post:${post.slug}`,
      sourceUrl: `${SITE_ORIGIN}/blog/${post.slug}/`,
      data: {
        title: post.title,
        slug: post.slug,
        path: `/blog/${post.slug}/`,
        excerpt: post.excerpt,
        lede: post.lede ?? "",
        categoryLegacyId: `category:${categorySlug}`,
        authorLegacyId: "author:ascension-health",
        tags: post.tags ?? [],
        publishedAt: post.publishedAt,
        readingMinutes: post.readingMinutes,
        coverAlt: post.cover.alt,
        coverSrc: imageSrc(post.cover.src),
        relatedSlugs: post.related ?? [],
        legacyBlocks: post.content.map(serializeBlock),
        content: blocksToLexical(post.content),
      },
    });
  }

  records.push(...pageRecords());

  const exported: ContentExport = {
    version: 1,
    records,
    globals: {
      header: { nav: [] },
      footer: { links: [], blurb: "" },
      "site-settings": {
        siteName: "Ascension Health",
        phone: SITE.phone,
        phoneHref: SITE.phoneHref,
        address: SITE.address,
        hours: SITE.hours,
        facebook: SITE.social.facebook,
        twitter: SITE.social.twitter,
        google: SITE.social.google,
      },
    },
  };

  mkdirSync("data", { recursive: true });
  writeFileSync("data/content-export.json", `${JSON.stringify(exported, null, 2)}\n`);
  const postCount = records.filter((record) => record.collection === "posts").length;
  console.log(
    `wrote data/content-export.json posts=${postCount} records=${records.length}`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
