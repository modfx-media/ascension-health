/** Pooled Neon URL. Vercel also injects POSTGRES_URL for the same database. */
export function databaseUrl(): string {
  return process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim() || "";
}

export function missingPayloadEnv(): string[] {
  const missing: string[] = [];
  if (!process.env.PAYLOAD_SECRET?.trim()) missing.push("PAYLOAD_SECRET");
  if (!databaseUrl()) missing.push("DATABASE_URL");
  return missing;
}
