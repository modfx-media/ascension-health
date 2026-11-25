import assert from "node:assert/strict";
import test from "node:test";

import type { BlogPost } from "@/lib/blog";
import {
  FALLBACK_COVER,
  blogSlugFromLookup,
  isAllowedCoverSrc,
  isFuturePublished,
  isIndexableBlogPost,
  lexicalToBlocks,
  mergeBlogPosts,
  payloadDocToBlogPost,
  rewriteSameOriginCoverSrc,
} from "./blog-post-map";

const local: BlogPost = {
  slug: "local-only",
  title: "Local only",
  excerpt: "Local excerpt",
  category: "Wellness",
  publishedAt: "2026-01-01",
  readingMinutes: 4,
  cover: { src: "/images/blog/default-cover.jpg", alt: "Local cover" },
  author: { name: "Ascension Health" },
  content: [{ type: "paragraph", text: "Local body" }],
};

test("slug lookup accepts a bare slug, a path, and a trailing slash", () => {
  assert.equal(blogSlugFromLookup("my-post"), "my-post");
  assert.equal(blogSlugFromLookup("my-post/"), "my-post");
  assert.equal(blogSlugFromLookup("/blog/my-post"), "my-post");
  assert.equal(blogSlugFromLookup("/blog/my-post/"), "my-post");
  assert.equal(blogSlugFromLookup("/blog/my-post/?utm=1"), "my-post");
});

test("future publish dates are excluded and today is not", () => {
  const now = new Date("2026-11-25T18:00:00.000Z");
  assert.equal(isFuturePublished("2026-11-26", now), true);
  assert.equal(isFuturePublished("2026-11-25T19:00:00.000Z", now), true);
  assert.equal(isFuturePublished("2026-11-25", now), false);
  assert.equal(isFuturePublished("2026-10-09", now), false);
  assert.equal(isFuturePublished(null, now), false);
});

test("payload wins on the same slug and local posts remain as fallback", () => {
  const payload = payloadDocToBlogPost({
    title: "Payload title",
    slug: "local-only",
    path: "/blog/local-only",
    excerpt: "Payload excerpt",
    publishedAt: "2026-11-01",
    legacyBlocks: [{ type: "paragraph", text: "Payload body" }],
    _status: "published",
    meta: { title: "SEO title", description: "SEO description" },
  });
  assert.ok(payload);
  const extra = payloadDocToBlogPost({
    title: "Only in Payload",
    slug: "only-in-payload",
    path: "/blog/only-in-payload/",
    excerpt: "From the CMS",
    publishedAt: "2026-11-20",
    content: {
      root: {
        children: [{ type: "paragraph", children: [{ type: "text", text: "CMS paragraph" }] }],
      },
    },
    _status: "published",
  });
  assert.ok(extra);
  const merged = mergeBlogPosts([local], [payload, extra]);
  assert.deepEqual(merged.map((post) => post.slug), ["only-in-payload", "local-only"]);
  const collision = merged.find((post) => post.slug === "local-only");
  assert.equal(collision?.title, "Payload title");
  assert.equal(collision?.content[0] && "text" in collision.content[0] ? collision.content[0].text : "", "Payload body");
  assert.equal(collision?.seo?.title, "SEO title");
  assert.equal(typeof collision?.cover.src === "string" ? collision.cover.src : "", local.cover.src);
});

test("lexical content and a slash-less path become a post", () => {
  const blocks = lexicalToBlocks({
    root: {
      children: [
        { type: "heading", tag: "h2", children: [{ type: "text", text: "Hello" }] },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Read " },
            { type: "link", fields: { url: "/appointments/" }, children: [{ type: "text", text: "appointments" }] },
          ],
        },
      ],
    },
  });
  assert.equal(blocks[0]?.type, "heading");
  assert.equal(blocks[1]?.type, "paragraph");
  assert.match(blocks[1] && blocks[1].type === "paragraph" ? blocks[1].text : "", /\[appointments\]\(\/appointments\/\)/);

  const post = payloadDocToBlogPost({
    title: "Slash less",
    path: "/blog/slash-less",
    publishedAt: "2026-11-02T00:00:00.000Z",
    cover: { url: "https://evil.example/cover.jpg" },
    _status: "published",
  });
  assert.equal(post?.slug, "slash-less");
  assert.equal(post?.cover.src, FALLBACK_COVER);
  assert.equal(isIndexableBlogPost(post!), true);
});

