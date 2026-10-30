import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { MessageSquare, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero, AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/what-can-we-improve/", {
  title: "What Can We Improve? in Fernley, NV",
  description:
    "Your feedback helps Ascension Health serve our Fernley, NV community better. Share what we can improve about your visit, our team or our care.",
  alternates: { canonical: "/what-can-we-improve/" },
  openGraph: {
    title: "What Can We Improve? in Fernley, NV",
    description:
      "Share your feedback with Ascension Health, your honest input helps us deliver better chiropractic and wellness care.",
    url: "https://ascensionhealthnv.com/what-can-we-improve/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "What Can We Improve? in Fernley, NV",
    description:
      "Share your feedback with Ascension Health, your honest input helps us deliver better care.",
  },
});
}

const points = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Tell us what happened",
    body: "Whether it was a scheduling hiccup, wait time or anything else, share the details so we understand the full picture.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Help us serve you better",
    body: "Every piece of feedback shapes how our team trains, communicates and cares for patients here in Fernley.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Your feedback stays private",
    body: "Comments submitted here come straight to our leadership team, they are not posted publicly anywhere.",
  },
];

export default function WhatCanWeImprovePage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="What Can We Improve?" />

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                <Sparkles className="h-3.5 w-3.5" />
                We Want To Hear From You
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Help us make your next visit even better
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                At Ascension Health, we are always working to raise the bar on
                the care we provide. If something about your experience
                fell short of what you expected, from booking your appointment
                to your time in the office, we want to know about it directly.
                Your feedback goes straight to our leadership team and helps us
                improve how we care for every patient who walks through our
                doors.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {points.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      {p.icon}
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold text-slate-900">
                  Share your feedback
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Use the form below to tell us what we can do better. A team
                  member will follow up if you would like a personal response, 
                  otherwise, your comments will be reviewed internally and used
                  to improve our practice.
                </p>

                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <AppointmentSidebar />
          </div>
        </div>
      </section>

      <BottomCTA />
    </main>
  );
}
