import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PseoPageTemplate, type RelatedItem } from "@/components/pSEO/PseoPageTemplate";
import {
  PSEO_TREATMENT_PAGES,
  PSEO_TARGET_CITIES,
  buildPageMetadata,
  getTreatmentPage,
} from "@/lib/pSEO-routing";
import type { PSEOCity } from "@/lib/pSEO-data";
import {
  buildTreatmentFAQs,
  nearbyCities,
} from "@/lib/pSEO-content";

/**
 * `app/treatments/[slug]/page.tsx`
 *
 * Deep individual treatment-variation pages. Backed by every entry in
 * `PSEO_TREATMENT_PAGES` (symptom + comparison buckets from the pSEO data
 * set). Uses the universal {@link PseoPageTemplate} so every page carries
 * the same nine-section structure, FAQPage / LocalBusiness /
 * MedicalOrganization JSON-LD, and >800 words of unique content.
 *
 * Examples:
 *   /treatments/lower-back-pain-relief-nevada/
 *   /treatments/chiropractor-vs-physical-therapist-reno-nv/
 */

export const dynamicParams = false;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return PSEO_TREATMENT_PAGES.map((t) => ({ slug: t.treatmentSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getTreatmentPage(slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/treatments/${slug}/`,
  });
}

/** Comparison slugs encode a city via trailing `-{city}-nv`. Pull it out. */
function detectCity(slug: string): PSEOCity | undefined {
  if (!slug.endsWith("-nv")) return undefined;
  const without = slug.slice(0, -"-nv".length);
  for (const c of PSEO_TARGET_CITIES) {
    if (without.endsWith(`-${c.slug}`)) return c;
  }
  return undefined;
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getTreatmentPage(slug);
  if (!page) notFound();

  const city = detectCity(slug);
  const cityLabel = city?.name;

  const related: RelatedItem[] = PSEO_TREATMENT_PAGES.filter(
    (t) => t.category === page.category && t.treatmentSlug !== page.treatmentSlug
  )
    .slice(0, 6)
    .map((t) => ({ label: t.h1, href: `/treatments/${t.treatmentSlug}/` }));

  const isComparison = page.category === "comparison";

  const aboutParagraphs = isComparison
    ? [
        `${page.metaDescription} For ${cityLabel ? `${cityLabel}, NV` : "Nevada"} patients trying to decide between options, the honest answer is usually "it depends", and our job in this guide is to help you understand what it depends on so you can pick the right starting point.`,
        `At Ascension Health we have both approaches under one roof, which gives us a genuine advantage when explaining the tradeoffs. We've watched the same patient profiles do better with one path or the other, and we've seen what happens when the wrong path gets chosen first. The cost isn't usually the treatment itself, it's the months lost going down the path that wasn't going to work.`,
        `Most ${cityLabel ?? "Nevada"} patients benefit from a brief evaluation before committing to a plan. A 15-minute conversation with our clinical team often saves weeks of trial-and-error and several hundred dollars of misdirected co-pays. We won't push you toward whichever option we make the most money on, we tell you what we'd recommend if you were a family member.`,
        `Below you'll find the structured comparison plus our recommendations for who tends to do best with each path. If you'd rather just talk it through, call (775) 575-9922, we genuinely don't mind the question.`,
      ]
    : [
        `${page.metaDescription} If you've landed on this page, you're probably dealing with the symptom yourself or watching someone close to you struggle with it. In ${cityLabel ?? "Nevada"} we see this pattern often, and the good news is most cases are very treatable when the plan addresses the right driver.`,
        `Our approach at Ascension Health is conservative-first and root-cause-focused. We start with a real evaluation, exam, history, the mechanical and metabolic context, then build a written plan with clear progress markers. If you've been told "you'll just have to live with it" or "take this medication and we'll see," that's almost always a sign the workup wasn't thorough enough.`,
        `Treatment for the symptoms covered on this page usually combines two or three modalities, chiropractic, soft-tissue work, targeted injections, nutritional or hormonal support depending on the driver. The right combination is what tends to produce the results that hold, rather than a single intervention that fades.`,
        `Most ${cityLabel ?? "Nevada"} patients see meaningful change within the first 4–6 weeks. Some need longer; a few need a different specialist and we'll tell you so. The first step is a no-pressure consultation where we can lay out what we'd recommend.`,
      ];

  return (
    <PseoPageTemplate
      topicSlug={page.service ?? page.condition ?? page.symptom ?? "treatments"}
      topicName={page.h1.replace(/\s*\|\s*Ascension Health.*$/, "")}
      topicKind={page.condition ? "condition" : "treatment"}
      pagePath={`/treatments/${slug}/`}
      h1={page.h1}
      subheading={page.metaDescription}
      trustBadge={
        cityLabel
          ? `Serving ${cityLabel} & Surrounding Areas`
          : "Serving Patients Across Nevada"
      }
      parent={
        isComparison
          ? { label: "Compare Treatments", href: "/treatments/" }
          : { label: "Treatments", href: "/treatments/" }
      }
      aboutHeading={
        isComparison
          ? `How to choose, for ${cityLabel ?? "Nevada"} patients`
          : `What's going on, and what helps`
      }
      aboutParagraphs={aboutParagraphs}
      relatedHeading={
        isComparison ? "More side-by-side comparisons" : "Related symptom guides"
      }
      relatedItems={related}
      faqs={buildTreatmentFAQs(page.title, page.h1)}
      city={city}
      nearbyCities={city ? nearbyCities(city) : []}
      buildNearbyHref={(c) => `/treatments/${slug.replace(/-[a-z-]+-nv$/, `-${c.slug}-nv`)}/`}
      ctaHeading={cityLabel ? `Ready to get started in ${cityLabel}?` : `Ready to talk it through?`}
    />
  );
}
