import { Resend } from "resend";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.startsWith("your_")) return null;
  return new Resend(key);
}

const from = process.env.RESEND_FROM_EMAIL ?? "hello@lschurch.com";

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not configured — skipping send");
    return false;
  }

  await resend.emails.send({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  return true;
}
