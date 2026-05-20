import { NextResponse } from "next/server";
import { submitPrayer } from "@repo/db";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const content = String(body.content ?? "").trim();
    const isPrivate = Boolean(body.is_private);
    const name = String(body.name ?? "").trim();

    if (!content || content.length < 10) {
      return NextResponse.json(
        { error: "Please share at least a few words for your prayer request." },
        { status: 400 },
      );
    }

    const prayerContent = name ? `${name}: ${content}` : content;

    await submitPrayer({
      content: prayerContent,
      is_private: isPrivate,
      submitter_id: null,
    });

    const staffEmail = process.env.RESEND_FROM_EMAIL ?? "hello@lschurch.com";
    await sendEmail({
      to: staffEmail,
      subject: isPrivate ? "New private prayer request" : "New public prayer request",
      html: `<p>A new prayer request was submitted.</p><p>${isPrivate ? "Private — view in staff portal." : "Public request."}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/prayer]", err);
    return NextResponse.json({ error: "Unable to submit prayer request." }, { status: 500 });
  }
}
