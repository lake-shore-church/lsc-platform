import { getSupabase, type TypedSupabaseClient } from "../client";
import type {
  GivingFund,
  GivingRecord,
  GivingTotals,
  TablesInsert,
} from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

export type GetGivingHistoryOptions = {
  memberId: string;
  year?: number;
  fund?: GivingFund;
  limit?: number;
};

/** Giving history for a member (RLS: own records or admin). */
export async function getGivingHistory(
  options: GetGivingHistoryOptions,
  db?: TypedSupabaseClient,
): Promise<GivingRecord[]> {
  const supabase = client(db);

  let query = supabase
    .from("giving_records")
    .select("*")
    .eq("member_id", options.memberId)
    .order("date", { ascending: false });

  if (options.year) {
    const start = `${options.year}-01-01`;
    const end = `${options.year}-12-31`;
    query = query.gte("date", start).lte("date", end);
  }

  if (options.fund) {
    query = query.eq("fund", options.fund);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data ?? [];
}

/** Aggregate giving totals for a member and optional year. */
export async function getGivingTotals(
  options: { memberId: string; year?: number },
  db?: TypedSupabaseClient,
): Promise<GivingTotals> {
  const records = await getGivingHistory(
    { memberId: options.memberId, year: options.year },
    db,
  );

  const byFund: Record<GivingFund, number> = {
    general: 0,
    building: 0,
    missions: 0,
    other: 0,
  };

  let total = 0;

  for (const record of records) {
    const amount = Number(record.amount);
    total += amount;
    byFund[record.fund] += amount;
  }

  return {
    total,
    byFund,
    count: records.length,
  };
}

export type SyncZeffyRecordInput = TablesInsert<"giving_records"> & {
  zeffy_id: string;
};

/**
 * Upsert a giving record from Zeffy nightly sync (admin RLS).
 * Uses zeffy_id as the conflict key.
 */
export async function syncZeffyRecord(
  input: SyncZeffyRecordInput,
  db?: TypedSupabaseClient,
): Promise<GivingRecord> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("giving_records")
    .upsert(
      {
        member_id: input.member_id ?? null,
        amount: input.amount,
        fund: input.fund ?? "general",
        frequency: input.frequency ?? "one_time",
        zeffy_id: input.zeffy_id,
        date: input.date ?? new Date().toISOString().slice(0, 10),
      },
      { onConflict: "zeffy_id" },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
