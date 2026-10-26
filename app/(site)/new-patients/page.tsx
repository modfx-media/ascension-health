import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import {
  ClipboardList,
  MessageCircle,
  Stethoscope,
  CalendarCheck,
  FileText,
  Phone,
  ArrowRight,
} from "lucide-react";
import { PageHero, AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import {
  InteriorCollage,
  SectionEyebrow,
  StepCard,
  CalloutCard,
} from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/new-patients/", {
  title: "New Patients in Fernley, NV",
  description:
    "New patient information for Ascension Health in Fernley, NV. Print intake forms, learn what to expect on your first visit and request an appointment online.",
  alternates: { canonical: "/new-patients/" },
  openGraph: {
    title: "New Patients in Fernley, NV",
    description:
      "What to expect on your first visit to Ascension Health in Fernley, NV, forms, evaluation and personalized care plan.",
    url: "https://ascensionhealthnv.com/new-patients/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "New Patients in Fernley, NV",
    description:
      "What to expect on your first visit to Ascension Health in Fernley, NV, forms, evaluation and personalized care plan.",
  },
});
}

const steps = [
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Complete intake forms",
    body: "Print and complete your paperwork at home so you can skip the waiting room clipboard.",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "Tell us what brought you in",
    body: "We listen first, share your story, your goals and any prior treatments you've tried.",
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Focused evaluation",
    body: "A targeted exam helps us identify the source of your symptoms, not just where you feel them.",
  },
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    title: "Personalized care plan",
    body: "We walk through findings, explain options and start a plan built around you.",
  },
];

const faqs = [
  {
    q: "Do I need a referral to be seen?",
    a: "No, you can call us directly to book an appointment. Most insurance plans don't require a referral for chiropractic care.",
  },
  {
    q: "How long is the first visit?",
    a: "Plan on roughly 45–60 minutes for your initial visit, which includes consultation, exam and a personalized care plan.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable clothing that allows movement is ideal. We'll let you know if anything specific is needed for your visit.",
  },
  {
    q: "Do you accept insurance?",
    a: "We work with most major insurance plans. Call our team at (775) 575-9922 and we'll verify your benefits.",
  },
];

export default function NewPatientsPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="New Patients" />

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Welcome to the practice
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                We make your first visit easy.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-slate-700">
                Here at Ascension Health, we value our patients. We acknowledge
                that going to a new place for the first time can be nerve
                racking. We want to do everything we can to eliminate any
                unnecessary stressors, which is why we include the option of
                printing and completing your forms at home. We think of our
                patients as part of our extended family, and we are excited to
                meet you! If you have any questions regarding your first visit,
                please don&rsquo;t hesitate to call us at{" "}
                <a
                  href={SITE.phoneHref}
                  className="text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline font-medium"
                >
                  {SITE.phone}
                </a>
                .
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/new-patients/online-forms/"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-colors"
                >
                  <FileText className="h-4 w-4" /> Get Online Forms
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-700 px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
              </div>

              <div className="mt-12 lg:hidden">
                <InteriorCollage
                  primary="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80"
                  primaryAlt="Friendly welcome at Ascension Health"
                  secondary="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"
                  secondaryAlt="Modern reception area"
                  tertiary="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80"
                  tertiaryAlt="Patient paperwork"
                  stat={{ value: "Hassle-free", label: "Forms ready before you arrive" }}
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
                primary="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80"
                primaryAlt="Friendly welcome at Ascension Health"
                secondary="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"
                secondaryAlt="Modern reception area"
                tertiary="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80"
                tertiaryAlt="Patient paperwork"
                stat={{ value: "Hassle-free", label: "Forms ready before you arrive" }}
              />
            </div>
            <div className="col-span-7">
              <Reveal>
                <SectionEyebrow
                  kicker="What to expect"
                  title="Four simple steps from intake to care plan."
                  description="We've designed a calm, efficient first visit so you feel informed and confident from the moment you walk in."
                  align="left"
                />
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {steps.map((s, i) => (
                    <StepCard
                      key={s.title}
                      index={i}
                      icon={s.icon}
                      title={s.title}
                      body={s.body}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <SectionEyebrow
            kicker="What to expect"
            title="Four simple steps from intake to care plan."
            align="left"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {steps.map((s, i) => (
              <StepCard
                key={s.title}
                index={i}
                icon={s.icon}
                title={s.title}
                body={s.body}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <CalloutCard
              title="Save time, complete your forms online."
              body="Download and fill in your new-patient paperwork before your visit. It only takes a few minutes."
              href="/new-patients/online-forms/"
              cta="Open Online Forms"
            />
            <CalloutCard
              title="Have questions? Talk to our team."
              body="Insurance, scheduling, or what to bring, we're happy to help. Call us at (775) 575-9922."
              href={SITE.phoneHref}
              cta={`Call ${SITE.phone}`}
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <SectionEyebrow
            kicker="FAQ"
            title="Answers to common new-patient questions"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="font-display text-base font-semibold text-slate-900">
                    {f.q}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={SITE.appointmentsHref}
              className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-colors"
            >
              Request Your First Appointment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <BottomCTA />
    </main>
  );
}
