import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PseoPageTemplate } from "@/components/pSEO/PseoPageTemplate";
import {
  PSEO_TARGET_CITIES,
  buildPageMetadata,
  getConditionHubHref,
  getService,
  getServiceHubHref,
  getTargetCity,
  parseCityNvSlug,
  resolveServiceOrCondition,
} from "@/lib/pSEO-routing";
import { PSEO_CONDITIONS, PSEO_SERVICES } from "@/lib/pSEO-data";
import {
  buildConditionCityFAQs,
  buildNearCityFAQs,
  buildServiceCityFAQs,
  getConditionContent,
  getServiceContent,
  interpolate,
  nearbyCities,
  relatedConditionsForService,
  relatedServicesForCondition,
} from "@/lib/pSEO-content";

/**
 * `app/[service]/[city]/page.tsx`
 *
 * One dynamic route, three URL shapes, all pre-rendered at build time:
 *
 *   1. Service + city          /chiropractic-care/fernley-nv/
 *   2. Condition + city        /back-pain/fernley-nv/
 *   3. Service near city       /spinal-decompression/near-fernley/
 *
 * Why one route handles all three:
 *
 *   - Shapes 1 and 2 share the same URL pattern (`/{topic}/{city}-nv/`),
 *     so Next.js can only host one folder named `[service]` at this depth.
 *   - Shape 3 was originally a sibling `near-[city]` static-prefixed
 *     segment, but Next.js 16.2.6 / Turbopack does not iterate dynamic
 *     params inside a segment that carries a static prefix. Folding shape
 *     3 into `[city]` and dispatching on the URL here side-steps that
 *     limitation while preserving the requested URLs.
 *
 * Each page renders the universal {@link PseoPageTemplate} so every URL
 * gets the same nine-section structure (hero → big CTA), the FAQPage /
 * LocalBusiness / MedicalOrganization JSON-LD, and >800 words of unique
 * content.
 */

export const dynamicParams = false;

type Params = { service: string; city: string };

type Service = NonNullable<ReturnType<typeof getService>>;
type City = NonNullable<ReturnType<typeof getTargetCity>>;
type Condition = (typeof PSEO_CONDITIONS)[number];

type Resolved =
  | { kind: "service-city"; service: Service; city: City }
  | { kind: "condition-city"; condition: Condition; city: City }
  | { kind: "service-near-city"; service: Service; city: City };

function resolveCityParam(
  serviceSlug: string,
  citySegment: string
): Resolved | undefined {
  if (citySegment.startsWith("near-")) {
    const service = getService(serviceSlug);
    const city = getTargetCity(citySegment.slice("near-".length));
    if (!service || !city) return undefined;
    return { kind: "service-near-city", service, city };
  }
  const city = parseCityNvSlug(citySegment);
  if (!city) return undefined;
  const topic = resolveServiceOrCondition(serviceSlug);
  if (!topic) return undefined;
  if (topic.kind === "service") {
    return { kind: "service-city", service: topic.service, city };
  }
  return { kind: "condition-city", condition: topic.condition, city };
}

