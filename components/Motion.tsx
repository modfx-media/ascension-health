"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import neckPainImage from "@/images/neck-pain.jpg";
import ivTherapyImage from "@/images/clone/IV-Therapy.jpg";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bone,
  Droplet,
  HeartPulse,
  Scale,
  Sparkles,
  Syringe,
} from "lucide-react";
import logo from "@/images/logo.png";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  duration = 1.6,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(to);
  const rounded = useTransform(mv, (v) =>
    decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()
  );
  const [mounted, setMounted] = React.useState(false);

  const finalText = decimals
    ? to.toFixed(decimals)
    : Math.round(to).toLocaleString();

  React.useEffect(() => {
    setMounted(true);
    mv.set(0);
  }, [mv]);

  React.useEffect(() => {
    if (!mounted || !inView) return;
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [mounted, inView, to, duration, mv]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{mounted ? rounded : finalText}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export function FloatingBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-brand-300/40 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function OrbitGraphic() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* Soft gradient backdrop */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100" />

      {/* Radial dotted texture inside the disc */}
      <div
        aria-hidden
        className="absolute inset-6 rounded-full opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(105,129,55,0.25) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(circle at center, black 35%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 35%, transparent 70%)",
        }}
      />

      {/* Soft radial glow behind the centerpiece */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(229,226,94,0.35) 0%, rgba(140,164,80,0.12) 45%, transparent 70%)",
        }}
      />

      {/* Botanical leaf silhouette, slowly rotates, echoes the logo mark */}
      <motion.svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        <g transform="translate(200 200)" fill="#698137">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              transform={`rotate(${deg})`}
              d="M0 -150 C30 -130, 45 -90, 30 -55 C20 -30, 5 -20, 0 -10 C-5 -20, -20 -30, -30 -55 C-45 -90, -30 -130, 0 -150 Z"
            />
          ))}
          <circle r="14" />
        </g>
      </motion.svg>

      {/* Drifting mini medical glyphs between the orbits */}
      <DriftGlyph
        className="left-[18%] top-[22%]"
        delay={0}
        glyph="leaf"
      />
      <DriftGlyph
        className="right-[16%] top-[28%]"
        delay={1.2}
        glyph="heart"
      />
      <DriftGlyph
        className="left-[20%] bottom-[20%]"
        delay={2.4}
        glyph="plus"
      />

      {/* Pulsing rings emanating from the center */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/40"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.6], opacity: [0.55, 0] }}
          transition={{
            duration: 3.6,
            delay: i * 1.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Animated ECG / pulse line */}
      <motion.svg
        aria-hidden
        viewBox="0 0 400 60"
        className="absolute left-0 right-0 top-[58%] mx-auto h-10 w-3/4 opacity-60"
      >
        <motion.path
          d="M0 30 L80 30 L95 12 L110 48 L125 20 L140 38 L160 30 L240 30 L255 14 L270 46 L285 22 L300 36 L320 30 L400 30"
          fill="none"
          stroke="#698137"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.85, 1],
          }}
        />
      </motion.svg>

      {/* Sparkle dots */}
      <Sparkle className="left-[22%] top-[28%]" delay={0} />
      <Sparkle className="left-[78%] top-[34%]" delay={0.6} />
      <Sparkle className="left-[30%] top-[72%]" delay={1.1} />
      <Sparkle className="left-[68%] top-[68%]" delay={1.7} />

      {/* Rotating orbits */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        <circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="#698137"
          strokeOpacity="0.25"
          strokeDasharray="3 6"
        />
        <circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="#698137"
          strokeOpacity="0.15"
        />
        <circle cx="200" cy="30" r="6" fill="#698137" />
        <circle cx="330" cy="200" r="4" fill="#8ca450" />
      </motion.svg>

      {/* Counter-rotating inner orbit */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <circle
          cx="200"
          cy="200"
          r="90"
          fill="none"
          stroke="#698137"
          strokeOpacity="0.2"
          strokeDasharray="2 4"
        />
        <circle cx="200" cy="110" r="5" fill="#8ca450" />
      </motion.svg>

      {/* Central glyph */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-44 w-44 rounded-full bg-white shadow-xl shadow-brand-900/10 flex items-center justify-center px-5">
          <Image
            src={logo}
            alt="Ascension Health"
            className="h-auto w-full"
            sizes="180px"
            priority
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-950 shadow">
            Fernley · Nevada
          </div>
        </div>
      </motion.div>

      {/* Floating service chips */}
      <FloatingChip
        label="Chiropractic"
        className="absolute top-6 left-2"
        delay={0}
      />
      <FloatingChip
        label="Wellness"
        className="absolute top-1/3 right-0"
        delay={0.4}
      />
      <FloatingChip
        label="Pain Relief"
        className="absolute bottom-10 left-6"
        delay={0.8}
      />
      <FloatingChip
        label="Recovery"
        className="absolute bottom-20 right-4"
        delay={1.2}
      />
    </div>
  );
}

function Sparkle({
  className,
  delay,
}: {
  className?: string;
  delay: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`absolute h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(229,226,94,0.6)] ${className ?? ""}`}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function DriftGlyph({
  className,
  delay,
  glyph,
}: {
  className?: string;
  delay: number;
  glyph: "leaf" | "heart" | "plus";
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute z-[5] flex h-9 w-9 items-center justify-center rounded-xl bg-white/85 backdrop-blur border border-brand-200/70 shadow-md shadow-brand-900/10 text-brand-700 ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: [0, 1, 1, 0.85],
        scale: 1,
        y: [0, -12, 0],
        x: [0, 6, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 8, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {glyph === "leaf" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M20 4c-9 0-14 5-14 12 0 1 0 2 .3 3 .2 .6 .9 .8 1.4 .5 .5-.3 .6-.9 .4-1.4-.1-.3-.1-.7-.1-1 5-1 8-3 10-7-1 5-4 8-9 9 7 0 12-4 12-12V4z" />
        </svg>
      )}
      {glyph === "heart" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z" />
        </svg>
      )}
      {glyph === "plus" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" />
        </svg>
      )}
    </motion.div>
  );
}

