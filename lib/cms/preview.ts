/**
 * Build the draft-mode preview URL for a public path.
 * Returns null when PREVIEW_SECRET is unset, the input is null/undefined,
 * or any path segment is empty.
 */
export function previewFromPath(
  segments: string | ReadonlyArray<string | null | undefined> | null | undefined,
): string | null {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;
  if (segments == null) return null;

  let parts: Array<string | null | undefined>;
  if (typeof segments === "string") {
    const trimmed = segments.trim();
    if (trimmed === "") return null;
    const inner = trimmed.replace(/^\/+|\/+$/g, "");
    parts = inner === "" ? [] : inner.split("/");
  } else {
    if (segments.length === 0) return null;
    parts = [...segments];
  }

  if (parts.some((segment) => segment == null || segment === "")) return null;

  const path = parts.length === 0 ? "/" : `/${parts.join("/")}/`;
  const params = new URLSearchParams({
    path,
    previewSecret: secret,
  });
  return `/next/preview?${params.toString()}`;
}
