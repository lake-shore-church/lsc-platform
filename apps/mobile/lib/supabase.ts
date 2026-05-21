import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@repo/db/types";

export type MobileSupabase = SupabaseClient<Database>;

let client: MobileSupabase | null = null;

function sanitizeKey(raw: string): string {
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

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Copy apps/mobile/.env.example to .env`);
  }
  return sanitizeKey(value);
}

/** Typed Supabase client with AsyncStorage session persistence (mobile). */
export function getMobileSupabase(): MobileSupabase {
  if (!client) {
    client = createClient<Database>(
      requireEnv("EXPO_PUBLIC_SUPABASE_URL"),
      requireEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY"),
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      },
    );
  }
  return client;
}
