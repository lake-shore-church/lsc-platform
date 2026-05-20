import { NextResponse } from "next/server";
import { createRsvp } from "@repo/db";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventId = String(body.event_id ?? "");
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: "Event, name, and email are required." },
        { status: 400 },
      );
    }

    await createRsvp({ event_id: eventId, name, email, user_id: null });

    await sendEmail({
      to: email,
      subject: "RSVP confirmed — Lake Shore Church",
      html: `<p>Hi ${name},</p><p>Your RSVP has been received. We look forward to seeing you!</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/rsvp]", err);
    return NextResponse.json({ error: "Unable to complete RSVP." }, { status: 500 });
  }
}
