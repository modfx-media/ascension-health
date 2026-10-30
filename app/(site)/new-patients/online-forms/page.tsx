import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import {
  FileText,
  ExternalLink,
  KeyRound,
  ClipboardCheck,
  Phone,
} from "lucide-react";
import { PageHero, AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/new-patients/online-forms/", {
  title: "Online Forms in Fernley, NV",
  description:
    "Complete your new patient paperwork online before your visit to Ascension Health in Fernley, NV. A passcode from our office is required to match your chart.",
  alternates: { canonical: "/new-patients/online-forms/" },
  openGraph: {
    title: "Online Forms in Fernley, NV",
    description:
      "Complete your new patient paperwork online before your visit to Ascension Health in Fernley, NV.",
    url: "https://ascensionhealthnv.com/new-patients/online-forms/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Online Forms in Fernley, NV",
    description:
      "Complete your new patient paperwork online before your visit to Ascension Health in Fernley, NV.",
  },
});
}

const INTAKE_URL = "https://intake.helloinnate.com/";

export default function OnlineFormsPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="Online Forms" />

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                New Patient Paperwork
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Save time at your first visit &mdash; complete your forms
                online.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
                Here is the link to our new patient paperwork. Click on it and
                it will take you to everything Ascension Health needs filled
                out for your upcoming visit.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                You will need a pin/passcode from the office when you make a
                new patient appointment, to match the forms for your chart.
              </p>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-brand-900/5">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
                    <FileText className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      Open New Patient Paperwork
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Secure intake hosted by Innate. Have your office-issued
                      passcode ready.
                    </p>
                    <a
                      href={INTAKE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-800"
                    >
                      Start My Paperwork
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <KeyRound className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-slate-900">
                      Need your passcode?
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Call our office and we&rsquo;ll provide the pin that
                      links your forms to your chart.
                    </p>
                    <a
                      href={SITE.phoneHref}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      <Phone className="h-4 w-4" />
                      {SITE.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <ClipboardCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-slate-900">
                      Before you submit
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Review your information for accuracy so we can confirm
                      your visit without delay.
                    </p>
                    <Link
                      href="/new-patients/"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      What to expect &rarr;
                    </Link>
                  </div>
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
