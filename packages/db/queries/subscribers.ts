import { getSupabase, type TypedSupabaseClient } from "../client";
import type { EmailSubscriber, TablesInsert } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

export type SubscribeInput = Pick<TablesInsert<"email_subscribers">, "email" | "segment">;

/** Subscribe or re-subscribe an email address. */
export async function subscribeEmail(
  input: SubscribeInput,
  db?: TypedSupabaseClient,
): Promise<EmailSubscriber> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("email_subscribers")
    .insert({
      email: input.email,
      segment: input.segment ?? "visitor",
      confirmed: true,
    })
    .select()
    .single();

  if (error?.code === "23505") {
    const { data: existing } = await supabase
      .from("email_subscribers")
      .select()
      .eq("email", input.email)
      .single();
    if (existing) return existing;
  }

  if (error) throw error;
  return data;
}
