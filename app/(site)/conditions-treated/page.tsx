import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { HeartPulse, Phone } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { Reveal } from "@/components/Motion";
import { SectionEyebrow } from "@/components/InteriorMotion";
import { CONDITIONS } from "@/lib/conditions";
import { SITE } from "@/lib/navigation";
import { ConditionsSidebar } from "@/components/ConditionsSidebar";
import { ClientPill } from "@/components/ConditionPill";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/", {
  title: "Conditions Treated in Fernley, NV",
  description:
    "Ascension Health in Fernley, NV specializes in pain management, back pain, neck pain, sciatica, headaches, joint pain, sports injuries and more.",
  alternates: { canonical: "/conditions-treated/" },
  openGraph: {
    title: "Conditions Treated in Fernley, NV",
    description:
      "Pain management in Fernley, NV, back, neck, joint, knee, sciatica, whiplash and more.",
    url: "https://ascensionhealthnv.com/conditions-treated/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Conditions Treated in Fernley, NV",
    description:
      "Pain management in Fernley, NV, back, neck, joint, knee, sciatica, whiplash and more.",
  },
});
}

export default function ConditionsTreatedPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="Conditions Treated" />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[16.5px] leading-relaxed text-slate-700">
                Ascension Health specializes in pain management. According to
                the American Academy of Pain Medicine (AAPM),{" "}
                <em>
                  &quot;Chronic pain affects more Americans than diabetes,
                  heart disease and cancer combined.&quot;
                </em>{" "}
                If you&apos;re experiencing pain, we want to help. We&apos;re
                dedicated to helping patients regain pain-free lives.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Oftentimes, people don&apos;t seek help for pain until it
                worsens. We want to help at the onset of symptoms, so they
                don&apos;t progress. Tap any condition below to learn how we
                treat it.
              </p>
            </Reveal>

            <div className="mt-10">
              <Reveal>
                <SectionEyebrow
                  kicker="What we treat"
                  title="Conditions cared for at Ascension Health."
                  align="left"
                />
              </Reveal>

              <div className="mt-8 flex flex-wrap gap-3">
                {CONDITIONS.map((c, i) => (
                  <ClientPill
                    key={c.slug}
                    href={c.href}
                    title={c.title}
                    delay={i * 0.025}
                  />
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      Not sure which category fits?
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
                      Call our Fernley office and we&apos;ll help you figure
                      out the next step, even if your pain doesn&apos;t
                      neatly match a label.
                    </p>
                    <a
                      href={SITE.phoneHref}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-colors"
                    >
                      <Phone className="h-4 w-4" /> Call {SITE.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <ConditionsSidebar />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving Nevada Communities"
        intro="Ascension Health treats patients from across Nevada. Choose your city to explore local treatment options."
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body="Our Fernley team will help you find the right care plan for your condition."
      />
    </main>
  );
}
