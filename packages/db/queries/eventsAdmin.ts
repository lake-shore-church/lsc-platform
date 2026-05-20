import { getSupabase, type TypedSupabaseClient } from "../client";
import type { Event, Rsvp, TablesInsert, TablesUpdate } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

export async function createEvent(
  input: TablesInsert<"events">,
  db?: TypedSupabaseClient,
): Promise<Event> {
  const supabase = client(db);
  const { data, error } = await supabase.from("events").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateEvent(
  id: string,
  updates: TablesUpdate<"events">,
  db?: TypedSupabaseClient,
): Promise<Event> {
  const supabase = client(db);
  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(
  id: string,
  db?: TypedSupabaseClient,
): Promise<void> {
  const supabase = client(db);
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

export async function getRsvpsForEvent(
  eventId: string,
  db?: TypedSupabaseClient,
): Promise<Rsvp[]> {
  const supabase = client(db);
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
