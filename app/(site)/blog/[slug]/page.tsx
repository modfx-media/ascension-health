import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Info,
  Lightbulb,
  Mail,
  Phone,
  Share2,
  Tag,
  User,
} from "lucide-react";
import { AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import {
  BLOG_BASE,
  formatPostDate,
  type BlogBlock,
  type BlogPost,
} from "@/lib/blog";
import {
  getPublishedSitePost,
  getPublishedSitePosts,
  getRelatedFromList,
} from "@/lib/ranked/map-post";
import { BLOG_PUBLIC } from "@/lib/blog-visibility";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";
import { SITE } from "@/lib/navigation";

export const revalidate = 3600;
export const dynamicParams = true;

const SITE_URL = resolvePublicSiteOrigin();

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  if (!BLOG_PUBLIC) return [];
  const posts = await getPublishedSitePosts().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!BLOG_PUBLIC) return { title: "Article not found", robots: { index: false, follow: false } };
  const post = await getPublishedSitePost(slug);
  if (!post) return { title: "Article not found" };

  const canonical = `${BLOG_BASE}/${post.slug}/`;
  const cover =
    typeof post.cover.src === "string" ? post.cover.src : post.cover.src.src;
  const coverUrl = cover.startsWith("http") ? cover : `${SITE_URL}${cover}`;

  return withCmsMetadata(canonical, {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}${canonical}`,
      type: "article",
      siteName: "Ascension Health",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: coverUrl, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [coverUrl],
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  if (!BLOG_PUBLIC) notFound();
  const posts = await getPublishedSitePosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedFromList(post, posts, 3);
  const canonical = `${SITE_URL}${BLOG_BASE}/${post.slug}/`;
  const coverPath =
    typeof post.cover.src === "string" ? post.cover.src : post.cover.src.src;
  const coverUrl = coverPath.startsWith("http")
    ? coverPath
    : `${SITE_URL}${coverPath}`;
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(canonical);

  return (
    <main className="bg-slate-50">
      <ArticleHero post={post} />

      <article className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              {post.lede && (
                <p className="mb-8 border-l-4 border-accent pl-5 font-display text-xl leading-relaxed text-slate-800 sm:text-2xl">
                  {post.lede}
                </p>
              )}

              <PostBody blocks={post.content} />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                  <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Filed under
                  </span>
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
                    >
                      <Tag className="h-3 w-3" aria-hidden /> {t}
                    </span>
                  ))}
                </div>
              )}

              <ShareBar shareText={shareText} shareUrl={shareUrl} />

              <AuthorCard post={post} />
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <AppointmentSidebar />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && <RelatedPosts posts={related} />}

      <BottomCTA
        kicker="Talk to our team"
        heading="Have a question about your care?"
        body="We’re happy to answer questions and help you plan a first visit."
      />

      {/* Article schema */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            author: {
              "@type": "Organization",
              name: post.author.name,
              url: SITE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: "Ascension Health",
              url: SITE_URL,
            },
            mainEntityOfPage: canonical,
            image: coverUrl,
            articleSection: post.category,
            keywords: post.tags?.join(", "),
          }),
        }}
      />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-brand-100/80">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5 text-brand-200/60" />
            </li>
            <li>
              <Link
                href={`${BLOG_BASE}/`}
                className="hover:text-white transition-colors"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5 text-brand-200/60" />
            </li>
            <li className="text-white font-medium line-clamp-1">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent ring-1 ring-accent/40">
              {post.category}
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-brand-100/85">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-widest text-brand-100/80">
              <span className="inline-flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-accent" aria-hidden />
                {post.author.name}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-accent" aria-hidden />
                {formatPostDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-accent" aria-hidden />
                {post.readingMinutes} min read
              </span>
            </div>
            <div className="mt-4 h-1 w-20 rounded-full bg-accent" />
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Body                                                                */
/* ------------------------------------------------------------------ */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function LinkedText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={i}>{part}</span>;
        const [, label, href] = match;
        const internal = href.startsWith("/");
        if (internal) {
          return (
            <Link
              key={i}
              href={href}
              className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-brand-800"
            >
              {label}
            </Link>
          );
        }
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-brand-800"
          >
            {label}
          </a>
        );
      })}
    </>
  );
}

function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6 text-[16.5px] leading-[1.75] text-slate-700">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <LinkedText text={block.text} />
        </p>
      );
    case "heading": {
      const id = block.id ?? slugify(block.text);
      const cls =
        block.level === 3
          ? "font-display text-xl sm:text-2xl font-semibold text-slate-900 scroll-mt-28 mt-8"
          : "font-display text-2xl sm:text-3xl font-semibold text-slate-900 scroll-mt-28 mt-10";
      return block.level === 3 ? (
        <h3 id={id} className={cls}>
          {block.text}
        </h3>
      ) : (
        <h2 id={id} className={cls}>
          {block.text}
        </h2>
      );
    }
    case "list": {
      const cls =
        "ml-5 space-y-2 " +
        (block.style === "number" ? "list-decimal" : "list-disc") +
        " marker:text-brand-500";
      return (
        <ul className={cls}>
          {block.items.map((item, idx) => (
            <li key={idx} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    case "quote":
      return (
        <figure className="my-4 rounded-2xl border border-brand-100 bg-brand-50/50 p-6 sm:p-8">
          <blockquote className="font-display text-lg sm:text-xl italic leading-relaxed text-brand-900">
            “{block.text}”
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              {block.attribution}
            </figcaption>
          )}
        </figure>
      );
    case "callout": {
      const variant = block.variant ?? "info";
      const map = {
        info: {
          ring: "ring-brand-200",
          bg: "bg-brand-50",
          icon: <Info className="h-5 w-5 text-brand-700" aria-hidden />,
        },
        tip: {
          ring: "ring-accent/50",
          bg: "bg-accent/10",
          icon: (
            <Lightbulb className="h-5 w-5 text-accent-strong" aria-hidden />
          ),
        },
        warning: {
          ring: "ring-amber-300",
          bg: "bg-amber-50",
          icon: <Info className="h-5 w-5 text-amber-700" aria-hidden />,
        },
      } as const;
      const v = map[variant];
      return (
        <aside
          className={`flex gap-4 rounded-2xl p-5 sm:p-6 ring-1 ${v.ring} ${v.bg}`}
        >
          <span className="mt-0.5 shrink-0">{v.icon}</span>
          <div>
            {block.title && (
              <p className="mb-1 font-semibold text-slate-900">{block.title}</p>
            )}
            <p className="text-[15.5px] leading-relaxed text-slate-700">
              {block.body}
            </p>
          </div>
        </aside>
      );
    }
    case "image":
      return (
        <figure className="my-4 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative aspect-[16/9]">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="bg-white px-5 py-3 text-center text-xs text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "divider":
      return (
        <hr className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
      );
    case "cta":
      return (
        <div className="my-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            {block.heading && (
              <p className="font-display text-xl font-semibold text-slate-900">
                {block.heading}
              </p>
            )}
            {block.body && (
              <p className="mt-1 text-sm text-slate-600">{block.body}</p>
            )}
          </div>
          <Link
            href={block.buttonHref ?? SITE.appointmentsHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            {block.buttonLabel ?? "Request Appointment"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Share bar                                                           */
/* ------------------------------------------------------------------ */

function ShareBar({
  shareText,
  shareUrl,
}: {
  shareText: string;
  shareUrl: string;
}) {
  const items = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      Icon: FacebookIcon,
    },
    {
      label: "Share on Twitter / X",
      href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      Icon: XIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      Icon: LinkedInIcon,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${shareText}&body=${shareUrl}`,
      Icon: Mail,
    },
  ];
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <span className="inline-flex items-center gap-2 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        <Share2 className="h-4 w-4" aria-hidden /> Share
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {items.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Author                                                              */
/* ------------------------------------------------------------------ */

function AuthorCard({ post }: { post: BlogPost }) {
  return (
    <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-800 ring-1 ring-brand-200">
        {post.author.avatar ? (
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl object-cover"
          />
        ) : (
          <User className="h-7 w-7" aria-hidden />
        )}
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
          Written by
        </p>
        <p className="mt-1 font-display text-xl font-semibold text-slate-900">
          {post.author.name}
        </p>
        {post.author.role && (
          <p className="text-sm text-slate-500">{post.author.role}</p>
        )}
        {post.author.bio && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {post.author.bio}
          </p>
        )}
      </div>
      <a
        href={SITE.phoneHref}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
      >
        <Phone className="h-4 w-4" aria-hidden /> Call {SITE.phone}
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Related                                                             */
/* ------------------------------------------------------------------ */

function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Keep reading
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-slate-900">
              Related articles
            </h2>
          </div>
          <Link
            href={`${BLOG_BASE}/`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All articles
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${BLOG_BASE}/${post.slug}/`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-700">
                  {post.category}
                </span>
                <h3 className="font-display text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-800 transition-colors">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-700">
                  Read more
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Inline social icons (lucide-react no longer ships brand marks)      */
/* ------------------------------------------------------------------ */

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M13.5 21v-7.5h2.55l.38-2.96H13.5V8.63c0-.86.24-1.44 1.47-1.44h1.57V4.55c-.27-.04-1.2-.12-2.29-.12-2.27 0-3.82 1.39-3.82 3.94v2.17H7.87v2.96h2.56V21h3.07Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 3H21l-6.53 7.46L22 21h-6.828l-4.79-6.26L4.8 21H2l7.02-8.01L2 3h6.914l4.33 5.72L18.244 3Zm-1.196 16.2h1.53L7.03 4.7H5.39l11.658 14.5Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.75h4v11.25H3V9.75Zm7.25 0h3.84v1.54h.05c.53-1 1.83-2.05 3.77-2.05C21.1 9.24 22 11 22 13.86V21h-4v-6.27c0-1.5-.03-3.42-2.09-3.42-2.1 0-2.42 1.63-2.42 3.31V21h-4V9.75Z" />
    </svg>
  );
}
