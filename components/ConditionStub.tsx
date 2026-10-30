import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { ConditionsSidebar } from "@/components/ConditionsSidebar";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import { getCondition, getService } from "@/lib/pSEO-routing";
import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";

const ORIGIN = resolvePublicSiteOrigin();

function ldJson(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

// Maps the on-page slug (used in URLs like /conditions-treated/headaches-migraines/)
// to a pSEO data entry so the CityLinkGrid links to the correct silo. A few
// "conditions-treated" pages are actually service descriptions (e.g.
// myofascial-release) and link into the service silo instead.
const TOPIC_OVERRIDES: Record<
  string,
  { slug: string; kind: "service" | "condition" }
> = {
  "headaches-migraines": { slug: "headaches", kind: "condition" },
  "work-injury": { slug: "work-injuries", kind: "condition" },
  "intersegmental-traction": { slug: "intersegmental-traction", kind: "service" },
  "myofascial-release": { slug: "myofascial-release", kind: "service" },
};

function resolveTopic(slug: string, title: string) {
  const override = TOPIC_OVERRIDES[slug];
  if (override) {
    const entry =
      override.kind === "service"
        ? getService(override.slug)
        : getCondition(override.slug);
    if (entry) return { slug: entry.slug, name: entry.name, kind: override.kind };
  }
  const cond = getCondition(slug);
  if (cond) return { slug: cond.slug, name: cond.name, kind: "condition" as const };
  return { slug, name: title, kind: "condition" as const };
}

export function ConditionStub({
  title,
  slug,
  intro,
}: {
  title: string;
  slug: string;
  intro: string;
}) {
  const topic = resolveTopic(slug, title);
  const pageUrl = `${ORIGIN}/conditions-treated/${slug}/`;
  const isService = topic.kind === "service";
  const topicSchema = isService
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name: title,
        description: intro,
        procedureType: "TherapeuticProcedure",
        bodyLocation: "Musculoskeletal system",
        performer: { "@id": `${ORIGIN}/#localbusiness` },
        url: pageUrl,
      }
    : {
        "@context": "https://schema.org",
        "@type": "MedicalCondition",
        name: title,
        description: intro,
        associatedAnatomy: { "@type": "AnatomicalSystem", name: "Musculoskeletal system" },
        possibleTreatment: { "@type": "MedicalTherapy", name: "Chiropractic care" },
        url: pageUrl,
      };
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Conditions Treated",
        item: `${ORIGIN}/conditions-treated/`,
      },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl },
    ],
  };
  return (
    <main className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(topicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbList) }}
      />
      <PageHero
        title={title}
        parent={{ label: "Conditions Treated", href: "/conditions-treated/" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[16px] leading-relaxed text-slate-700">{intro}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                At Ascension Health our Fernley team treats {title.toLowerCase()} with
                non-surgical, drug-free care whenever possible, chiropractic adjustments,
                soft-tissue work, joint or trigger-point injections, and supportive
                services like IV nutrition. We start by understanding the underlying cause
                so the relief actually lasts.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                For more information or to{" "}
                <Link
                  href={SITE.appointmentsHref}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  request an appointment
                </Link>,{" "}
                call us today at{" "}
                <a
                  href={SITE.phoneHref}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  {SITE.phone}
                </a>
                .
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
                <Link
                  href={SITE.appointmentsHref}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-700 px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  Request Appointment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Want a fuller picture?
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                  Browse every condition we treat or call our Fernley office for a quick
                  conversation about whether we&apos;re a good fit for your situation.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/conditions-treated/"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-100 transition-colors"
                  >
                    View All Conditions
                  </Link>
                  <Link
                    href="/services/"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <ConditionsSidebar currentSlug={slug} />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading={`Find ${title} Treatment Near You`}
        intro={`Ascension Health serves patients across northern and southern Nevada from our Fernley clinic. Choose your city to see ${title.toLowerCase()} care details for your area.`}
        topic={topic}
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body={`Talk to our Fernley team about ${title.toLowerCase()} and we'll outline next steps.`}
      />
    </main>
  );
}
