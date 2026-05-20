import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@repo/db";
import { getSupabasePublicEnv } from "./env";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  const { url, anonKey } = getSupabasePublicEnv();
  browserClient = createBrowserClient<Database>(url, anonKey);
  return browserClient;
}
