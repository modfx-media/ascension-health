import type { CollectionConfig } from "payload";
import { authenticated, publishedOrAuthenticated } from "./access";
import { emptyStringToNull } from "./hooks";
import { collectionVersions } from "./versions";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "updatedAt"],
    group: "Content",
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
      name: "name",
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
      name: "role",
      type: "text",
    },
    {
      name: "bio",
      type: "textarea",
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
  ],
};
