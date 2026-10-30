import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { SiteSettings } from "./globals/SiteSettings";
import { migrations } from "./migrations/index";
import { databaseUrl } from "./lib/cms/required-env";
import { corsOrigins, isLocalDatabase, resolvePublicSiteOrigin, resolveServerURL } from "./lib/cms/server-url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const connectionString = databaseUrl();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "- Ascension Health",
    },
  },
  collections: [Users, Media, Pages, Posts, Categories, Authors],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: resolveServerURL(),
  cors: corsOrigins(),
  csrf: corsOrigins(),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  sharp,
  db: vercelPostgresAdapter({
    pool: {
      connectionString,
      connectionTimeoutMillis: 2500,
    },
    push: false,
    prodMigrations: migrations,
    forceUseVercelPostgres: !isLocalDatabase(connectionString),
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  jobs: {
    access: {
      run: ({ req }) => {
        if (req.user) return true;
        const secret = process.env.CRON_SECRET;
        if (!secret) return false;
        return req.headers.get("authorization") === `Bearer ${secret}`;
      },
    },
  },
  plugins: [
    seoPlugin({
      collections: ["pages", "posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => {
        const title = (doc as { title?: string } | undefined)?.title;
        return title ? `${title} | Ascension Health` : "Ascension Health";
      },
      generateDescription: ({ doc }) => {
        const excerpt = (doc as { excerpt?: string } | undefined)?.excerpt;
        return excerpt || "";
      },
      generateURL: ({ doc, collectionConfig }) => {
        const site = resolvePublicSiteOrigin();
        const record = doc as { path?: string; slug?: string } | undefined;
        if (record?.path) {
          const pathValue = record.path.startsWith("/") ? record.path : `/${record.path}`;
          return `${site}${pathValue}`;
        }
        if (collectionConfig?.slug === "posts" && record?.slug) {
          return `${site}/blog/${record.slug}/`;
        }
        if (record?.slug) return `${site}/${record.slug}/`;
        return site;
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: "canonicalUrl",
          type: "text",
          label: "Canonical URL",
        },
        {
          name: "noIndex",
          type: "checkbox",
          label: "No index",
        },
        {
          name: "noFollow",
          type: "checkbox",
          label: "No follow",
        },
        {
          name: "excludeFromSitemap",
          type: "checkbox",
          label: "Exclude from sitemap",
        },
      ],
    }),
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      alwaysInsertFields: true,
    }),
  ],
});
