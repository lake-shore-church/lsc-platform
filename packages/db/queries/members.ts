import { getSupabase, type TypedSupabaseClient } from "../client";
import type { MemberWithProfile, Profile, TablesUpdate } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

const PROFILE_SELECT = "id, full_name, email, role, avatar_url, phone, address, created_at, updated_at";

const MEMBER_SELECT = `
  *,
  profile:profiles!members_id_fkey (${PROFILE_SELECT}),
  small_group:small_groups (*)
`;

/** Auth user's profile. */
export async function getProfile(
  userId: string,
  db?: TypedSupabaseClient,
): Promise<Profile | null> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_SELECT)
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/** Update the authenticated user's profile. */
export async function updateProfile(
  userId: string,
  updates: TablesUpdate<"profiles">,
  db?: TypedSupabaseClient,
): Promise<Profile> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select(PROFILE_SELECT)
    .single();

  if (error) throw error;
  return data;
}

/** Member record with profile and small group (RLS applies). */
export async function getMemberRecord(
  userId: string,
  db?: TypedSupabaseClient,
): Promise<MemberWithProfile | null> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("members")
    .select(MEMBER_SELECT)
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data as MemberWithProfile | null;
}
