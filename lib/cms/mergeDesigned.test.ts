import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Metadata } from "next";

import { PSEO_CONDITIONS, PSEO_SERVICES } from "@/lib/pSEO-data";
import { PSEO_TARGET_CITIES, PSEO_TREATMENT_PAGES } from "@/lib/pSEO-routing";
import { isDesignedPath } from "./designed-routes";
import {
  TITLE_TEMPLATE_SUFFIX,
  cmsOnlyDocIsRenderable,
  cmsSchemaJsonLd,
  docVisibleForRequest,
  mergeCmsMetadata,
  pageHasRealContent,
  selectRoutedBody,
  titleForTemplate,
  type RoutedDocLike,
} from "./mergeDesigned";
import { pathsToRevalidate } from "./revalidate";

const ABOUT_DESCRIPTION =
  "Our mission at Ascension Health is to provide excellent chiropractic care in Fernley, NV. We assess the patient as a whole and lead you into a lifestyle of being pain free. Call (775) 575-9922.";

const LAYOUT_TITLE = "Chiropractor & Wellness Clinic in Fernley, NV | Ascension Health";

const LAYOUT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const ABOUT: Metadata = {
  title: "About Ascension Health in Fernley, NV",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "https://ascensionhealthnv.com/about/" },
  openGraph: {
    title: "About Ascension Health in Fernley, NV",
    description: ABOUT_DESCRIPTION,
    url: "https://ascensionhealthnv.com/about/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ascension Health in Fernley, NV",
    description: ABOUT_DESCRIPTION,
  },
};

const emptyLexical = {
  root: {
    type: "root",
    children: [{ type: "paragraph", children: [{ type: "text", text: "   " }] }],
  },
};

const thinLexical = {
  root: {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Imported excerpt paragraph." }],
      },
    ],
  },
};

function aboutDoc(input: {
  status: "draft" | "published";
  meta?: Record<string, unknown>;
  content?: unknown;
  layout?: unknown;
}): RoutedDocLike {
  return {
    collection: "pages",
    doc: {
      title: "About Ascension Health",
      path: "/about/",
      excerpt: "Imported excerpt that must not become the meta description.",
      _status: input.status,
      meta: input.meta ?? {},
      content: input.content === undefined ? emptyLexical : input.content,
      ...(input.layout === undefined ? {} : { layout: input.layout }),
    },
  };
}

function ogField(meta: Metadata, key: "title" | "description" | "url"): unknown {
  const og = meta.openGraph;
  if (!og || Array.isArray(og)) return undefined;
  return og[key];
}

function twitterField(meta: Metadata, key: "title" | "description"): unknown {
  const twitter = meta.twitter;
  if (!twitter || typeof twitter !== "object") return undefined;
  return twitter[key];
}

function resolvedTitle(title: Metadata["title"]): string {
  if (typeof title === "string") return `${title}${TITLE_TEMPLATE_SUFFIX}`;
  if (title && typeof title === "object" && "absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  if (title && typeof title === "object" && "default" in title && typeof title.default === "string") {
    return title.default;
  }
  return LAYOUT_TITLE;
}

function robotsTags(robots: Metadata["robots"] | undefined): { robots: string; googlebot: string } {
  const source =
    robots && typeof robots === "object" ? robots : (LAYOUT_ROBOTS as Exclude<Metadata["robots"], string | null | undefined>);
  const index = source.index === false ? "noindex" : "index";
  const follow = source.follow === false ? "nofollow" : "follow";
  const bot = source.googleBot && typeof source.googleBot === "object" ? source.googleBot : {};
  const directives = [
    bot.index === false ? "noindex" : bot.index === true ? "index" : "",
    bot.follow === false ? "nofollow" : bot.follow === true ? "follow" : "",
    bot["max-video-preview"] != null ? `max-video-preview:${bot["max-video-preview"]}` : "",
    bot["max-image-preview"] ? `max-image-preview:${bot["max-image-preview"]}` : "",
    bot["max-snippet"] != null ? `max-snippet:${bot["max-snippet"]}` : "",
  ].filter(Boolean);
  return {
    robots: `${index}, ${follow}`,
    googlebot: directives.join(", "),
  };
}

