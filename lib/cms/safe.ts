const CMS_TIMEOUT_MS = 2500;

function cmsConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET);
}

/**
 * Run a CMS read. Any failure, including a down database, returns `fallback`
 * so public pages never 500 because Postgres is unreachable.
 */
export async function withCMS<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!cmsConfigured()) return fallback;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      fn(),
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error("cms timeout")), CMS_TIMEOUT_MS);
      }),
    ]);
  } catch (error) {
    const message = error instanceof Error ? error.message : "cms error";
    console.error(`[cms] falling back: ${message}`);
    return fallback;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function cmsConfiguredForRequest(): boolean {
  return cmsConfigured();
}
