import assert from "node:assert/strict";
import test from "node:test";

import type { BlogPost } from "@/lib/blog";
import {
  FALLBACK_COVER,
  blogSlugFromLookup,
  isFuturePublished,
  isIndexableBlogPost,
  lexicalToBlocks,
  mergeBlogPosts,
  payloadDocToBlogPost,
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
