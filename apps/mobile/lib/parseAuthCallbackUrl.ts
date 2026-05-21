/**
 * Parse Supabase auth params from a deep link or web callback URL.
 * Supabase often returns tokens in the hash (#access_token=...) which Linking.parse misses.
 */
export function parseAuthCallbackUrl(url: string): Record<string, string> {
  const params: Record<string, string> = {};

  const hashIndex = url.indexOf("#");
  const queryIndex = url.indexOf("?");

  const paramString =
    hashIndex >= 0
      ? url.slice(hashIndex + 1)
      : queryIndex >= 0
        ? url.slice(queryIndex + 1)
        : "";

  if (!paramString) return params;

  for (const part of paramString.split("&")) {
    if (!part) continue;
    const eq = part.indexOf("=");
    const key = decodeURIComponent(eq >= 0 ? part.slice(0, eq) : part);
    const value = decodeURIComponent(eq >= 0 ? part.slice(eq + 1) : "");
    if (key) params[key] = value;
  }

  return params;
}
