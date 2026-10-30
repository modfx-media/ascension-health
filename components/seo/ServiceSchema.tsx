import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";

const ORIGIN = resolvePublicSiteOrigin();

function ldJson(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

function abs(path: string): string {
  return path.startsWith("http") ? path : `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export type Breadcrumb = { name: string; url: string };

export type ServiceSchemaProps = {
  /** "service" -> MedicalTherapy; "condition" -> MedicalCondition. Defaults to "service". */
  kind?: "service" | "condition";
  /** Topic name, e.g. "Chiropractic Care". */
  name: string;
  /** 1–2 sentence summary used as description. */
  description: string;
  /** Page path, e.g. "/services/chiropractic-care/". */
  pagePath: string;
  /** Breadcrumb trail including Home. */
  breadcrumbs: Breadcrumb[];
};

/**
 * JSON-LD for an individual service or condition page. Renders a topic node
 * tied to the sitewide MedicalBusiness (`@id` reference) plus a BreadcrumbList.
 */
export function ServiceSchema({
  kind = "service",
  name,
  description,
  pagePath,
  breadcrumbs,
}: ServiceSchemaProps) {
  const url = abs(pagePath);

  const topic =
    kind === "condition"
      ? {
          "@context": "https://schema.org",
          "@type": "MedicalCondition",
          name,
          description,
          associatedAnatomy: { "@type": "AnatomicalSystem", name: "Musculoskeletal system" },
          possibleTreatment: { "@type": "MedicalTherapy", name: "Chiropractic care" },
          url,
        }
      : {
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          name,
          description,
          url,
          serviceType: "Medical service",
          provider: { "@id": `${ORIGIN}/#localbusiness` },
          areaServed: { "@type": "State", name: "Nevada" },
        };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: abs(b.url),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(topic) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbList) }}
      />
    </>
  );
}
