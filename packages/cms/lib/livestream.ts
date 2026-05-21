import type { SiteConfig } from "../types";

export type LiveStatusResponse = {
  isLive: boolean;
  videoId: string | null;
  embedUrl: string | null;
  chatEmbedUrl: string | null;
  nextServiceAt: string;
  youtubeUrl: string;
  facebookUrl: string;
  churchName: string;
  serviceLabel: string;
  locationLabel: string;
};

const FACEBOOK_URL = "https://www.facebook.com/lschurchchicago";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@lakeshorechurch";
const CHICAGO_TZ = "America/Chicago";
const SERVICE_HOUR = 10;
const SERVICE_MINUTE = 0;

/** Extract 11-char YouTube video ID from URL or raw id. */
export function parseYouTubeVideoId(input?: string | null): string | null {
  if (!input?.trim()) return null;
  const t = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(t)) return t;
  const match = t.match(
    /(?:v=|\/embed\/|\/live\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

export function youtubeEmbedUrl(
  videoId: string | null,
  channelId?: string | null,
): string {
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  if (channelId) {
    return `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&rel=0`;
  }
  return "https://www.youtube.com/embed/live_stream?channel=UC&autoplay=1&rel=0";
}

export function youtubeChatEmbedUrl(
  videoId: string,
  embedDomain: string,
): string {
  const domain = embedDomain.replace(/^https?:\/\//, "").split("/")[0] ?? embedDomain;
  return `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${domain}`;
}

/** Next Sunday 10:00 AM America/Chicago as ISO string (UTC instant). */
export function getNextSundayServiceAt(from = new Date()): Date {
  const nowMs = from.getTime();
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const probe = new Date(nowMs + dayOffset * 86_400_000);
    const parts = chicagoParts(probe);
    if (parts.weekday !== "Sun") continue;
    const serviceMs = chicagoLocalToUtc(
      parts.year,
      parts.month,
      parts.day,
      SERVICE_HOUR,
      SERVICE_MINUTE,
    );
    if (serviceMs > nowMs) return new Date(serviceMs);
  }
  const fallback = new Date(nowMs + 7 * 86_400_000);
  return fallback;
}

function chicagoParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const map = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return {
    weekday: map.weekday ?? "",
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
  };
}

/** Convert a Chicago local wall-clock time to UTC ms. */
function chicagoLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): number {
  const pad = (n: number) => String(n).padStart(2, "0");
  const local = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;
  for (const offset of ["-06:00", "-05:00"]) {
    const ts = Date.parse(`${local}${offset}`);
    const hm = new Intl.DateTimeFormat("en-US", {
      timeZone: CHICAGO_TZ,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(new Date(ts));
    const [h, m] = hm.split(":").map(Number);
    const back = chicagoParts(new Date(ts));
    if (
      back.year === year &&
      back.month === month &&
      back.day === day &&
      h === hour &&
      m === minute
    ) {
      return ts;
    }
  }
  return Date.parse(`${local}-06:00`);
}

export function buildLiveStatus(
  config: SiteConfig,
  options?: { embedDomain?: string },
): LiveStatusResponse {
  const isLive = Boolean(config.isLiveNow);
  const videoId =
    parseYouTubeVideoId(config.liveVideoId) ??
    parseYouTubeVideoId(config.liveStreamUrl);
  const channelId =
    config.youtubeChannelId ??
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ??
    null;

  const nextServiceAt =
    config.nextServiceDate ??
    getNextSundayServiceAt().toISOString();

  const embedUrl = isLive
    ? youtubeEmbedUrl(videoId, channelId)
    : null;

  const embedDomain = options?.embedDomain ?? "localhost";
  const chatEmbedUrl =
    isLive && videoId ? youtubeChatEmbedUrl(videoId, embedDomain) : null;

  const youtubeUrl = config.liveStreamUrl?.trim() || YOUTUBE_CHANNEL_URL;

  const locationLabel = [config.addressLine1, config.cityStateZip]
    .filter(Boolean)
    .join(" · ");

  return {
    isLive,
    videoId: videoId ?? null,
    embedUrl,
    chatEmbedUrl,
    nextServiceAt,
    youtubeUrl,
    facebookUrl: FACEBOOK_URL,
    churchName: config.churchName,
    serviceLabel: `${config.serviceDay ?? "Sunday"} Service · ${config.serviceTime ?? "10:00 AM"} CT`,
    locationLabel: locationLabel || "West Loop Chicago",
  };
}
