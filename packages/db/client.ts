import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type TypedSupabaseClient = SupabaseClient<Database>;

function getSupabaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.EXPO_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error(
      "Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (web) or EXPO_PUBLIC_SUPABASE_URL (mobile).",
    );
  }

  return url;
}

function getSupabaseAnonKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error(
      "Missing Supabase anon key. Set NEXT_PUBLIC_SUPABASE_ANON_KEY (web) or EXPO_PUBLIC_SUPABASE_ANON_KEY (mobile).",
    );
  }

  return key;
}

/** Create a new typed Supabase client (useful for tests or per-request instances). */
export function createSupabaseClient(): TypedSupabaseClient {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: true,
      detectSessionInUrl: typeof window !== "undefined",
    },
  });
}

let supabaseInstance: TypedSupabaseClient | null = null;

/** Singleton typed Supabase client for app usage. */
export function getSupabase(): TypedSupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
  }
  return supabaseInstance;
}

/** Lazy singleton for imports before env is loaded (e.g. `pnpm promote:member`). */
export const supabase: TypedSupabaseClient = new Proxy({} as TypedSupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});

/** Service-role client for trusted server routes only. */
export function createSupabaseAdminClient(): TypedSupabaseClient {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for admin client.");
  }
  return createClient<Database>(url, key) as unknown as TypedSupabaseClient;
}
