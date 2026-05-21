/** One JWT only — fixes accidental triple-paste in env or cookies. */
export function sanitizeSupabaseKey(raw: string): string {
  let key = raw.trim();
  if (key.toLowerCase().startsWith("bearer ")) {
    key = key.slice(7).trim();
  }
  const parts = key.split(/\s+/).filter(Boolean);
  if (parts.length > 1 && parts[0]?.startsWith("eyJ")) {
    return parts[0];
  }
  return key;
}

/** Validated Supabase public env (browser + server). */
export function getSupabasePublicEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = sanitizeSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");

  if (!url || !url.startsWith("https://")) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing or invalid. Set it in apps/web/.env.local and restart the dev server.",
    );
  }

  if (!anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Set it in apps/web/.env.local and restart the dev server.",
    );
  }

  if (anonKey.includes(" ")) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY looks invalid (multiple values). Paste only the anon key once.",
    );
  }

  return { url, anonKey };
}
