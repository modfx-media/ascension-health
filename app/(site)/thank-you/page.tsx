import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Phone } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/thank-you/", {
  title: "Thank You in Fernley, NV",
  description:
    "Thank you for contacting Ascension Health. Our team will reach out within 24 hours to confirm your appointment.",
  alternates: { canonical: "/thank-you/" },
  robots: { index: false, follow: true },
});
}

export default function ThankYouPage() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50 min-h-[80vh] flex items-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(43,56,32,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 right-1/4 -z-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl"
      />

      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <Reveal>
          <div className="relative mx-auto inline-flex">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-brand-400/30 blur-2xl animate-pulse"
            />
            <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 shadow-2xl shadow-brand-900/30 ring-8 ring-white">
              <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={2.2} />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-8 font-display text-5xl sm:text-6xl font-semibold text-brand-950 tracking-tight">
            Thank You!
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-5 text-lg sm:text-xl text-slate-700 leading-relaxed">
            We&apos;ll be in touch within 24 hours.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Your request has been received. Our team is reviewing it and will
            reach out to confirm your appointment shortly.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-700 to-brand-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-200 hover:ring-brand-400 hover:bg-brand-50 transition-all"
            >
              <Phone className="h-4 w-4" />
              Call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
