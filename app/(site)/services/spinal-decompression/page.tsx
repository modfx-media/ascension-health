import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Activity,
  Sparkles,
  Move3d,
  ArrowRight,
  Phone,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { SectionEyebrow, RelatedChips, ValueCard } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import spineImage from "@/images/spine-skeleton.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/spinal-decompression/", {
  title: "Spinal Decompression in Fernley, NV",
  description:
    "Non-surgical spinal decompression in Fernley, NV. Gentle mechanical traction relieves pressure on bulging or herniated discs and pinched spinal nerves.",
  alternates: { canonical: "/services/spinal-decompression/" },
  openGraph: {
    title: "Spinal Decompression in Fernley, NV",
    description:
      "A safe, non-invasive alternative to drugs and surgery for chronic back pain.",
    url: "https://ascensionhealthnv.com/services/spinal-decompression/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Spinal Decompression in Fernley, NV",
    description:
      "A safe, non-invasive alternative to drugs and surgery for chronic back pain.",
  },
});
}

const why = [
  {
    icon: <Move3d className="h-5 w-5" />,
    title: "Gentle Disc Relief",
    body: "Slow, controlled traction allows bulging discs to retract and rehydrate naturally.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Pressure Off the Nerves",
    body: "Decompressing the spine takes pressure off pinched nerves that cause radiating pain.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Drug & Surgery-Free",
    body: "A non-invasive alternative, most patients return to normal activity the same day.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Restored Quality of Life",
    body: "Sleep better, stand longer and get back to the activities you enjoy.",
  },
];

const relatedConditions = [
  { label: "Back Pain", href: "/conditions-treated/back-pain/" },
  { label: "Sciatica", href: "/conditions-treated/sciatica/" },
  { label: "Neck Pain", href: "/conditions-treated/neck-pain/" },
  { label: "Myofascial Release", href: "/conditions-treated/myofascial-release/" },
  { label: "Intersegmental Traction", href: "/conditions-treated/intersegmental-traction/" },
];

export default function ServicesSpinalDecompressionPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="Spinal Decompression"
        description="Non-surgical spinal decompression, gentle mechanical traction that relieves pressure on bulging or herniated discs and pinched spinal nerves."
        pagePath="/services/spinal-decompression/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "Spinal Decompression", url: "/services/spinal-decompression/" },
        ]}
      />
      <PageHero
        title="Spinal Decompression"
        parent={{ label: "Services", href: "/services/" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={spineImage}
                  alt="Spinal anatomy illustration showing vertebrae and discs"
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
                designed to relieve back pain. It works by gently stretching
                the spine to take pressure off the discs, the soft cushions
                that sit between your vertebrae. When that pressure is
                released, bulging discs can retract back into place, easing the
                strain on nearby nerves.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Decompression also allows water, oxygen and nutrients to flow
                back into the discs, helping them heal naturally. For anyone
                living with chronic back pain who wants a path back to a
                pain-free life, without drugs or surgery, it&apos;s an
                excellent option to consider.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="Why patients choose it"
                  title="A safer path back to a pain-free life."
                  align="left"
                />
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {why.map((b, i) => (
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
              <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="font-display text-2xl font-semibold text-slate-900">
                  Is spinal decompression right for you?
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                  Decompression is safe for most patients. During your
                  consultation we&apos;ll complete a thorough exam to rule out
                  conditions that could pose a risk. Common contraindications
                  include advanced osteoporosis, pregnancy, obesity and
                  extensive nerve damage, we&apos;ll discuss everything in
                  detail at your first visit.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                  If chronic back or neck pain has been disrupting your life, 
                  making it hard to stand, sleep or carry groceries, you
                  don&apos;t have to live this way. Call our office today at{" "}
                  <a
                    href={SITE.phoneHref}
                    className="font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {SITE.phone}
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Related conditions we treat
                </h3>
                <div className="mt-5">
                  <RelatedChips items={relatedConditions} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-3">
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
        intro="Spinal decompression at Ascension Health in Fernley, serving patients across northern and southern Nevada. Choose your city for local details."
        topic={{ slug: "spinal-decompression", name: "Spinal Decompression", kind: "service" }}
      />

      <BottomCTA />
    </main>
  );
}
