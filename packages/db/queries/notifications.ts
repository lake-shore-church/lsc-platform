import { getSupabase, type TypedSupabaseClient } from "../client";
import type { NotificationPrefs, TablesInsert } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

export async function getNotificationPrefs(
  userId: string,
  db?: TypedSupabaseClient,
): Promise<NotificationPrefs | null> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("notification_prefs")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function upsertNotificationPrefs(
  userId: string,
  prefs: Omit<
    TablesInsert<"notification_prefs">,
    "user_id" | "id" | "updated_at"
  >,
  db?: TypedSupabaseClient,
): Promise<NotificationPrefs> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("notification_prefs")
    .upsert(
      {
        user_id: userId,
        ...prefs,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
