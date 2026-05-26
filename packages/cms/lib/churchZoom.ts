import type { SiteConfig } from "../types";

/**
 * Lake Shore Church — one Zoom room for Sunday, Wednesday, and special meetings.
 * For one-click join (no passcode prompt), paste the full invite link from Zoom
 * with embedded passcode (`?pwd=…`) into Sanity or CHURCH_ZOOM_JOIN_URL.
 */
export const CHURCH_ZOOM_DEFAULTS = {
  joinUrl: "https://zoom.us/j/83078837399",
  meetingIdDisplay: "830 7883 7399",
  meetingIdRaw: "83078837399",
  passcode: "662215",
} as const;

type ZoomConfigPick = Pick<
  SiteConfig,
  "churchZoomJoinUrl" | "wednesdayZoomLink" | "churchZoomMeetingId" | "churchZoomPasscode"
>;

const SUBSPLASH_PATTERN = /subspla\.sh|subsplash\.com/i;

function isBlockedJoinUrl(url: string | undefined | null): boolean {
  if (!url?.trim()) return true;
  return SUBSPLASH_PATTERN.test(url);
}

function pickJoinUrl(...candidates: Array<string | undefined | null>): string {
  for (const candidate of candidates) {
    const trimmed = candidate?.trim();
    if (trimmed && !isBlockedJoinUrl(trimmed)) {
      return trimmed;
    }
  }
  return CHURCH_ZOOM_DEFAULTS.joinUrl;
}

/** Resolved join URL — direct Zoom only (Subsplash URLs are ignored). */
export function resolveChurchZoomJoinUrl(
  config: ZoomConfigPick | null | undefined,
  env: NodeJS.ProcessEnv = process.env,
): string {
  const fromConfig =
    config?.churchZoomJoinUrl?.trim() || config?.wednesdayZoomLink?.trim();
  const fromEnv =
    env.CHURCH_ZOOM_JOIN_URL?.trim() || env.CHURCH_WEDNESDAY_ZOOM_URL?.trim();
  return pickJoinUrl(fromConfig, fromEnv);
}

export function resolveChurchZoomMeetingId(
  config: ZoomConfigPick | null | undefined,
): string {
  return config?.churchZoomMeetingId?.trim() || CHURCH_ZOOM_DEFAULTS.meetingIdDisplay;
}

export function resolveChurchZoomPasscode(
  config: ZoomConfigPick | null | undefined,
): string {
  return config?.churchZoomPasscode?.trim() || CHURCH_ZOOM_DEFAULTS.passcode;
}

/** True when the join URL includes Zoom's embedded passcode token. */
export function churchZoomJoinUrlIsOneClick(url: string): boolean {
  try {
    return new URL(url).searchParams.has("pwd");
  } catch {
    return false;
  }
}

/** Short church-owned link — `/join` redirects to the resolved join URL. */
export function churchZoomJoinPath(): string {
  return "/join";
}
