import { getSupabase, type TypedSupabaseClient } from "../client";
import type { SmallGroup } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

/** Active small groups (public read). */
export async function getActiveSmallGroups(
  db?: TypedSupabaseClient,
): Promise<SmallGroup[]> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("small_groups")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