function headTags(meta: Metadata): string[] {
  const title = resolvedTitle(meta.title);
  const description = typeof meta.description === "string" ? meta.description : "";
  const canonical =
    meta.alternates && typeof meta.alternates === "object" && "canonical" in meta.alternates
      ? String(meta.alternates.canonical ?? "")
      : "";
  const robots = robotsTags(meta.robots);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}"/>`,
    `<meta property="og:title" content="${String(ogField(meta, "title") ?? "")}"/>`,
    `<meta property="og:description" content="${String(ogField(meta, "description") ?? "")}"/>`,
    `<meta name="twitter:title" content="${String(twitterField(meta, "title") ?? "")}"/>`,
    `<meta name="twitter:description" content="${String(twitterField(meta, "description") ?? "")}"/>`,
    `<meta name="robots" content="${robots.robots}"/>`,
    `<meta name="googlebot" content="${robots.googlebot}"/>`,
    `<link rel="canonical" href="${canonical}"/>`,
  ];
}

function renderChoice(hasDesignedPage: boolean, doc: RoutedDocLike): string {
  const body = selectRoutedBody({ hasDesignedPage, doc });
  const designed = createElement("article", { id: "designed-about" }, "Our Mission");
  const generic = createElement("article", { id: "generic" }, "About Ascension Health");
  const node = body === "designed" ? designed : body === "generic" ? generic : null;
  return renderToStaticMarkup(createElement(Fragment, null, node));
}

test("published page with an empty or thin body still renders the designed component", () => {
  const empty = aboutDoc({ status: "published", layout: [] });
  const thin = aboutDoc({
    status: "published",
    content: thinLexical,
    layout: [
      { blockType: "content", body: thinLexical },
      { blockType: "cta", heading: "Request an appointment", label: "Book" },
    ],
  });
  assert.equal(pageHasRealContent(empty!.doc), false);
  assert.equal(pageHasRealContent(thin!.doc), true);
  assert.equal(selectRoutedBody({ hasDesignedPage: true, doc: empty }), "designed");
  assert.equal(selectRoutedBody({ hasDesignedPage: true, doc: thin }), "designed");

  const html = renderChoice(true, thin);
  assert.match(html, /id="designed-about"/);
  assert.match(html, /Our Mission/);
  assert.doesNotMatch(html, /id="generic"/);
});

test("draft docs do not change the public head, and empty published meta matches it", () => {
  const draft = aboutDoc({
    status: "draft",
    meta: { description: "Draft description that must stay off the public page." },
    content: thinLexical,
  });
  assert.equal(docVisibleForRequest(draft!.doc, false), null);
  assert.equal(renderChoice(true, draft), renderChoice(true, null));

  const publishedEmpty = aboutDoc({
    status: "published",
    meta: { title: "  ", description: "", noIndex: false, noFollow: false },
  });
  publishedEmpty!.doc.title = "Document title that must not become the meta title";
  const merged = mergeCmsMetadata(ABOUT, publishedEmpty!.doc, "/about/");
  assert.equal(merged, ABOUT);
  assert.equal(headTags(merged).join("\n"), headTags(ABOUT).join("\n"));
  assert.equal(cmsSchemaJsonLd("/about/", publishedEmpty!.doc), null);
  assert.match(headTags(ABOUT).join("\n"), /<title>About Ascension Health in Fernley, NV \| Ascension Health<\/title>/);
  assert.match(headTags(ABOUT).join("\n"), /max-image-preview:large/);
});

test("a meta description edit changes only the description tags", () => {
  const doc = aboutDoc({
    status: "published",
    meta: { description: "SEO description edited in Payload." },
    content: thinLexical,
  });
  const merged = mergeCmsMetadata(ABOUT, doc!.doc, "/about/");
  const before = headTags(ABOUT);
  const after = headTags(merged);
  const changed = after.filter((tag, index) => tag !== before[index]);
  assert.deepEqual(changed, [
    '<meta name="description" content="SEO description edited in Payload."/>',
    '<meta property="og:description" content="SEO description edited in Payload."/>',
    '<meta name="twitter:description" content="SEO description edited in Payload."/>',
  ]);
  assert.equal(ogField(merged, "title"), ogField(ABOUT, "title"));
  assert.equal(twitterField(merged, "title"), twitterField(ABOUT, "title"));
  assert.equal(resolvedTitle(merged.title), resolvedTitle(ABOUT.title));
  assert.equal(merged.robots, undefined);
  assert.equal(cmsSchemaJsonLd("/about/", doc!.doc), null);
  assert.equal(renderChoice(true, doc), renderChoice(true, null));
});

