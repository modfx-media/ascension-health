import { resolvePublicSiteOrigin } from "./server-url";

export function normalizePath(input: string): string {
  const bare = input.split("?")[0]?.split("#")[0] ?? "/";
  if (!bare || bare === "/") return "/";
  const withLeading = bare.startsWith("/") ? bare : `/${bare}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export function absoluteSiteUrl(path: string): string {
  const site = resolvePublicSiteOrigin();
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      const host = url.hostname.toLowerCase();
      if (host === "vercel.app" || host.endsWith(".vercel.app")) {
        return `${site}${normalizePath(`${url.pathname}${url.search}`)}`;
      }
    } catch {
      return path;
    }
    return path;
  }
  return `${site}${normalizePath(path)}`;
}
