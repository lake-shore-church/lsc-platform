import { getSupabase, type TypedSupabaseClient } from "../client";
import type { Event, Rsvp, TablesInsert } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

export type GetEventsOptions = {
  /** Only events starting on or after this ISO timestamp */
  upcomingFrom?: string;
  ministryArea?: string;
  limit?: number;
};

/** List events, soonest first. */
export async function getEvents(
  options?: GetEventsOptions,
  db?: TypedSupabaseClient,
): Promise<Event[]> {
  const supabase = client(db);

  let query = supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: true });

  if (options?.upcomingFrom) {
    query = query.gte("starts_at", options.upcomingFrom);
  }

  if (options?.ministryArea) {
    query = query.eq("ministry_area", options.ministryArea);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data ?? [];
}

/** Single event by id. */
export async function getEventById(
  id: string,
  db?: TypedSupabaseClient,
): Promise<Event | null> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export type CreateRsvpInput = Pick<
  TablesInsert<"rsvps">,
  "event_id" | "name" | "email" | "user_id"
>;

/** RSVP to an event. */
export async function createRsvp(
  input: CreateRsvpInput,
  db?: TypedSupabaseClient,
): Promise<Rsvp> {
  const supabase = client(db);

  const { data, error } = await supabase
    .from("rsvps")
    .insert({
      event_id: input.event_id,
      name: input.name,
      email: input.email,
      user_id: input.user_id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