test("title, canonical, image, and robots overlay only the fields that are set", () => {
  const titled = mergeCmsMetadata(
    ABOUT,
    {
      title: "Document title",
      excerpt: "Excerpt",
      path: "/about/",
      meta: { title: "New about title | Ascension Health" },
    },
    "/about/",
  );
  assert.equal(titled.title, "New about title");
  assert.equal(titleForTemplate("New about title | Ascension Health"), "New about title");
  assert.equal(resolvedTitle(titled.title), `New about title${TITLE_TEMPLATE_SUFFIX}`);
  assert.equal(ogField(titled, "title"), "New about title");
  assert.equal(titled.description, ABOUT.description);
  assert.equal(titled.robots, undefined);

  const canonical = mergeCmsMetadata(
    ABOUT,
    { path: "/ignored/", meta: { canonicalUrl: "/about-the-clinic/" } },
    "/about/",
  );
  assert.equal(
    canonical.alternates && "canonical" in canonical.alternates
      ? canonical.alternates.canonical
      : undefined,
    "https://ascensionhealthnv.com/about-the-clinic/",
  );
  assert.equal(canonical.title, ABOUT.title);
  assert.equal(canonical.description, ABOUT.description);

  const untouched = mergeCmsMetadata(
    ABOUT,
    { title: "Document title", excerpt: "Excerpt", path: "/about/", meta: {} },
    "/about/",
  );
  assert.equal(untouched, ABOUT);

  const image = mergeCmsMetadata(
    ABOUT,
    { meta: { image: { url: "https://cdn.example.com/about.jpg", alt: "Clinic", width: 1200, height: 630 } } },
    "/about/",
  );
  const og = image.openGraph;
  assert.ok(og && !Array.isArray(og) && Array.isArray(og.images));
  assert.deepEqual(og && !Array.isArray(og) ? og.images?.[0] : undefined, {
    url: "https://cdn.example.com/about.jpg",
    alt: "Clinic",
    width: 1200,
    height: 630,
  });
  assert.equal(image.title, ABOUT.title);
  assert.equal(image.description, ABOUT.description);

  const blocked = mergeCmsMetadata(ABOUT, { meta: { image: 42 } }, "/about/");
  assert.equal(blocked, ABOUT);

  const robots = mergeCmsMetadata(
    { ...ABOUT, robots: LAYOUT_ROBOTS },
    { meta: { noIndex: true, noFollow: false } },
    "/about/",
  );
  const nextRobots = robots.robots;
  assert.ok(nextRobots && typeof nextRobots === "object");
  if (nextRobots && typeof nextRobots === "object") {
    assert.equal(nextRobots.index, false);
    assert.equal(nextRobots.follow, true);
    assert.ok(nextRobots.googleBot && typeof nextRobots.googleBot === "object");
    if (nextRobots.googleBot && typeof nextRobots.googleBot === "object") {
      assert.equal(nextRobots.googleBot.index, false);
      assert.equal(nextRobots.googleBot["max-image-preview"], "large");
      assert.equal(nextRobots.googleBot["max-snippet"], -1);
      assert.equal(nextRobots.googleBot["max-video-preview"], -1);
    }
  }
});

test("schema JSON-LD is added only for schema fields that are set", () => {
  assert.equal(
    cmsSchemaJsonLd("/about/", { meta: { description: "SEO description edited in Payload." } }),
    null,
  );
  const overlay = cmsSchemaJsonLd("/about/", {
    title: "Document title",
    meta: { schemaType: "AboutPage", breadcrumbLabel: "About", title: "" },
  });
  assert.equal(overlay?.["@type"], "AboutPage");
  assert.equal(overlay?.alternateName, "About");
  assert.equal(overlay?.name, undefined);
  assert.equal(overlay?.url, "https://ascensionhealthnv.com/about/");
});

test("the generic renderer is only for CMS-only paths with real content", () => {
  const empty = aboutDoc({ status: "published", layout: [] });
  const thin = aboutDoc({ status: "published", content: thinLexical });
  const excerptOnly = aboutDoc({ status: "published", content: null });
  assert.equal(selectRoutedBody({ hasDesignedPage: false, doc: empty }), "none");
  assert.equal(cmsOnlyDocIsRenderable(empty), false);
  assert.equal(selectRoutedBody({ hasDesignedPage: false, doc: excerptOnly }), "none");
  assert.equal(selectRoutedBody({ hasDesignedPage: false, doc: thin }), "generic");
  assert.equal(cmsOnlyDocIsRenderable(null), false);

  const html = renderChoice(false, thin);
  assert.match(html, /id="generic"/);
  assert.doesNotMatch(html, /designed-about/);
  assert.equal(renderChoice(false, empty), "");
});

