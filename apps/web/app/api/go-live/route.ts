import { NextResponse } from "next/server";
import { goLiveInSanity } from "@repo/cms";
import { requireStaffApi } from "@/lib/auth/staff-api";
import { sendGoLivePush } from "@/lib/onesignal";

export async function POST(request: Request) {
  const auth = await requireStaffApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const videoInput = String(body.videoId ?? body.url ?? "").trim();
    if (!videoInput) {
      return NextResponse.json(
        { error: "Provide a YouTube video ID or URL." },
        { status: 400 },
      );
    }

    const videoId = await goLiveInSanity(videoInput);
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://lsc-platform-kappa.vercel.app";
    const pushSent = await sendGoLivePush(`${siteUrl}/live`);

    return NextResponse.json({ ok: true, videoId, pushSent });
  } catch (err) {
    console.error("[api/go-live]", err);
    return NextResponse.json({ error: "Failed to go live." }, { status: 500 });
  }
}
