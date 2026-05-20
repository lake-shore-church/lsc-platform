import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import type { Event } from "../types";

function client(cms?: SanityClient) {
  return cms ?? getSanityReadClient();
}

const eventProjection = `{
  _id,
  _type,
  title,
  slug,
  description,
  startsAt,
  endsAt,
  location,
  ministryArea,
  image,
  isRecurring
}`;

/** Upcoming events from a given ISO datetime, soonest first. */
export async function getEvents(
  options?: { upcomingFrom?: string; limit?: number },
  cms?: SanityClient,
): Promise<Event[]> {
  const from = options?.upcomingFrom ?? new Date().toISOString();
  const slice = options?.limit != null ? `[0...${options.limit}]` : "";
  const query = groq`*[_type == "event" && startsAt >= $from] | order(startsAt asc) ${slice} ${eventProjection}`;

  return client(cms).fetch<Event[]>(query, { from });
}

/** Single event by document id. */
export async function getEventById(
  id: string,
  cms?: SanityClient,
): Promise<Event | null> {
  const query = groq`*[_type == "event" && _id == $id][0] ${eventProjection}`;

  return client(cms).fetch<Event | null>(query, { id });
}
