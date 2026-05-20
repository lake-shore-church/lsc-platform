import { NextResponse } from "next/server";
import { subscribeEmail } from "@repo/db";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    await subscribeEmail({ email, segment: "visitor" });

    await sendEmail({
      to: email,
      subject: "Welcome to Lake Shore Church updates",
      html: `<p>Thank you for subscribing. We are glad to stay connected with you.</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/subscribe]", err);
    return NextResponse.json({ error: "Unable to subscribe." }, { status: 500 });
  }
}
