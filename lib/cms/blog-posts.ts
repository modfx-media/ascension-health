import { cache } from "react";
import { draftMode } from "next/headers";

import { getAllPosts, type BlogPost } from "@/lib/blog";
import { getPayloadClient } from "./queries";
import { withCMS } from "./safe";
import {
  blogSlugFromLookup,
  isFuturePublished,
  isIndexableBlogPost,
  mergeBlogPosts,
  payloadDocToBlogPost,
  type PayloadPostLike,
  type PublishedBlogPost,
} from "./blog-post-map";

async function readDraftMode(): Promise<boolean> {
  try {
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

const loadPayloadPosts = cache(async (): Promise<PayloadPostLike[]> => {
  return withCMS(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      depth: 1,
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      where: {
        _status: {
          equals: "published",
        },
      },
    });
    return (result.docs ?? []) as PayloadPostLike[];
  }, []);
});

async function mergedPosts(includeFuture: boolean): Promise<PublishedBlogPost[]> {
  const docs = await loadPayloadPosts();
  const now = new Date();
  const payloadPosts = docs
    .map((doc) => payloadDocToBlogPost(doc))
    .filter((post): post is PublishedBlogPost => Boolean(post))
    .filter((post) => includeFuture || !isFuturePublished(post.publishedAt, now));
  const local = getAllPosts().filter((post) => includeFuture || !isFuturePublished(post.publishedAt, now));
  return mergeBlogPosts(local, payloadPosts);
}

/** Published Payload posts merged with local posts. Payload wins on slug. */
export async function getPublicBlogPosts(): Promise<PublishedBlogPost[]> {
  const draft = await readDraftMode();
  return mergedPosts(draft);
}

export async function getPublicBlogPost(slugOrPath: string): Promise<PublishedBlogPost | undefined> {
  const slug = blogSlugFromLookup(slugOrPath);
  if (!slug) return undefined;
  const posts = await getPublicBlogPosts();
  return posts.find((post) => post.slug === slug);
}

/** Sitemap entries: published, already live, and not marked noindex / excluded. */
export async function getIndexableBlogPosts(): Promise<BlogPost[]> {
  const posts = await mergedPosts(false);
  return posts.filter(isIndexableBlogPost);
}
