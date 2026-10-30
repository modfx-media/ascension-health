import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Smile,
  HeartHandshake,
  Phone,
  ArrowRight,
} from "lucide-react";
import { PageHero, AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import {
  InteriorCollage,
  SectionEyebrow,
  ValueCard,
  CalloutCard,
} from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/our-team/", {
  title: "Our Team in Fernley, NV",
  description:
    "Meet the chiropractic and wellness team at Ascension Health in Fernley, NV, patient-first care, education and a family atmosphere on every visit.",
  alternates: { canonical: "/our-team/" },
  openGraph: {
    title: "Our Team in Fernley, NV",
    description:
      "Meet the Ascension Health team in Fernley, NV, compassionate, education-first chiropractic and wellness care.",
    url: "https://ascensionhealthnv.com/our-team/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Our Team in Fernley, NV",
    description:
      "Meet the Ascension Health team in Fernley, NV, compassionate, education-first chiropractic and wellness care.",
  },
});
}

const values = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Patient Education First",
    body: "We take the time to explain the why behind every recommendation so you can make confident decisions.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Compassionate Care",
    body: "Whether you're in pain or seeking prevention, you'll be met with warmth and respect.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "A Family Atmosphere",
    body: "Our Fernley team treats every patient like extended family, from your first visit onward.",
  },
  {
    icon: <Smile className="h-5 w-5" />,
    title: "Lifestyle of Wellness",
    body: "Our goal is to instill a healthy mind-set, one patient at a time.",
  },
];

export default function OurTeamPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="Our Team" parent={{ label: "About", href: "/about/" }} />

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Welcome
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Caring for Fernley, one patient at a time.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-slate-700">
                Welcome to Ascension Health! We are committed to providing you
                with insight and information about the importance of developing
                a lifestyle of wellness. It is our goal to instill a healthy
                mind-set one patient at a time. As a patient, you can expect to
                be educated with information that will better help you on your
                journey to a healthier lifestyle.
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

              <div className="mt-12 lg:hidden">
                <InteriorCollage
                  primary="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
                  primaryAlt="Ascension Health care team welcoming patients"
                  secondary="https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?auto=format&fit=crop&w=600&q=80"
                  secondaryAlt="Smiling chiropractor"
                  tertiary="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=600&q=80"
                  tertiaryAlt="Patient consultation"
                  stat={{ value: "1:1 care", label: "Personal attention every visit" }}
                  badge={{ kicker: "Friendly", value: "Fernley" }}
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <AppointmentSidebar />
          </div>
        </div>

        <div className="mt-16 hidden lg:block">
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-5">
              <InteriorCollage
                primary="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
                primaryAlt="Ascension Health care team welcoming patients"
                secondary="https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?auto=format&fit=crop&w=600&q=80"
                secondaryAlt="Smiling chiropractor"
                tertiary="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=600&q=80"
                tertiaryAlt="Patient consultation"
                stat={{ value: "1:1 care", label: "Personal attention every visit" }}
                badge={{ kicker: "Friendly", value: "Fernley" }}
              />
            </div>
            <div className="col-span-7">
              <Reveal>
                <SectionEyebrow
                  kicker="What sets our team apart"
                  title="Insightful, friendly, and focused on your goals."
                  description="We listen first, explain clearly and build a plan that fits your life, not the other way around."
                  align="left"
                />
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {values.map((v, i) => (
                    <ValueCard
                      key={v.title}
                      index={i}
                      icon={v.icon}
                      title={v.title}
                      body={v.body}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <SectionEyebrow
            kicker="What sets our team apart"
            title="Insightful, friendly, and focused on your goals."
            align="left"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <ValueCard
                key={v.title}
                index={i}
                icon={v.icon}
                title={v.title}
                body={v.body}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionEyebrow
            kicker="Get started"
            title="Two simple ways to meet our team"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <CalloutCard
              title="New here? Start with new patient info."
              body="See what to expect on your first visit and complete intake forms ahead of time so we can spend more time with you."
              href="/new-patients/"
              cta="New Patient Info"
            />
            <CalloutCard
              title="Ready to book? Request an appointment."
              body="Choose your preferred day and time, a member of our staff will confirm by phone."
              href="/appointments/"
              cta="Request Appointment"
            />
          </div>
        </div>
      </section>

      <BottomCTA />
    </main>
  );
}