export async function generateStaticParams(): Promise<Params[]> {
  const params: Params[] = [];
  for (const s of PSEO_SERVICES) {
    for (const c of PSEO_TARGET_CITIES) {
      params.push({ service: s.slug, city: `${c.slug}-nv` });
    }
  }
  for (const cond of PSEO_CONDITIONS) {
    for (const c of PSEO_TARGET_CITIES) {
      params.push({ service: cond.slug, city: `${c.slug}-nv` });
    }
  }
  for (const s of PSEO_SERVICES) {
    for (const c of PSEO_TARGET_CITIES) {
      params.push({ service: s.slug, city: `near-${c.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { service, city } = await params;
  const r = resolveCityParam(service, city);
  if (!r) return {};
  const path = `/${service}/${city}/`;
  switch (r.kind) {
    case "service-city":
      return buildPageMetadata({
        title: `${r.service.name} in ${r.city.name}, NV`,
        description: `${r.service.name} for ${r.city.name}, NV patients, ${r.service.benefit}. Same-week appointments at our Fernley clinic, serving ${r.city.region}.`,
        path,
      });
    case "condition-city":
      return buildPageMetadata({
        title: `${r.condition.name} Treatment in ${r.city.name}, NV`,
        description: `Help for ${r.condition.symptomPhrase} in ${r.city.name}, NV. Conservative, drug-free ${r.condition.name.toLowerCase()} care from the Ascension Health team.`,
        path,
      });
    case "service-near-city":
      return buildPageMetadata({
        title: `${r.service.name} Near ${r.city.name}, NV`,
        description: `Looking for ${r.service.name.toLowerCase()} near ${r.city.name}? Ascension Health serves ${r.city.region} from our Fernley clinic, ${r.service.benefit}.`,
        path,
      });
  }
}

export default async function ServiceCityRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { service, city } = await params;
  const r = resolveCityParam(service, city);
  if (!r) notFound();

  switch (r.kind) {
    case "service-city":
      return renderServiceCity(r.service, r.city);
    case "condition-city":
      return renderConditionCity(r.condition, r.city);
    case "service-near-city":
      return renderNearCity(r.service, r.city);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Render dispatchers, each one constructs PseoPageTemplate props
// ──────────────────────────────────────────────────────────────────────────

function renderServiceCity(service: Service, city: City) {
  const vars = { city: city.name, region: city.region };
  const content = getServiceContent(service.slug);
  const conds = relatedConditionsForService(service.slug);

  return (
    <PseoPageTemplate
      topicSlug={service.slug}
      topicName={service.name}
      topicKind="service"
      pagePath={`/${service.slug}/${city.slug}-nv/`}
      h1={`${service.name} in ${city.name}, NV | Ascension Health`}
      subheading={`${service.name} for ${city.name} patients, ${service.benefit}. Same-week appointments at our Fernley clinic serving ${city.region}.`}
      trustBadge={`Serving ${city.name} & Surrounding Areas`}
      parent={{ label: "Services", href: "/services/" }}
      topicHubHref={getServiceHubHref(service.slug)}
      aboutHeading={`What is ${service.name}, and how it helps ${city.name} patients`}
      aboutParagraphs={content.paragraphs.map((p) => interpolate(p, vars))}
      relatedHeading={`Conditions we treat with ${service.name}`}
      relatedItems={conds.map((c) => ({
        label: `${c.name} treatment in ${city.name}`,
        href: `/${c.slug}/${city.slug}-nv/`,
      }))}
      faqs={buildServiceCityFAQs(service, city)}
      city={city}
      nearbyCities={nearbyCities(city)}
      buildNearbyHref={(c) => `/${service.slug}/${c.slug}-nv/`}
    />
  );
}

function renderConditionCity(condition: Condition, city: City) {
  const vars = { city: city.name, region: city.region };
  const content = getConditionContent(condition.slug);
  const services = relatedServicesForCondition(condition.slug);

  return (
    <PseoPageTemplate
      topicSlug={condition.slug}
      topicName={condition.name}
      topicKind="condition"
      pagePath={`/${condition.slug}/${city.slug}-nv/`}
      h1={`${condition.name} Treatment in ${city.name}, NV | Ascension Health`}
      subheading={`Help for ${condition.symptomPhrase} in ${city.name}, NV. Conservative, drug-free ${condition.name.toLowerCase()} care from the Ascension Health team.`}
      trustBadge={`Serving ${city.name} & Surrounding Areas`}
      parent={{ label: "Conditions Treated", href: "/conditions-treated/" }}
      topicHubHref={getConditionHubHref(condition.slug)}
      aboutHeading={`Understanding ${condition.name} for ${city.name} patients`}
      aboutParagraphs={content.paragraphs.map((p) => interpolate(p, vars))}
      relatedHeading={`Treatments we offer for ${condition.name}`}
      relatedItems={services.map((s) => ({
        label: `${s.name} in ${city.name}`,
        href: `/${s.slug}/${city.slug}-nv/`,
      }))}
      faqs={buildConditionCityFAQs(condition, city)}
      city={city}
      nearbyCities={nearbyCities(city)}
      buildNearbyHref={(c) => `/${condition.slug}/${c.slug}-nv/`}
    />
  );
}

function renderNearCity(service: Service, city: City) {
  const vars = { city: city.name, region: city.region };
  const content = getServiceContent(service.slug);
  const conds = relatedConditionsForService(service.slug);

  return (
    <PseoPageTemplate
      topicSlug={service.slug}
      topicName={service.name}
      topicKind="service"
      pagePath={`/${service.slug}/near-${city.slug}/`}
      h1={`${service.name} Near ${city.name}, NV | Ascension Health`}
      subheading={`Looking for ${service.name.toLowerCase()} near ${city.name}? Ascension Health serves ${city.region} from our Fernley clinic, with same-week appointments and most major insurance accepted.`}
      trustBadge={`Near ${city.name} · Serving ${city.region}`}
      parent={{ label: "Services", href: "/services/" }}
      topicHubHref={getServiceHubHref(service.slug)}
      aboutHeading={`${service.name} serving ${city.name} from our Fernley clinic`}
      aboutParagraphs={content.paragraphs.map((p) => interpolate(p, vars))}
      relatedHeading={`What we treat with ${service.name}`}
      relatedItems={conds.map((c) => ({
        label: `${c.name} treatment near ${city.name}`,
        href: `/${c.slug}/${city.slug}-nv/`,
      }))}
      faqs={buildNearCityFAQs(service, city)}
      city={city}
      nearbyCities={nearbyCities(city)}
      buildNearbyHref={(c) => `/${service.slug}/near-${c.slug}/`}
    />
  );
}