function FloatingChip({
  label,
  className,
  delay,
}: {
  label: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 5, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-brand-800 shadow-lg shadow-brand-900/10 border border-brand-100">
        {label}
      </div>
    </motion.div>
  );
}

/* ---------- Rich Hero Visual: layers a 3D-feel scene around OrbitGraphic ---------- */

type IconType = React.ComponentType<{ className?: string }>;

const HERO_SERVICE_ICONS: { Icon: IconType; label: string }[] = [
  { Icon: Bone, label: "Chiropractic" },
  { Icon: Activity, label: "Spinal Decompression" },
  { Icon: Syringe, label: "Joint Injections" },
  { Icon: Droplet, label: "Nutritional IVs" },
  { Icon: HeartPulse, label: "Hormone Therapy" },
  { Icon: Scale, label: "Medical Weight Loss" },
  { Icon: Sparkles, label: "Wellness" },
];

export function HeroVisual({
  rating = 4.9,
  reviewsUrl,
}: {
  rating?: number;
  reviewsUrl?: string;
}) {
  const serviceIcons = HERO_SERVICE_ICONS;
  return (
    <div
      className="relative w-full max-w-[620px] mx-auto"
      style={{ perspective: "1400px" }}
    >
      {/* Ambient gradient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, -12, 0], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-10 h-80 w-80 rounded-full bg-brand-400/40 blur-3xl"
        animate={{ y: [0, -22, 0], x: [0, 14, 0], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-brand-300/30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Service icon ring, rotates slowly, with each icon counter-rotated to stay upright */}
      <ServiceIconRing items={serviceIcons} />

      {/* Centerpiece: the existing OrbitGraphic */}
      <div className="relative">
        <OrbitGraphic />
      </div>

      {/* 3D-tilted glass cards layered in front */}
      <motion.div
        className="absolute -top-2 -left-4 sm:left-2 z-20"
        initial={{ opacity: 0, y: 20, rotateY: -18 }}
        animate={{ opacity: 1, y: [0, -8, 0], rotateY: -12 }}
        transition={{
          opacity: { duration: 0.7, delay: 0.4 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 0.7, delay: 0.4 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl shadow-brand-950/30 px-4 py-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-700/30">
            <CalendarGlyph />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] uppercase tracking-wider text-brand-700 font-semibold">
              Same-day
            </div>
            <div className="text-sm font-semibold text-brand-950">
              Appointments
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-2 -right-2 sm:right-4 z-20"
        initial={{ opacity: 0, y: 20, rotateY: 18 }}
        animate={{ opacity: 1, y: [0, -10, 0], rotateY: 12 }}
        transition={{
          opacity: { duration: 0.7, delay: 0.6 },
          y: { duration: 7, delay: 0.5, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 0.7, delay: 0.6 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <RatingCard
          rating={rating}
          reviewsUrl={reviewsUrl}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 left-2 sm:left-6 z-20 hidden sm:block"
        initial={{ opacity: 0, x: -20, rotateY: -20 }}
        animate={{ opacity: 1, x: 0, rotateY: -10, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: 0.8 },
          x: { duration: 0.7, delay: 0.8 },
          rotateY: { duration: 0.7, delay: 0.8 },
          y: { duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="rounded-2xl bg-brand-950/90 backdrop-blur-xl border border-brand-700/50 shadow-2xl shadow-brand-950/40 px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">
            9 Years
          </div>
          <div className="text-sm font-semibold text-white leading-tight">
            Caring for Fernley
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RatingCard({
  rating,
  reviewsUrl,
}: {
  rating: number;
  reviewsUrl?: string;
}) {
  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(0) : rating.toFixed(1);
  const inner = (
    <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl shadow-brand-950/30 px-4 py-3 min-w-[200px]">
      <div className="flex items-center gap-1 text-accent">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarGlyph key={i} />
        ))}
        <span className="ml-1 text-xs font-semibold text-brand-950">
          {ratingLabel}
        </span>
      </div>
      <div className="mt-1 text-sm font-semibold text-brand-950 leading-tight">
        Loved by patients
      </div>
      <div className="text-[11px] text-brand-800/70 mt-0.5">
        Google reviews
      </div>
    </div>
  );

  if (!reviewsUrl) return inner;

  return (
    <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  );
}

function ServiceIconRing({
  items,
}: {
  items: { Icon: IconType; label: string }[];
}) {
  const radius = 47; // percent of container, places chips on the outer edge
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-10"
      animate={{ rotate: 360 }}
      transition={{ duration: 50, ease: "linear", repeat: Infinity }}
    >
      {items.map((it, i) => {
        const angle = (i / items.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);
        return (
          <motion.div
            key={it.label}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 50, ease: "linear", repeat: Infinity }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 backdrop-blur border border-brand-100 shadow-lg shadow-brand-950/20 text-brand-700"
              title={it.label}
            >
              <it.Icon className="h-5 w-5" />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function CalendarGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function StarGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M12 17.3 5.8 21l1.6-7.2L2 9.2l7.3-.6L12 2l2.7 6.6 7.3.6-5.4 4.6L18.2 21z" />
    </svg>
  );
}

/* ============================ MISSION COLLAGE ============================ */

export function MissionCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Soft halo */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-100/60 via-transparent to-accent/20 blur-2xl"
      />

      {/* Decorative dotted grid */}
      <motion.div
        aria-hidden
        className="absolute -top-6 -right-6 h-32 w-32 rounded-xl opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(67,86,39,0.35) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative grid grid-cols-6 grid-rows-6 gap-4 aspect-square">
        {/* Primary photo (large) */}
        <motion.div
          className="relative col-span-4 row-span-4 overflow-hidden rounded-3xl ring-1 ring-slate-200/60 shadow-2xl shadow-brand-900/15"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* TODO: replace stock Unsplash URL with real clinic photography. */}
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80"
              alt="Compassionate chiropractic care at Ascension Health"
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw"
              className="object-cover"
              unoptimized
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/45 via-transparent to-transparent" />
        </motion.div>

        {/* Secondary photo (top-right) */}
        <motion.div
          className="relative col-span-2 row-span-2 col-start-5 row-start-1 overflow-hidden rounded-2xl ring-1 ring-slate-200/60 shadow-xl shadow-brand-900/10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* TODO: replace stock Unsplash URL with real clinic photography. */}
          <Image
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
            alt="Rehabilitation and recovery"
            fill
            sizes="180px"
            className="object-cover"
            unoptimized
          />
        </motion.div>

        {/* Tertiary photo (bottom-left) */}
        <motion.div
          className="relative col-span-2 row-span-2 col-start-1 row-start-5 overflow-hidden rounded-2xl ring-1 ring-slate-200/60 shadow-xl shadow-brand-900/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* TODO: replace stock Unsplash URL with real clinic photography. */}
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
            alt="Wellness and personalized treatment"
            fill
            sizes="180px"
            className="object-cover"
            unoptimized
          />
        </motion.div>

        {/* Accent card with stat */}
        <motion.div
          className="relative col-span-4 row-span-2 col-start-3 row-start-5 flex items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-xl shadow-brand-900/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.span>
            <div>
              <p className="font-display text-2xl font-semibold text-slate-900 leading-none">
                <Counter to={9} /> yrs
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-tight">
                Caring for Fernley families
              </p>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-700">
              Trusted
            </span>
            <span className="font-display text-lg font-semibold text-slate-900">
              4.9 ★
            </span>
          </div>
        </motion.div>

        {/* Floating leaf badge */}
        <motion.div
          aria-hidden
          className="absolute -top-5 -left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-brand-950 shadow-lg shadow-brand-900/20"
          initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="currentColor"
            animate={{ rotate: [0, 8, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </motion.svg>
        </motion.div>

        {/* Subtle pulse rings behind primary photo */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute left-[28%] top-[28%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-400/40"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.8], opacity: [0.5, 0] }}
            transition={{
              duration: 4,
              delay: i * 1.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================ SERVICES SHOWCASE ============================ */

export function ServicesShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* Halo */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-brand-200/50 blur-2xl"
      />

      {/* Dotted accent */}
      <motion.div
        aria-hidden
        className="absolute -bottom-6 -left-6 h-28 w-28 rounded-xl opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(67,86,39,0.35) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative grid grid-cols-6 grid-rows-6 gap-4 aspect-[5/6]">
        {/* Main image */}
        <motion.div
          className="relative col-span-6 row-span-4 overflow-hidden rounded-3xl ring-1 ring-slate-200/60 shadow-2xl shadow-brand-900/15"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* TODO: replace stock Unsplash URL with real clinic photography. */}
            <Image
              src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=900&q=80"
              alt="Specialized chiropractic and pain relief services"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              unoptimized
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-brand-950/10 to-transparent" />

          {/* Floating badge */}
          <motion.div
            className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-md backdrop-blur"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-700" />
            </span>
            Now accepting patients
          </motion.div>
        </motion.div>

        {/* Stat card */}
        <motion.div
          className="relative col-span-3 row-span-2 col-start-1 row-start-5 flex flex-col justify-between rounded-2xl bg-brand-800 p-5 text-white shadow-xl shadow-brand-900/15"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-5 bg-accent" />
            Services
          </div>
          <div>
            <p className="font-display text-4xl font-semibold leading-none">
              <Counter to={9} suffix="+" />
            </p>
            <p className="mt-1.5 text-xs text-brand-100 leading-tight">
              Specialized treatment options
            </p>
          </div>
        </motion.div>

        {/* Secondary image */}
        <motion.div
          className="relative col-span-3 row-span-2 col-start-4 row-start-5 overflow-hidden rounded-2xl ring-1 ring-slate-200/60 shadow-xl shadow-brand-900/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={ivTherapyImage}
            alt="Nutritional IV therapy at Ascension Health"
            fill
            sizes="220px"
            className="object-cover"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 to-transparent" />
        </motion.div>

        {/* Floating accent chip */}
        <motion.div
          aria-hidden
          className="absolute -top-4 -right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-brand-950 shadow-lg shadow-brand-900/20"
          initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: [0, 12, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 2 14.39 8.26 21 9.27l-5 4.87 1.18 6.88L12 17.77 6.82 21 8 14.14 3 9.27l6.61-1.01L12 2z" />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================ CONDITIONS HERO ============================ */

export function ConditionsHero() {
  const hotspots = [
    { top: "14%", left: "52%", label: "Neck" },
    { top: "30%", left: "30%", label: "Shoulder" },
    { top: "48%", left: "60%", label: "Back" },
    { top: "72%", left: "42%", label: "Knee" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* Halo */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-brand-200/60 via-transparent to-accent/25 blur-2xl"
      />

      {/* Dotted accent */}
      <motion.div
        aria-hidden
        className="absolute -top-6 -right-6 h-28 w-28 rounded-xl opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(67,86,39,0.35) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-slate-200/60 shadow-2xl shadow-brand-900/15"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={neckPainImage}
            alt="Neck pain treatment at Ascension Health in Fernley, NV"
            fill
            sizes="(min-width: 1024px) 480px, 90vw"
            className="object-cover"
            placeholder="blur"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/65 via-brand-950/10 to-transparent" />

        {/* Hotspots */}
        {hotspots.map((h, i) => (
          <motion.div
            key={h.label}
            className="absolute"
            style={{ top: h.top, left: h.left }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative flex items-center gap-2">
              <span className="relative flex h-3.5 w-3.5">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-accent"
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent ring-2 ring-white/80" />
              </span>
              <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800 shadow-sm backdrop-blur">
                {h.label}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Bottom stat card */}
        <motion.div
          className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 backdrop-blur-md shadow-xl ring-1 ring-white/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-700">
                Conditions
              </p>
              <p className="font-display text-2xl font-semibold text-slate-900 leading-none mt-1">
                Head to toe relief
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="2.5" />
                <path d="M12 7.5v4M8 11.5h8M12 11.5v4M10 19l2-3.5 2 3.5" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating heart badge */}
      <motion.div
        aria-hidden
        className="absolute -bottom-5 -left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-900/25"
        initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="currentColor"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* ============================ CONDITIONS MARQUEE ============================ */

import { ArrowUpRight, Brain, ShieldCheck } from "lucide-react";

const CONDITION_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Back Pain": Bone,
  "Neck Pain": Bone,
  "Shoulder Pain": Activity,
  Whiplash: Activity,
  "Sexual Dysfunction": HeartPulse,
  "Hormonal Imbalance": Sparkles,
  Neuropathy: Brain,
  "Pain Relief": ShieldCheck,
  "Joint Pain": Bone,
  "Knee Pain": Bone,
};

const CONDITION_TONE: Record<string, string> = {
  "Back Pain": "from-brand-600/15 to-brand-50",
  "Neck Pain": "from-accent/25 to-brand-50",
  "Shoulder Pain": "from-brand-500/15 to-brand-50",
  Whiplash: "from-accent/20 to-brand-50",
  "Sexual Dysfunction": "from-brand-600/15 to-brand-50",
  "Hormonal Imbalance": "from-accent/25 to-brand-50",
  Neuropathy: "from-brand-500/15 to-brand-50",
  "Pain Relief": "from-accent/20 to-brand-50",
  "Joint Pain": "from-brand-600/15 to-brand-50",
  "Knee Pain": "from-accent/25 to-brand-50",
};

type ConditionItem = { label: string; href: string };

function ConditionCard({
  item,
  asLink = true,
}: {
  item: ConditionItem;
  asLink?: boolean;
}) {
  const Icon = CONDITION_ICON_MAP[item.label] ?? HeartPulse;
  const tone = CONDITION_TONE[item.label] ?? "from-brand-600/15 to-brand-50";
  const className =
    "group/card relative flex w-[260px] shrink-0 flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-600 hover:shadow-xl hover:shadow-brand-900/10";
  const inner = (
    <>
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-16 rounded-t-2xl bg-gradient-to-b ${tone}`}
      />
      <div className="relative flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-700 ring-1 ring-slate-200 shadow-sm transition group-hover/card:bg-brand-700 group-hover/card:text-white group-hover/card:ring-brand-700">
          <Icon className="h-6 w-6" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover/card:bg-accent group-hover/card:text-brand-950">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="relative">
        {asLink ? (
          <h3 className="font-display text-lg font-semibold text-slate-900 leading-tight">
            {item.label}
          </h3>
        ) : (
          <p className="font-display text-lg font-semibold text-slate-900 leading-tight">
            {item.label}
          </p>
        )}
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
          Targeted, evidence-based relief from {item.label.toLowerCase()}.
        </p>
      </div>
      <div className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        Explore care
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </div>
    </>
  );

  if (!asLink) {
    return (
      <div tabIndex={-1} className={className}>
        {inner}
      </div>
    );
  }
  return (
    <a href={item.href} className={className}>
      {inner}
    </a>
  );
}

export function ConditionsMarquee({ items }: { items: ConditionItem[] }) {
  const half = Math.ceil(items.length / 2);
  const rowA = items.slice(0, half);
  const rowB = items.slice(half).concat(items.slice(0, half - items.slice(half).length));

  const renderRow = (
    rowItems: ConditionItem[],
    direction: "left" | "right",
    duration: number
  ) => {
    const animate =
      direction === "left" ? { x: ["0%", "-50%"] } : { x: ["-50%", "0%"] };
    return (
      <div className="group relative overflow-hidden">
        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
        />
        <motion.div
          className="flex w-max gap-5 py-2"
          animate={animate}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ transition: { duration: duration * 4 } }}
        >
          {rowItems.map((item, i) => (
            <ConditionCard key={`primary-${item.href}-${i}`} item={item} />
          ))}
          <div aria-hidden="true" className="contents">
            {rowItems.map((item, i) => (
              <ConditionCard
                key={`clone-${item.href}-${i}`}
                item={item}
                asLink={false}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-5">
      {renderRow(rowA, "left", 38)}
      {renderRow(rowB, "right", 44)}
    </div>
  );
}

/* ============================ SERVICE CARD ============================ */

export function ServiceCard({
  href,
  label,
  tag,
  image,
  icon,
  index = 0,
}: {
  href: string;
  label: string;
  tag: string;
  image: string | StaticImageData;
  icon: React.ReactNode;
  index?: number;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-900/15"
    >
      {/* Top accent bar */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-600 via-accent to-brand-600 transition-transform duration-500 group-hover:scale-x-100"
      />

      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          unoptimized
        />
        {/* Tinted overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/25 to-transparent"
        />
        {/* Vignette */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 100%, rgba(67,86,39,0.45) 0%, transparent 60%)",
          }}
        />
        {/* Tag chip */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-800 backdrop-blur-sm ring-1 ring-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {tag}
        </span>
        {/* Hover sweep */}
        <span
          aria-hidden
          className="absolute -inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Floating icon chip overlapping image */}
        <motion.div
          aria-hidden
          className="absolute -top-7 right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-lg shadow-brand-900/20 ring-1 ring-slate-200/70 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700"
          whileHover={{ rotate: -8, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          {icon}
        </motion.div>

        <h3 className="mt-1 font-display text-xl font-semibold text-slate-900 leading-snug pr-16">
          {label}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
          Learn how {label.toLowerCase()} can be part of your personalized
          treatment plan at Ascension Health.
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          <span className="relative">
            Learn more
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-700 transition-transform duration-300 group-hover:scale-x-100"
            />
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.a>
  );
}
