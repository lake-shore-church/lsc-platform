import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const to = process.env.RESEND_FROM_EMAIL ?? "hello@lschurch.com";

    await sendEmail({
      to,
      subject: `Contact form: ${name}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    await sendEmail({
      to: email,
      subject: "We received your message — Lake Shore Church",
      html: `<p>Hi ${name},</p><p>Thank you for contacting Lake Shore Church. We have received your message and will respond soon.</p><p>— Lake Shore Church, West Loop Chicago</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
