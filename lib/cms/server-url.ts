const APEX = "https://ascensionhealthnv.com";
const WWW = "https://www.ascensionhealthnv.com";

function stripTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

function isLocalHost(value: string): boolean {
  return /:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(value);
}

/**
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
