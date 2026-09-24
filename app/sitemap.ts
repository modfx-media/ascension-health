import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { PSEO_CONDITIONS, PSEO_SERVICES } from "@/lib/pSEO-data";
import {
  PSEO_TARGET_CITIES,
  PSEO_TREATMENT_PAGES,
  SITE_URL,
} from "@/lib/pSEO-routing";
import { getPublishedBlogSlugs } from "@/lib/ranked/posts";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

type Entry = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const CORE_ENTRIES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/our-team/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/appointments/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/contact/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/new-patients/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/new-patients/online-forms/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/conditions-treated/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/areas-we-serve/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/reviews/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/eugene-or/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sitemap/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/accessibility/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/what-can-we-improve/", priority: 0.3, changeFrequency: "yearly" },
];

const SERVICE_ENTRIES: Entry[] = [
  "/services/",
  "/services/chiropractic-care/",
  "/services/spinal-decompression/",
  "/services/joint-injections/",
  "/services/trigger-point-injections/",
  "/services/nutritional-ivs/",
  "/services/bioidentical-hormone-replacement-therapy/",
  "/services/medical-weight-loss/",
  "/services/gainswave/",
  "/conditions-treated/pain-relief/",
  "/conditions-treated/joint-pain/",
  "/conditions-treated/knee-pain/",
  "/conditions-treated/neuropathy/",
  "/conditions-treated/hormonal-imbalance/",
  "/conditions-treated/sexual-dysfunction/",
  "/sports-injuries/",
  "/spinal-decompression/",
].map((path) => ({ path, priority: 0.9, changeFrequency: "monthly" as const }));

const CONDITION_ENTRIES: Entry[] = [
  "/conditions-treated/back-pain/",
  "/conditions-treated/carpal-tunnel/",
  "/conditions-treated/headaches-migraines/",
  "/conditions-treated/intersegmental-traction/",
  "/conditions-treated/myofascial-release/",
  "/conditions-treated/neck-pain/",
  "/conditions-treated/sciatica/",
  "/conditions-treated/scoliosis/",
  "/conditions-treated/shoulder-pain/",
  "/conditions-treated/whiplash/",
  "/conditions-treated/work-injury/",
].map((path) => ({ path, priority: 0.7, changeFrequency: "monthly" as const }));

const CITY_HUB_ENTRIES: Entry[] = PSEO_TARGET_CITIES.map((c) => ({
  path: `/${c.slug}-nv/`,
  priority: 0.9,
  changeFrequency: "monthly" as const,
}));

function buildPseoEntries(): Entry[] {
  const entries: Entry[] = [];

  for (const s of PSEO_SERVICES) {
    for (const c of PSEO_TARGET_CITIES) {
      entries.push({
        path: `/${s.slug}/${c.slug}-nv/`,
        priority: 0.8,
        changeFrequency: "monthly",
      });
      entries.push({
        path: `/${s.slug}/near-${c.slug}/`,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    }
  }

  for (const cond of PSEO_CONDITIONS) {
    for (const c of PSEO_TARGET_CITIES) {
      entries.push({
        path: `/${cond.slug}/${c.slug}-nv/`,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    }
  }

  for (const t of PSEO_TREATMENT_PAGES) {
    entries.push({
      path: `/treatments/${t.treatmentSlug}/`,
      priority: 0.6,
      changeFrequency: "monthly",
    });
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const slugs = await getPublishedBlogSlugs().catch(() =>
    getAllPosts().map((post) => post.slug),
  );
  const blogEntries: Entry[] = slugs.map((slug) => ({
    path: `/blog/${slug}/`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const seen = new Map<string, Entry>();
  for (const e of [
    ...CORE_ENTRIES,
    ...SERVICE_ENTRIES,
    ...CONDITION_ENTRIES,
    ...CITY_HUB_ENTRIES,
    ...buildPseoEntries(),
    ...blogEntries,
  ]) {
    const prev = seen.get(e.path);
    if (!prev || e.priority > prev.priority) seen.set(e.path, e);
  }

  return [...seen.values()].map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
