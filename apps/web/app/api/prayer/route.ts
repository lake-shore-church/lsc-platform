import { NextResponse } from "next/server";
import { createSupabaseAdminClient, submitPrayer } from "@repo/db";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const content = String(body.content ?? "").trim();
    const isPrivate = Boolean(body.is_private);
    const name = String(body.name ?? "").trim();
    const replyEmail = String(body.email ?? "").trim().toLowerCase();

    if (!content || content.length < 10) {
      return NextResponse.json(
        { error: "Please share at least a few words for your prayer request." },
        { status: 400 },
      );
    }

    const prayerContent = name ? `${name}: ${content}` : content;

    const supabase = createSupabaseAdminClient();
    await submitPrayer(
      {
        content: prayerContent,
        is_private: isPrivate,
        submitter_id: null,
      },
      supabase,
    );

    const staffEmail = process.env.RESEND_FROM_EMAIL ?? "hello@lschurch.com";
    try {
      await sendEmail({
        to: staffEmail,
        subject: isPrivate ? "New private prayer request" : "New public prayer request",
        html: `<p>A new prayer request was submitted.</p><p>${isPrivate ? "Private — view in staff portal." : "Public request."}</p><p>${prayerContent.replace(/</g, "&lt;")}</p>`,
      });

      if (replyEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail)) {
        await sendEmail({
          to: replyEmail,
          subject: "We received your prayer request — Lake Shore Church",
          html: `<p>Thank you${name ? `, ${name}` : ""}. Your prayer request has been received. Our team is praying for you.</p><p>— Lake Shore Church, West Loop Chicago</p>`,
        });
      }
    } catch (emailErr) {
      console.error("[api/prayer] email failed (prayer saved):", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/prayer]", err);
    const message =
      err instanceof Error && err.message.includes("SUPABASE_SERVICE_ROLE_KEY")
        ? "Server configuration error. Please contact the church office."
        : "Unable to submit prayer request.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
