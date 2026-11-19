import { normalizePath } from "./path";
import {
  getService,
  getTargetCity,
  getTreatmentPage,
  parseCityNvSlug,
  resolveServiceOrCondition,
} from "@/lib/pSEO-routing";

/**
 * Hardcoded pages. A published CMS document must not replace these.
 * Dynamic matches use the same resolvers as the route modules.
 */
const STATIC_DESIGNED_PATHS = new Set<string>([
  "/",
  "/about/",
  "/accessibility/",
  "/appointments/",
  "/areas-we-serve/",
  "/blog/",
  "/conditions-treated/",
  "/conditions-treated/back-pain/",
  "/conditions-treated/carpal-tunnel/",
  "/conditions-treated/headaches-migraines/",
  "/conditions-treated/hormonal-imbalance/",
  "/conditions-treated/intersegmental-traction/",
  "/conditions-treated/joint-pain/",
  "/conditions-treated/knee-pain/",
  "/conditions-treated/myofascial-release/",
  "/conditions-treated/neck-pain/",
  "/conditions-treated/neuropathy/",
  "/conditions-treated/pain-relief/",
  "/conditions-treated/sciatica/",
  "/conditions-treated/scoliosis/",
  "/conditions-treated/sexual-dysfunction/",
  "/conditions-treated/shoulder-pain/",
  "/conditions-treated/whiplash/",
  "/conditions-treated/work-injury/",
  "/contact/",
  "/eugene-or/",
  "/new-patients/",
  "/new-patients/online-forms/",
  "/our-team/",
  "/privacy-policy/",
  "/reviews/",
  "/services/",
  "/services/bioidentical-hormone-replacement-therapy/",
  "/services/chiropractic-care/",
  "/services/gainswave/",
  "/services/joint-injections/",
  "/services/medical-weight-loss/",
  "/services/nutritional-ivs/",
  "/services/spinal-decompression/",
  "/services/trigger-point-injections/",
  "/sitemap/",
  "/spinal-decompression/",
  "/sports-injuries/",
  "/thank-you/",
  "/what-can-we-improve/",
]);

export function isDesignedPath(input: string): boolean {
  const path = normalizePath(input);
  if (STATIC_DESIGNED_PATHS.has(path)) return true;

  const parts = path.split("/").filter(Boolean);
  if (parts.length === 1 && parseCityNvSlug(parts[0])) return true;
  if (parts.length === 2 && parts[0] === "blog" && parts[1]) return true;
  if (parts.length === 2 && parts[0] === "treatments" && getTreatmentPage(parts[1])) return true;
  if (parts.length === 2) {
    const [topic, city] = parts;
    if (!topic || !city) return false;
    if (city.startsWith("near-")) {
      return Boolean(getService(topic) && getTargetCity(city.slice("near-".length)));
    }
    return Boolean(parseCityNvSlug(city) && resolveServiceOrCondition(topic));
  }
  return false;
}