test("every designed route stays on its page component", () => {
  const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../app/(site)");
  const pages: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (entry === "page.tsx") pages.push(full);
    }
  };
  walk(siteRoot);
  assert.ok(pages.length >= 45);

  const city = PSEO_TARGET_CITIES[0];
  const service = PSEO_SERVICES[0];
  const condition = PSEO_CONDITIONS[0];
  const treatment = PSEO_TREATMENT_PAGES[0];
  assert.ok(city && service && condition && treatment);
  assert.equal(isDesignedPath(`/${city.slug}-nv/`), true);
  assert.equal(isDesignedPath(`/${service.slug}/${city.slug}-nv/`), true);
  assert.equal(isDesignedPath(`/${service.slug}/near-${city.slug}/`), true);
  assert.equal(isDesignedPath(`/${condition.slug}/${city.slug}-nv/`), true);
  assert.equal(isDesignedPath(`/treatments/${treatment.treatmentSlug}/`), true);
  assert.equal(isDesignedPath("/blog/"), true);
  assert.equal(isDesignedPath("/blog/a-published-article/"), true);
  assert.equal(isDesignedPath("/no-such-page/"), false);
  assert.equal(isDesignedPath("/nope/nope/"), false);

  for (const file of pages) {
    const source = readFileSync(file, "utf8");
    const rel = path.relative(siteRoot, file).replaceAll("\\", "/");
    if (rel.includes("...")) {
      assert.fail(`${rel} is a catch-all and turns unknown deep URLs into a dynamic render`);
    }
    if (rel === "[service]/page.tsx" || rel === "[service]/[city]/page.tsx") {
      assert.match(source, /withCmsMetadata/);
      assert.match(source, /CmsOnlyPage/);
      continue;
    }
    assert.match(source, /withCmsMetadata/, `${rel} must keep CMS metadata on the designed page`);
    assert.doesNotMatch(source, /CMSPageView|CmsOnlyPage/, `${rel} must render its designed component`);
    if (rel.includes("[")) continue;
    const dir = path.dirname(rel);
    const route = dir === "." ? "/" : `/${dir}/`;
    assert.equal(isDesignedPath(route), true, route);
  }
});

test("unknown 3+ segment paths stay on the static not-found page", () => {
  const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../app/(site)");
  const notFound = readFileSync(path.join(siteRoot, "not-found.tsx"), "utf8");
  assert.match(notFound, /404: This page could not be found\./);
  assert.match(notFound, /index:\s*false/);
  assert.match(notFound, /This page could not be found\./);
  assert.doesNotMatch(notFound, /payload|getPayload|withCMS|google-reviews|getDisplayedGoogleReviews|findDocForMetadata/i);

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        assert.equal(entry.includes("..."), false, `${full} would match unknown deep paths`);
        walk(full);
      }
    }
  };
  walk(siteRoot);

  for (const route of [
    "/chiropractic-care/reno-nv/extra/",
    "/chiropractic-care/reno-nv/a/b/",
    "/foo/bar/baz/",
  ]) {
    assert.equal(isDesignedPath(route), false, route);
  }
});

test("unpublishing or deleting a page revalidates the previously published path", () => {
  assert.deepEqual(
    pathsToRevalidate(
      { path: "/about/", _status: "draft" },
      { path: "/about/", _status: "published" },
    ),
    ["/about/"],
  );
  assert.deepEqual(
    pathsToRevalidate(
      { path: "/services/", _status: "published" },
      { path: "/about/", _status: "published" },
    ),
    ["/services/", "/about/"],
  );
  assert.deepEqual(
    pathsToRevalidate(
      { path: "/blog/post/", _status: "published" },
      { path: "/blog/post/", _status: "published" },
    ),
    ["/blog/post/"],
  );
  assert.deepEqual(
    pathsToRevalidate({ path: "/about/", _status: "draft" }, { path: "/about/", _status: "draft" }),
    [],
  );

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  for (const file of ["collections/Pages.ts", "collections/Posts.ts"]) {
    const source = readFileSync(path.join(root, file), "utf8");
    assert.match(source, /revalidatePublished/);
    assert.match(source, /revalidateDeleted/);
  }
});
