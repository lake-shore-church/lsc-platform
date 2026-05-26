import type { SiteConfig } from "../types";

/**
 * Lake Shore Church — one Zoom room for Sunday, Wednesday, and special meetings.
 * The join URL must include Zoom's embedded passcode (`?pwd=…`) for one-click join.
 * Copy the full invite link from Zoom (Settings → Embed passcode in invite link).
 */
export const CHURCH_ZOOM_DEFAULTS = {
  /** Legacy Subsplash wrapper — replace in Sanity with direct zoom.us/j/…?pwd=… when ready. */
  joinUrl: "https://lakeshoreassemblyofgod.subspla.sh/kfcjjpv",
  meetingIdDisplay: "830 7883 7399",
  meetingIdRaw: "83078837399",
  passcode: "662215",
} as const;

type ZoomConfigPick = Pick<
  SiteConfig,
  "churchZoomJoinUrl" | "wednesdayZoomLink" | "churchZoomMeetingId" | "churchZoomPasscode"
>;

/** Resolved one-click join URL (Subsplash, zoom.us with pwd, or env override). */
export function resolveChurchZoomJoinUrl(
  config: ZoomConfigPick | null | undefined,
  env: NodeJS.ProcessEnv = process.env,
): string {
  const fromConfig =
    config?.churchZoomJoinUrl?.trim() || config?.wednesdayZoomLink?.trim();
  const fromEnv =
    env.CHURCH_ZOOM_JOIN_URL?.trim() || env.CHURCH_WEDNESDAY_ZOOM_URL?.trim();
  return fromConfig || fromEnv || CHURCH_ZOOM_DEFAULTS.joinUrl;
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

/** Short church-owned link — `/join` redirects to the resolved join URL. */
export function churchZoomJoinPath(): string {
  return "/join";
}
