import type { GlobalConfig } from "payload";
import { authenticated } from "../collections/access";
import { globalVersions } from "../collections/versions";

const linkFields = [
  { name: "label", type: "text" as const },
  { name: "href", type: "text" as const },
];

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  access: {
    read: () => true,
    update: authenticated,
  },
  versions: globalVersions,
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "phoneHref",
      type: "text",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "nav",
      type: "array",
      fields: [
        ...linkFields,
        {
          name: "children",
          type: "array",
          fields: linkFields,
        },
      ],
    },
  ],
};
