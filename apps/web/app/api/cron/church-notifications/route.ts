import { NextResponse } from "next/server";
import { sendChurchScheduledPush, type ChurchPushKind } from "@/lib/onesignal";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://lsc-platform-kappa.vercel.app";

/**
 * Vercel Cron invokes with ?kind=wednesday_prayer|saturday_reminder|sunday_morning
 * Schedules (America/Chicago — configure in vercel.json):
 * - Wed 6:30 PM CT — wednesday_prayer
 * - Sat 6:00 PM CT — saturday_reminder
 * - Sun 8:00 AM CT — sunday_morning
 */
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const kind = new URL(request.url).searchParams.get("kind") as ChurchPushKind | null;
  const valid: ChurchPushKind[] = [
    "wednesday_prayer",
    "saturday_reminder",
    "sunday_morning",
  ];

  if (!kind || !valid.includes(kind)) {
    return NextResponse.json(
      { error: "Missing or invalid kind query param", valid },
      { status: 400 },
    );
  }

  const sent = await sendChurchScheduledPush(kind, SITE_URL.replace(/\/$/, ""));
  return NextResponse.json({
    ok: true,
    kind,
    pushSent: sent,
    note: sent ? undefined : "OneSignal env vars not set — configure in Vercel",
  });
}
