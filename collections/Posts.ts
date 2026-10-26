import type { CollectionConfig } from "payload";
import { authenticated, publishedOrAuthenticated } from "./access";
import { emptyStringToNull } from "./hooks";
import { collectionVersions } from "./versions";
import { previewFromPath } from "../lib/cms/preview";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "_status", "updatedAt"],
    group: "Content",
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === "string" ? data.slug : "";
        if (!slug) return previewFromPath(null);
        return previewFromPath(["blog", slug]);
      },
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  versions: collectionVersions,
  hooks: {
    beforeValidate: [emptyStringToNull],
    beforeChange: [
      ({ data }) => {
        if (!data) return data;
        if ((data.path == null || data.path === "") && typeof data.slug === "string" && data.slug) {
          data.path = `/blog/${data.slug}/`;
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description:
          "Public path, usually /blog/{slug}/. Not required when the document is first created.",
      },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
    },
    {
      name: "sourceUrl",
      type: "text",
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "lede",
      type: "textarea",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
    },
    {
      name: "publishedAt",
      type: "date",
    },
    {
      name: "readingMinutes",
      type: "number",
    },
    {
      name: "coverAlt",
      type: "text",
    },
    {
      name: "coverSrc",
      type: "text",
      admin: {
        description: "Original site image path from the hardcoded post. Uploads live on the cover field.",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "relatedSlugs",
      type: "text",
      hasMany: true,
    },
    {
      name: "legacyBlocks",
      type: "json",
      admin: {
        description: "Original structured blocks from lib/blog.ts. The public site keeps rendering those until this post is published.",
      },
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};
