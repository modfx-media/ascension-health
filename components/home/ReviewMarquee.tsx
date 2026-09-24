"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { TestimonialItem } from "./Testimonials";

export function ReviewMarquee({ items }: { items: TestimonialItem[] }) {
  const reduceMotion = useReducedMotion();
  if (items.length === 0) return null;

  if (reduceMotion) {
    return (
      <div className="mt-12 flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:thin]">
        {items.map((item, i) => (
          <ReviewCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    );
  }

  const rowB = [...items].reverse();

  return (
    <div className="relative mt-12 flex flex-col gap-5">
      <MarqueeRow items={items} direction="left" duration={42} />
      <MarqueeRow items={rowB} direction="right" duration={48} />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: TestimonialItem[];
  direction: "left" | "right";
  duration: number;
}) {
  const animate =
    direction === "left" ? { x: ["0%", "-50%"] } : { x: ["-50%", "0%"] };

  return (
    <div className="group relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
      />
      <motion.div
        className="flex w-max gap-5 py-1"
        animate={animate}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        whileHover={{ transition: { duration: duration * 4, ease: "linear", repeat: Infinity } }}
      >
        {items.map((item, i) => (
          <ReviewCard key={`primary-${item.name}-${i}`} item={item} />
        ))}
        <div aria-hidden="true" className="contents">
          {items.map((item, i) => (
            <ReviewCard key={`clone-${item.name}-${i}`} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ReviewCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex h-full w-[320px] shrink-0 snap-start flex-col rounded-2xl bg-gradient-to-br from-brand-50 to-white p-6 ring-1 ring-brand-100 shadow-sm sm:w-[360px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1" aria-label="5 star Google review">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
          ))}
        </div>
        <GoogleMark />
      </div>
      <blockquote className="mt-4 line-clamp-6 text-[15px] leading-relaxed text-slate-700">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-brand-100 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
          {item.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-brand-900">{item.name}</span>
          <span className="block text-xs text-slate-500">{item.when}</span>
        </span>
      </figcaption>
    </figure>
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
