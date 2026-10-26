import type { CollectionConfig } from "payload";
import { authenticated, publishedOrAuthenticated } from "./access";
import { emptyStringToNull } from "./hooks";
import { collectionVersions } from "./versions";
import { previewFromPath } from "../lib/cms/preview";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "slug", "_status", "updatedAt"],
    group: "Content",
    livePreview: {
      url: ({ data }) =>
        previewFromPath(typeof data?.path === "string" ? data.path : null),
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
          "Public path with a trailing slash, such as /about/. Not required when the document is first created.",
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
      name: "content",
      type: "richText",
    },
  ],
};
