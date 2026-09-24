import { SITE } from "@/lib/navigation";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";

const ORIGIN = "https://ascensionhealthnv.com";
const APPROX_LAT = 39.6082;
const APPROX_LNG = -119.2517;

function ldJson(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

/**
 * Sitewide MedicalBusiness JSON-LD. Rendered once in the root layout so every
 * page emits clinic NAP, geo and hours. Uses a stable @id so per-page schema
 * (rendered by SchemaMarkup on pSEO routes) is treated as the same entity.
 */
export async function SiteSchema() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  const visible = reviews.filter(isFiveStarReview);

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${ORIGIN}/#localbusiness`,
    name: "Ascension Health",
    url: ORIGIN,
    telephone: SITE.phone,
    image: `${ORIGIN}/opengraph-image`,
    logo: `${ORIGIN}/opengraph-image`,
    priceRange: "$$",
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
    areaServed: { "@type": "State", name: "Nevada" },
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
    medicalSpecialty: [
      "Chiropractic",
      "Pain Management",
      "Regenerative Medicine",
    ],
    sameAs: [SITE.social?.facebook, SITE.social?.google, SITE.social?.twitter].filter(Boolean),
  };

  if (meta.rating > 0 && meta.reviewCount > 0) {
    organization.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(meta.rating),
      reviewCount: String(meta.reviewCount),
      bestRating: "5",
    };
  }

  if (visible.length > 0) {
    organization.review = visible.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: review.quote,
    }));
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    url: ORIGIN,
    name: "Ascension Health",
    publisher: { "@id": `${ORIGIN}/#localbusiness` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(website) }}
      />
    </>
  );
}
