/** Optional push when staff goes live (requires OneSignal env vars). */

const ONESIGNAL_API = "https://api.onesignal.com/notifications";

function getOneSignalConfig(): { appId: string; apiKey: string } | null {
  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;
  if (!appId || !apiKey) return null;
  return { appId, apiKey };
}

async function sendPush(payload: {
  headings: string;
  contents: string;
  url?: string;
  data?: Record<string, string>;
}): Promise<boolean> {
  const cfg = getOneSignalConfig();
  if (!cfg) return false;

  const res = await fetch(ONESIGNAL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      app_id: cfg.appId,
      included_segments: ["Subscribed Users"],
      headings: { en: payload.headings },
      contents: { en: payload.contents },
      url: payload.url,
      data: payload.data,
    }),
  });

  if (!res.ok) {
    console.error("[onesignal] push failed", await res.text());
    return false;
  }
  return true;
}

export async function sendGoLivePush(liveUrl: string): Promise<boolean> {
  return sendPush({
    headings: "🔴 Lake Shore Church is LIVE",
    contents: "Pastor Brian is preaching now. Tap to join Sunday service.",
    url: liveUrl,
    data: { type: "go_live" },
  });
}

/** Phase 2A scheduled reminders (also configurable in OneSignal dashboard). */
export const CHURCH_PUSH_SCHEDULE = {
  wednesday_prayer: {
    headings: "Wednesday evening prayer",
    contents: "Join us for Wednesday evening prayer tonight.",
  },
  saturday_reminder: {
    headings: "See you Sunday",
    contents: "Join us tomorrow for Sunday worship at 10 AM.",
  },
  sunday_morning: {
    headings: "Sunday service today",
    contents: "Sunday service starts in 2 hours — see you there!",
  },
} as const;

export type ChurchPushKind = keyof typeof CHURCH_PUSH_SCHEDULE;

export async function sendChurchScheduledPush(
  kind: ChurchPushKind,
  siteUrl: string,
): Promise<boolean> {
  const msg = CHURCH_PUSH_SCHEDULE[kind];
  return sendPush({
    headings: msg.headings,
    contents: msg.contents,
    url: siteUrl,
    data: { type: kind },
  });
}
