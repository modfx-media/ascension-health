import type { GlobalConfig } from "payload";
import { authenticated } from "../collections/access";
import { globalVersions } from "../collections/versions";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  access: {
    read: () => true,
    update: authenticated,
  },
  versions: globalVersions,
  fields: [
    {
      name: "blurb",
      type: "textarea",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
  ],
};
