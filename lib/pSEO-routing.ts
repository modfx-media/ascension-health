import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";
import {
  PSEO_CITIES,
  PSEO_CONDITIONS,
  PSEO_SERVICES,
  PSEO_PAGES,
  type PSEOCity,
  type PSEOCondition,
  type PSEOService,
  type PSEOPage,
} from "./pSEO-data";

/**
 * Cities targeted by the programmatic dynamic routes
 * (`app/[service]/[city]`, `app/[service]/near-[city]`).
 *
 * Filtered from `PSEO_CITIES` to match the launch list provided by the
 * marketing team; expand by adding slugs here as we open new markets.
 */
const TARGET_CITY_SLUGS = new Set<string>([
  "fernley",
  "reno",
  "sparks",
  "carson-city",
  "fallon",
  "yerington",
  "dayton",
  "silver-springs",
  "lovelock",
  "winnemucca",
  "elko",
  "sun-valley",
  "spanish-springs",
]);

export const PSEO_TARGET_CITIES: PSEOCity[] = PSEO_CITIES.filter((c) =>
  TARGET_CITY_SLUGS.has(c.slug)
);

const SERVICES_BY_SLUG = new Map<string, PSEOService>(
  PSEO_SERVICES.map((s) => [s.slug, s])
);
const CONDITIONS_BY_SLUG = new Map<string, PSEOCondition>(
  PSEO_CONDITIONS.map((c) => [c.slug, c])
);
const CITIES_BY_SLUG = new Map<string, PSEOCity>(
  PSEO_TARGET_CITIES.map((c) => [c.slug, c])
);

export function getService(slug: string): PSEOService | undefined {
  return SERVICES_BY_SLUG.get(slug);
}

export function getCondition(slug: string): PSEOCondition | undefined {
  return CONDITIONS_BY_SLUG.get(slug);
}

export function getTargetCity(slug: string): PSEOCity | undefined {
  return CITIES_BY_SLUG.get(slug);
}

/** "fernley-nv" -> PSEOCity for "fernley". Returns undefined if unknown. */
export function parseCityNvSlug(citySegment: string): PSEOCity | undefined {
  if (!citySegment.endsWith("-nv")) return undefined;
  return getTargetCity(citySegment.slice(0, -"-nv".length));
}

/**
 * Resolve the first dynamic segment of `[service]/[city]` to either a service
 * or a condition. Returns a discriminated union so the page can render the
 * correct template.
 */
export type ServiceOrCondition =
  | { kind: "service"; service: PSEOService }
  | { kind: "condition"; condition: PSEOCondition };

export function resolveServiceOrCondition(
  slug: string
): ServiceOrCondition | undefined {
  const service = getService(slug);
  if (service) return { kind: "service", service };
  const condition = getCondition(slug);
  if (condition) return { kind: "condition", condition };
  return undefined;
}

// ──────────────────────────────────────────────────────────────────────────
// /treatments/[slug], deep treatment-variation pages
// ──────────────────────────────────────────────────────────────────────────

/**
 * Pages routed under `/treatments/{slug}/`. Symptom and comparison pages
 * (the "deep variation" pSEO bucket) live here so they don't clutter the
 * site root. The slug exposed to the URL is the trailing path segment from
 * the original PSEO_PAGES entry.
 */
export type TreatmentPage = PSEOPage & { treatmentSlug: string };

export const PSEO_TREATMENT_PAGES: TreatmentPage[] = PSEO_PAGES
  .filter((p) => p.category === "symptom" || p.category === "comparison")
  .map((p) => ({
    ...p,
    treatmentSlug: p.slug.replace(/^\/|\/$/g, ""),
  }));

const TREATMENTS_BY_SLUG = new Map<string, TreatmentPage>(
  PSEO_TREATMENT_PAGES.map((t) => [t.treatmentSlug, t])
);

export function getTreatmentPage(slug: string): TreatmentPage | undefined {
  return TREATMENTS_BY_SLUG.get(slug);
}

// ──────────────────────────────────────────────────────────────────────────
// Hub URL resolution, maps a pSEO service/condition slug to its canonical
// top-level hub page (used for breadcrumbs and silo linking).
// ──────────────────────────────────────────────────────────────────────────

const SERVICE_HUB_OVERRIDES: Record<string, string> = {
  "chiropractic-care": "/services/chiropractic-care/",
  "spinal-decompression": "/services/spinal-decompression/",
  "joint-injections": "/services/joint-injections/",
  "trigger-point-injections": "/services/trigger-point-injections/",
  "medical-weight-loss": "/services/medical-weight-loss/",
  "nutritional-iv-therapy": "/services/nutritional-ivs/",
  "bioidentical-hormone-replacement-therapy":
    "/services/bioidentical-hormone-replacement-therapy/",
  "gainswave-therapy": "/services/gainswave/",
  "neuropathy-treatment": "/conditions-treated/neuropathy/",
  "pain-management": "/conditions-treated/pain-relief/",
  "sports-injury-care": "/sports-injuries/",
  "sexual-wellness-treatment": "/conditions-treated/sexual-dysfunction/",
};

const CONDITION_HUB_OVERRIDES: Record<string, string> = {
  "back-pain": "/conditions-treated/back-pain/",
  "neck-pain": "/conditions-treated/neck-pain/",
  "shoulder-pain": "/conditions-treated/shoulder-pain/",
  "sciatica": "/conditions-treated/sciatica/",
  "scoliosis": "/conditions-treated/scoliosis/",
  "whiplash": "/conditions-treated/whiplash/",
  "carpal-tunnel": "/conditions-treated/carpal-tunnel/",
  "headaches": "/conditions-treated/headaches-migraines/",
  "migraines": "/conditions-treated/headaches-migraines/",
  "knee-pain": "/conditions-treated/knee-pain/",
  "joint-pain": "/conditions-treated/joint-pain/",
  "neuropathy": "/conditions-treated/neuropathy/",
  "hormonal-imbalance": "/conditions-treated/hormonal-imbalance/",
  "work-injuries": "/conditions-treated/work-injury/",
  "sports-injuries": "/sports-injuries/",
};

/** Canonical hub URL for a service slug (falls back to the services index). */
export function getServiceHubHref(slug: string): string {
  return SERVICE_HUB_OVERRIDES[slug] ?? "/services/";
}

/** Canonical hub URL for a condition slug (falls back to conditions index). */
export function getConditionHubHref(slug: string): string {
  return CONDITION_HUB_OVERRIDES[slug] ?? "/conditions-treated/";
}

// ──────────────────────────────────────────────────────────────────────────
// Shared metadata helper
// ──────────────────────────────────────────────────────────────────────────

export const SITE_URL = resolvePublicSiteOrigin();

export function buildPageMetadata(args: {
  title: string;
  description: string;
  path: string; // absolute path starting with "/"
}) {
  const url = `${SITE_URL}${args.path}`;
  return {
    title: args.title,
    description: args.description,
    alternates: { canonical: args.path },
    openGraph: {
      type: "article" as const,
      url,
      title: args.title,
      description: args.description,
      siteName: "Ascension Health",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: args.title,
      description: args.description,
    },
  };
}
