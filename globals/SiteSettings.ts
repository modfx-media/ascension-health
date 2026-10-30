import type { GlobalConfig } from "payload";
import { authenticated } from "../collections/access";
import { globalVersions } from "../collections/versions";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
    update: authenticated,
  },
  versions: globalVersions,
  fields: [
    { name: "siteName", type: "text" },
    { name: "tagline", type: "text" },
    { name: "description", type: "textarea" },
    { name: "phone", type: "text" },
    { name: "phoneHref", type: "text" },
    { name: "email", type: "email" },
    { name: "address", type: "textarea" },
    { name: "hours", type: "text" },
    { name: "facebook", type: "text" },
    { name: "twitter", type: "text" },
    { name: "google", type: "text" },
  ],
};
