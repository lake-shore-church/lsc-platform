import { NextResponse } from "next/server";
import { getSiteConfig, goLiveInSanity, goLiveInhouseInSanity, resolveLiveStreamMode } from "@repo/cms";
import { requireStaffApi } from "@/lib/auth/staff-api";
import { sendGoLivePush } from "@/lib/onesignal";

export async function POST(request: Request) {
  const auth = await requireStaffApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const videoInput = String(body.videoId ?? body.url ?? "").trim();
    const config = await getSiteConfig();
    const inhouse =
      resolveLiveStreamMode(config) === "inhouse" && Boolean(config.livePlaybackUrl?.trim());

    if (!videoInput && !inhouse) {
      return NextResponse.json(
        {
          error:
            "Provide a YouTube video ID, or set Live playback URL (HLS) in Site Config for in-house mode.",
        },
        { status: 400 },
      );
    }

    if (inhouse && !videoInput) {
      await goLiveInhouseInSanity();
    } else {
      await goLiveInSanity(videoInput);
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://lsc-platform-kappa.vercel.app";
    const pushSent = await sendGoLivePush(`${siteUrl}/live`);

    return NextResponse.json({ ok: true, mode: inhouse ? "inhouse" : "youtube", pushSent });
  } catch (err) {
    console.error("[api/go-live]", err);
    return NextResponse.json({ error: "Failed to go live." }, { status: 500 });
  }
}
