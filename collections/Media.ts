import type { CollectionConfig } from "payload";
import { authenticated } from "./access";
import { emptyStringToNull } from "./hooks";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
    staticDir: "media",
  },
  hooks: {
    beforeValidate: [emptyStringToNull],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
    },
  ],
};
