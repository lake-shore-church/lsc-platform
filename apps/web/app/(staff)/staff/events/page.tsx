import type { Metadata } from "next";
import { getEvents, getRsvpsForEvent } from "@repo/db";
import { StaffEventsAdmin } from "@/components/staff/StaffEventsAdmin";
import { createEventAction } from "./actions";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Events admin",
  robots: { index: false, follow: false },
};

export default async function StaffEventsPage() {
  await requireStaffPortal();
  const supabase = await createSupabaseServerClient();
  const events = await getEvents({ limit: 100 }, supabase);

  const rsvpsByEvent: Record<string, Awaited<ReturnType<typeof getRsvpsForEvent>>> = {};
  for (const e of events) {
    rsvpsByEvent[e.id] = await getRsvpsForEvent(e.id, supabase);
  }

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Events</h1>

      <section className="mt-8 rounded-card border border-default bg-surface p-6">
        <h2 className="font-display text-h3">Create event</h2>
        <form action={createEventAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <input
            name="title"
            required
            placeholder="Title"
            className="min-h-[44px] rounded-md border border-default px-3 sm:col-span-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={2}
            className="rounded-md border border-default px-3 sm:col-span-2"
          />
          <input
            name="starts_at"
            type="datetime-local"
            required
            className="min-h-[44px] rounded-md border border-default px-3"
          />
          <input
            name="ends_at"
            type="datetime-local"
            className="min-h-[44px] rounded-md border border-default px-3"
          />
          <input
            name="location"
            placeholder="Location"
            className="min-h-[44px] rounded-md border border-default px-3"
          />
          <input
            name="ministry_area"
            placeholder="Ministry area"
            className="min-h-[44px] rounded-md border border-default px-3"
          />
          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            className="min-h-[44px] rounded-md border border-default px-3"
          />
          <label className="flex items-center gap-2 text-sm">
            <input name="is_recurring" type="checkbox" />
            Recurring
          </label>
          <button
            type="submit"
            className="min-h-[44px] rounded-md bg-brand-primary px-6 font-semibold text-white sm:col-span-2"
          >
            Create event
          </button>
        </form>
      </section>

      <StaffEventsAdmin events={events} rsvpsByEvent={rsvpsByEvent} />
    </>
  );
}
