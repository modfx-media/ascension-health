import { SITE } from "@/lib/navigation";
import type { FAQ } from "@/lib/pSEO-content";
import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";

/**
 * Reusable JSON-LD structured-data renderer for every programmatic SEO page.
 *
 * Renders up to four schemas as native `<script type="application/ld+json">`
 * tags:
 *   1. MedicalBusiness (LocalBusiness subtype), clinic NAP, area served,
 *      medical specialties.
 *   2. FAQPage, exactly the Q&As shown on the page, so Google's rich result
 *      eligibility matches the rendered content.
 *   3. BreadcrumbList, Home → Category → Page.
 *   4. MedicalCondition or MedicalProcedure, page-topic entity that ties
 *      the local business to the medical concept.
 *
 * Note on `next/script`: the official Next.js JSON-LD guide explicitly
 * recommends a native `<script>` tag for structured data, because
 * `next/script` is optimised for executable JavaScript and JSON-LD is
 * inert payload. The `beforeInteractive` strategy also has a hard rule
 * that it can only live in the root layout, which would force a single
 * page-wide payload instead of the per-page schema we want. Using native
 * tags is the documented best practice and gives us the per-page,
 * fully-static JSON-LD that Google reads from server-rendered HTML.
 */

const ORIGIN = resolvePublicSiteOrigin();
const APPROX_LAT = 39.6082; // Fernley, NV
const APPROX_LNG = -119.2517;

export type Breadcrumb = { name: string; url: string };

export type MedicalEntity =
  | {
      kind: "MedicalCondition";
      name: string;
      alternateName?: string;
      description?: string;
    }
  | {
      kind: "MedicalProcedure";
      name: string;
      /** e.g. "TherapeuticProcedure", "DiagnosticProcedure". */
      procedureType?: string;
      description?: string;
    };

export type SchemaMarkupProps = {
  /** Absolute or root-relative path to the page (e.g. "/back-pain/reno-nv/"). */
  pagePath: string;
  /** Cities the page serves (city + surrounding). Falls back to "Nevada". */
  areaServed?: string[];
  /** Medical specialties / services this page covers. */
  medicalSpecialty: string[];
  /** Breadcrumb trail, Home included. */
  breadcrumbs: Breadcrumb[];
  /** Unique FAQs rendered on the page. */
  faqs?: FAQ[];
  /** Page-topic medical entity (condition or procedure). */
  medical?: MedicalEntity;
};

/** Serialise a JSON-LD payload safely, escape `<` to block XSS. */
function ldJson(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function SchemaMarkup({
  pagePath,
  areaServed,
  medicalSpecialty,
  breadcrumbs,
  faqs,
  medical,
}: SchemaMarkupProps) {
  const pageUrl = absoluteUrl(pagePath);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${ORIGIN}/#localbusiness`,
    name: "Ascension Health",
    url: ORIGIN,
    telephone: SITE.phone,
    image: `${ORIGIN}/og.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "415 HWY 95A Suite 503",
      addressLocality: "Fernley",
      addressRegion: "NV",
      postalCode: "89408",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: APPROX_LAT,
      longitude: APPROX_LNG,
    },
    areaServed:
      areaServed && areaServed.length > 0
        ? areaServed.map((name) => ({
            "@type": "City",
            name,
            containedInPlace: { "@type": "State", name: "Nevada" },
          }))
        : { "@type": "State", name: "Nevada" },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: APPROX_LAT,
        longitude: APPROX_LNG,
      },
      geoRadius: 160000,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    medicalSpecialty,
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: absoluteUrl(b.url),
    })),
  };

  const faqPage =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const medicalSchema = medical
    ? medical.kind === "MedicalCondition"
      ? {
          "@context": "https://schema.org",
          "@type": "MedicalCondition",
          name: medical.name,
          ...(medical.alternateName && { alternateName: medical.alternateName }),
          ...(medical.description && { description: medical.description }),
          associatedAnatomy: { "@type": "AnatomicalSystem", name: "Musculoskeletal system" },
          possibleTreatment: {
            "@type": "MedicalTherapy",
            name: medicalSpecialty[0] ?? "Chiropractic care",
          },
          url: pageUrl,
        }
      : {
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: medical.name,
          procedureType: medical.procedureType ?? "TherapeuticProcedure",
          ...(medical.description && { description: medical.description }),
          bodyLocation: "Musculoskeletal system",
          performer: { "@id": `${ORIGIN}/#localbusiness` },
          url: pageUrl,
        }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbList) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(faqPage) }}
        />
      )}
      {medicalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(medicalSchema) }}
        />
      )}
    </>
  );
}
