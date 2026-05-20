import { getSupabase, type TypedSupabaseClient } from "../client";
import type { MemberWithProfile, Profile } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

const PROFILE_LIST =
  "id, full_name, email, role, avatar_url, phone, address, created_at, updated_at";

const MEMBER_SELECT = `
  *,
  profile:profiles!members_id_fkey (${PROFILE_LIST}),
  small_group:small_groups (*)
`;

/** All member records (staff/admin RLS). */
export async function getAllMembers(
  db?: TypedSupabaseClient,
): Promise<MemberWithProfile[]> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("members")
    .select(MEMBER_SELECT)
    .order("joined_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as MemberWithProfile[];
}

/** Profiles with member or staff roles (staff/admin RLS). */
export async function getDirectoryProfiles(
  db?: TypedSupabaseClient,
): Promise<Profile[]> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_LIST)
    .in("role", ["member", "staff", "admin"])
    .order("full_name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
