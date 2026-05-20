import { NextResponse } from "next/server";
import { getEventById, getRsvpsForEvent } from "@repo/db";
import { sendEmail } from "@/lib/email";
import { getAuthSession, isStaffRole } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session || !isStaffRole(session.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { event_id?: string };
  if (!body.event_id) {
    return NextResponse.json({ error: "event_id required" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const [event, rsvps] = await Promise.all([
    getEventById(body.event_id, supabase),
    getRsvpsForEvent(body.event_id, supabase),
  ]);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const when = new Date(event.starts_at).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  let sent = 0;
  for (const rsvp of rsvps) {
    const ok = await sendEmail({
      to: rsvp.email,
      subject: `Reminder: ${event.title}`,
      html: `<p>This is a reminder for <strong>${event.title}</strong>.</p>
        <p><strong>When:</strong> ${when}</p>
        <p><strong>Where:</strong> ${event.location ?? "See church website"}</p>
        <p>We look forward to seeing you!</p>`,
    });
    if (ok) sent += 1;
  }

  return NextResponse.json({ sent, total: rsvps.length });
}
