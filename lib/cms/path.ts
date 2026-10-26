export function normalizePath(input: string): string {
  const bare = input.split("?")[0]?.split("#")[0] ?? "/";
  if (!bare || bare === "/") return "/";
  const withLeading = bare.startsWith("/") ? bare : `/${bare}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export function absoluteSiteUrl(path: string): string {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://ascensionhealthnv.com").replace(
    /\/$/,
    "",
  );
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${site}${normalizePath(path)}`;
}
