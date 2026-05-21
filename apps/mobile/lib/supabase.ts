import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@repo/db/types";

export type MobileSupabase = SupabaseClient<Database>;

let client: MobileSupabase | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Copy apps/mobile/.env.example to .env`);
  }
  return value;
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
