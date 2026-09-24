import Link from "next/link";
import { Star } from "lucide-react";
import { Reveal } from "@/components/Motion";

export type TestimonialItem = {
  name: string;
  quote: string;
  when: string;
};

export function Testimonials({
  items,
  rating,
  reviewCount,
  reviewsUrl,
  heading,
  eyebrow = "Google Reviews",
  showSiteLink = true,
}: {
  items: TestimonialItem[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  heading?: string;
  eyebrow?: string;
  showSiteLink?: boolean;
}) {
  if (items.length === 0) return null;

  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(0) : rating.toFixed(1);

  return (
    <section className="bg-white border-y border-slate-200/70">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent text-center">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-center font-display text-3xl sm:text-4xl font-semibold text-brand-900">
            {heading ?? "What patients say on Google"}
          </h2>
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 mx-auto flex w-fit items-center gap-3 rounded-full bg-brand-50 px-4 py-2 ring-1 ring-brand-100 hover:bg-brand-100/70 transition-colors"
          >
            <GoogleMark />
            <span className="flex items-center gap-1 text-accent" aria-hidden>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </span>
            <span className="text-sm font-semibold text-brand-900">
              {ratingLabel} from {reviewCount.toLocaleString()} Google reviews
            </span>
          </a>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={`${t.name}-${i}`} delay={0.06 * i}>
              <figure className="h-full rounded-2xl bg-gradient-to-br from-brand-50 to-white p-7 ring-1 ring-brand-100 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1" aria-label="5 star Google review">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <GoogleMark />
                </div>
                <blockquote className="mt-4 text-[15px] text-slate-700 leading-relaxed whitespace-pre-line">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-brand-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white text-sm font-semibold">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-900">{t.name}</span>
                    <span className="block text-xs text-slate-500">{t.when}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-900 transition-colors"
          >
            View all Google reviews
          </a>
          {showSiteLink && (
            <Link
              href="/reviews/"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50 transition-colors"
            >
              Read reviews on this site
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function GoogleMark() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Google
    </span>
  );
}
