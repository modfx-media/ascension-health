import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Move3d,
  Sparkles,
  Activity,
  ArrowRight,
  Phone,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { SectionEyebrow, RelatedChips, ValueCard } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import neckImage from "@/images/neck-pain.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/spinal-decompression/", {
  title: "Spinal Decompression in Fernley, NV",
  description:
    "Non-surgical spinal decompression in Fernley, NV. A gentle, non-invasive treatment that relieves pressure on spinal discs and pinched nerves.",
  alternates: { canonical: "/spinal-decompression/" },
  openGraph: {
    title: "Spinal Decompression in Fernley, NV",
    description:
      "Non-invasive spinal decompression for chronic back and neck pain in Fernley, NV.",
    url: "https://ascensionhealthnv.com/spinal-decompression/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Spinal Decompression in Fernley, NV",
    description:
      "Non-invasive spinal decompression for chronic back and neck pain in Fernley, NV.",
  },
});
}

const benefits = [
  {
    icon: <Move3d className="h-5 w-5" />,
    title: "Targeted Disc Relief",
    body: "Controlled spinal stretching takes pressure off bulging or herniated discs.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Calmer Nerves",
    body: "Decompression eases the pinched-nerve sensations that radiate down arms or legs.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Non-Invasive",
    body: "No incisions, no downtime, a comfortable session inside our Fernley office.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Natural Healing",
    body: "Allows fluids and nutrients back into the discs so the body can repair itself.",
  },
];

const relatedConditions = [
  { label: "Back Pain", href: "/conditions-treated/back-pain/" },
  { label: "Neck Pain", href: "/conditions-treated/neck-pain/" },
  { label: "Sciatica", href: "/conditions-treated/sciatica/" },
  { label: "Pain Relief", href: "/conditions-treated/pain-relief/" },
];

export default function SpinalDecompressionPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="Spinal Decompression"
        description="Non-surgical spinal decompression, a gentle treatment that relieves pressure on spinal discs and pinched nerves."
        pagePath="/spinal-decompression/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "Spinal Decompression", url: "/spinal-decompression/" },
        ]}
      />
      <PageHero title="Spinal Decompression" />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={neckImage}
                  alt="Patient receiving neck and spinal care at Ascension Health"
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                  priority
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Spinal decompression is a non-invasive, in-office procedure
                used to relieve back pain. By gently stretching the spine, it
                takes pressure off the discs that cushion the vertebrae.
                That relief lets bulging discs retract back into place, and
                takes pressure off the nerves that cause radiating pain.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Decompression also allows water, oxygen and nutrients to flow
                back into the discs so they can heal naturally. For anyone
                living with chronic back pain who wants to get back to a
                pain-free life as quickly as possible, it&apos;s an excellent
                option to explore.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="What you can expect"
                  title="A gentler way to address chronic back pain."
                  align="left"
                />
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <ValueCard
                    key={b.title}
                    index={i}
                    title={b.title}
                    body={b.body}
                    icon={b.icon}
                  />
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Related conditions we treat
                </h3>
                <div className="mt-5">
                  <RelatedChips items={relatedConditions} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 text-[15px] leading-relaxed text-slate-700">
                Learn more on our detailed{" "}
                <Link
                  href="/services/spinal-decompression/"
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  Spinal Decompression service page
                </Link>{" "}
                or call our team at{" "}
                <a
                  href={SITE.phoneHref}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  {SITE.phone}
                </a>
                .
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
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
          </div>

          <div className="lg:col-span-4">
            <ServicesSidebar currentSlug="spinal-decompression" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="Non-surgical spinal decompression at Ascension Health in Fernley, serving disc herniation, sciatica, and chronic low-back patients across Nevada."
        topic={{ slug: "spinal-decompression", name: "Spinal Decompression", kind: "service" }}
      />

      <BottomCTA />
    </main>
  );
}