test("same-origin CMS covers become a relative media path", () => {
  const expected = "/api/media/file/fernley-wellness.jpg";
  const sources = [
    "https://ascensionhealthnv.com/api/media/file/fernley-wellness.jpg",
    "https://www.ascensionhealthnv.com/api/media/file/fernley-wellness.jpg",
    "http://ascensionhealthnv.com/api/media/file/fernley-wellness.jpg",
    "https://ASCensionhealthnv.com/api/media/file/fernley-wellness.jpg?w=1200",
  ];
  for (const src of sources) {
    const rewritten = rewriteSameOriginCoverSrc(src);
    assert.equal(rewritten, expected);
    assert.equal(isAllowedCoverSrc(src), false);
    assert.equal(isAllowedCoverSrc(rewritten ?? ""), true);
  }
  assert.equal(
    rewriteSameOriginCoverSrc("https://ascensionhealthnv.com/api/media/file/my%20cover.jpg"),
    "/api/media/file/my%20cover.jpg",
  );

  assert.equal(
    rewriteSameOriginCoverSrc(
      "https://preview.example.com/api/media/file/from-env.webp",
      "https://preview.example.com/blog/",
    ),
    "/api/media/file/from-env.webp",
  );
  assert.equal(
    rewriteSameOriginCoverSrc("https://preview.example.com/api/media/file/bare.webp", "preview.example.com"),
    "/api/media/file/bare.webp",
  );

  const fromCover = payloadDocToBlogPost({
    title: "CMS cover",
    slug: "cms-cover",
    publishedAt: "2026-11-01",
    cover: { url: "https://ascensionhealthnv.com/api/media/file/live-cover.jpg", alt: "Live cover" },
    _status: "published",
  });
  assert.equal(fromCover?.cover.src, "/api/media/file/live-cover.jpg");
  assert.equal(fromCover?.cover.alt, "Live cover");

  const fromStored = payloadDocToBlogPost({
    title: "Stored cover",
    slug: "stored-cover",
    publishedAt: "2026-11-01",
    coverSrc: "https://www.ascensionhealthnv.com/api/media/file/stored.png",
    _status: "published",
  });
  assert.equal(fromStored?.cover.src, "/api/media/file/stored.png");
});

test("NEXT_PUBLIC_SITE_URL covers rewrite and foreign covers stay on the default", () => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "https://cms.example.net/";
  try {
    const post = payloadDocToBlogPost({
      title: "Env host",
      slug: "env-host",
      publishedAt: "2026-11-01",
      cover: { url: "https://cms.example.net/api/media/file/env-cover.jpg" },
      _status: "published",
    });
    assert.equal(post?.cover.src, "/api/media/file/env-cover.jpg");
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previous;
  }

  assert.equal(rewriteSameOriginCoverSrc("https://evil.example/api/media/file/x.jpg"), null);
  assert.equal(rewriteSameOriginCoverSrc("https://ascensionhealthnv.com.evil/api/media/file/x.jpg"), null);
  assert.equal(rewriteSameOriginCoverSrc("https://notascensionhealthnv.com/api/media/file/x.jpg"), null);
  assert.equal(rewriteSameOriginCoverSrc("https://ascensionhealthnv.com/images/blog/local.jpg"), null);
  assert.equal(rewriteSameOriginCoverSrc("https://ascensionhealthnv.com/api/media/file/%2e%2e%2fsecret.jpg"), null);
  assert.equal(rewriteSameOriginCoverSrc("https://ascensionhealthnv.com/api/media/file/../secret.jpg"), null);

  const missing = payloadDocToBlogPost({
    title: "No cover",
    slug: "no-cover",
    publishedAt: "2026-11-01",
    _status: "published",
  });
  assert.equal(missing?.cover.src, FALLBACK_COVER);

  const foreign = payloadDocToBlogPost({
    title: "Foreign",
    slug: "foreign",
    publishedAt: "2026-11-01",
    cover: { url: "https://cdn.example/cover.jpg" },
    _status: "published",
  });
  assert.equal(foreign?.cover.src, FALLBACK_COVER);

  const relative = payloadDocToBlogPost({
    title: "Relative",
    slug: "relative",
    publishedAt: "2026-11-01",
    coverSrc: "/api/media/file/already-relative.jpg",
    _status: "published",
  });
  assert.equal(relative?.cover.src, "/api/media/file/already-relative.jpg");

  const remote = payloadDocToBlogPost({
    title: "Remote",
    slug: "remote",
    publishedAt: "2026-11-01",
    cover: { url: "https://images.unsplash.com/photo-1" },
    _status: "published",
  });
  assert.equal(remote?.cover.src, "https://images.unsplash.com/photo-1");

  const blob = payloadDocToBlogPost({
    title: "Blob",
    slug: "blob",
    publishedAt: "2026-11-01",
    cover: { url: "https://abc123.public.blob.vercel-storage.com/cover.jpg" },
    _status: "published",
  });
  assert.equal(blob?.cover.src, "https://abc123.public.blob.vercel-storage.com/cover.jpg");
});

test("drafts and noindex posts are not indexable", () => {
  assert.equal(payloadDocToBlogPost({ title: "Draft", slug: "draft", _status: "draft" }), null);
  const hidden = payloadDocToBlogPost({
    title: "Hidden",
    slug: "hidden",
    publishedAt: "2026-11-01",
    _status: "published",
    meta: { noIndex: true },
  });
  assert.ok(hidden);
  assert.equal(isIndexableBlogPost(hidden), false);
});
