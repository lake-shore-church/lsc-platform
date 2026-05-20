import { getSupabase, type TypedSupabaseClient } from "../client";
import type {
  PrayerRequest,
  PrayerStatus,
  TablesInsert,
  TablesUpdate,
} from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

export type SubmitPrayerInput = Pick<
  TablesInsert<"prayer_requests">,
  "content" | "is_private" | "submitter_id"
>;

/** Submit a public or private prayer request. */
export async function submitPrayer(
  input: SubmitPrayerInput,
  db?: TypedSupabaseClient,
): Promise<PrayerRequest> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("prayer_requests")
    .insert({
      content: input.content,
      is_private: input.is_private ?? false,
      submitter_id: input.submitter_id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export type GetPrayersOptions = {
  status?: PrayerStatus;
  includePrivate?: boolean;
  submitterId?: string;
  limit?: number;
};

/** List prayer requests (RLS filters by role). */
export async function getPrayers(
  options?: GetPrayersOptions,
  db?: TypedSupabaseClient,
): Promise<PrayerRequest[]> {
  const supabase = client(db);

  let query = supabase
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.includePrivate === false) {
    query = query.eq("is_private", false);
  }

  if (options?.submitterId) {
    query = query.eq("submitter_id", options.submitterId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data ?? [];
}

export type UpdatePrayerInput = {
  id: string;
  updates: TablesUpdate<"prayer_requests">;
};

/** Update prayer status or assignment (staff, per RLS). */
export async function updatePrayer(
  input: UpdatePrayerInput,
  db?: TypedSupabaseClient,
): Promise<PrayerRequest> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("prayer_requests")
    .update(input.updates)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
