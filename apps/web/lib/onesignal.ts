/** Optional push when staff goes live (requires OneSignal env vars). */
export async function sendGoLivePush(liveUrl: string): Promise<boolean> {
  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;
  if (!appId || !apiKey) return false;

  const res = await fetch("https://api.onesignal.com/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${apiKey}`,
    },
    body: JSON.stringify({
      app_id: appId,
      included_segments: ["Subscribed Users"],
      headings: { en: "🔴 Lake Shore Church is LIVE" },
      contents: {
        en: "Pastor Brian is preaching now. Tap to join Sunday service.",
      },
      url: liveUrl,
      data: { type: "go_live" },
    }),
  });

  if (!res.ok) {
    console.error("[onesignal] push failed", await res.text());
    return false;
  }
  return true;
}
