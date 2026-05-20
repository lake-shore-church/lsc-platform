import { createClient } from "@supabase/supabase-js";
import type { TypedSupabaseClient } from "../client";
import type { Database, GivingRecord } from "../types";

/** All giving records for a year (service role — call only after staff auth). */
export async function getAllGivingForYear(
  year: number,
  adminDb: TypedSupabaseClient,
): Promise<GivingRecord[]> {
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;

  const { data, error } = await adminDb
    .from("giving_records")
    .select("*")
    .gte("date", start)
    .lte("date", end)
    .order("date", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export function createGivingAdminClient(): TypedSupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase admin credentials");
  }
  return createClient<Database>(url, key) as unknown as TypedSupabaseClient;
}
