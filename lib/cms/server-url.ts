const APEX = "https://ascensionhealthnv.com";
const WWW = "https://www.ascensionhealthnv.com";

function stripTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

function isLocalHost(value: string): boolean {
  return /:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(value);
}

function isVercelAppHost(hostname: string): boolean {
  return hostname === "vercel.app" || hostname.endsWith(".vercel.app");
}

/**
 * Public SEO origin. SITE_ORIGIN, then NEXT_PUBLIC_SITE_URL.
 * Localhost and *.vercel.app are ignored so canonicals stay on the live domain.
 */
export function resolvePublicSiteOrigin(): string {
  const candidates = [process.env.SITE_ORIGIN, process.env.NEXT_PUBLIC_SITE_URL];
  for (const candidate of candidates) {
    if (!candidate?.trim()) continue;
    const withProtocol = /^https?:\/\//i.test(candidate.trim())
      ? candidate.trim()
      : `https://${candidate.trim()}`;
    try {
      const url = new URL(withProtocol);
      const host = url.hostname.toLowerCase();
      if (host === "localhost" || host === "127.0.0.1" || host === "::1") continue;
      if (isVercelAppHost(host)) continue;
      if (url.protocol !== "https:" && url.protocol !== "http:") continue;
      return stripTrailingSlash(`${url.protocol}//${url.host}`);
    } catch {
      continue;
    }
  }
  return APEX;
}

/**
 * Payload admin/API server URL.
 * NEXT_PUBLIC_SERVER_URL, then NEXT_PUBLIC_SITE_URL.
 * On Vercel, never fall back to localhost.
 */
export function resolveServerURL(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    const normalized = stripTrailingSlash(explicit);
    if (!(process.env.VERCEL && isLocalHost(normalized))) return normalized;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL) return APEX;
  return "http://localhost:3000";
}

export function corsOrigins(): string[] {
  const origins = new Set<string>([
    APEX,
    WWW,
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
  ]);
  const add = (value?: string) => {
    if (!value) return;
    origins.add(stripTrailingSlash(value));
  };
  add(process.env.NEXT_PUBLIC_SERVER_URL);
  add(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_URL) add(`https://${process.env.VERCEL_URL}`);
  return [...origins];
}

export function isLocalDatabase(url: string | undefined): boolean {
  if (!url) return !process.env.VERCEL;
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
  } catch {
    return false;
  }
}
