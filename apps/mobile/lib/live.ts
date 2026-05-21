import { fetchJson } from "./api";

export type LiveStatus = {
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

export function fetchLiveStatus(): Promise<LiveStatus> {
  return fetchJson<LiveStatus>("/api/live-status");
}

export function countdownParts(targetIso: string, nowMs = Date.now()) {
  const targetMs = new Date(targetIso).getTime();
  let diff = Math.max(0, targetMs - nowMs);
  const days = Math.floor(diff / 86_400_000);
  diff -= days * 86_400_000;
  const hours = Math.floor(diff / 3_600_000);
  diff -= hours * 3_600_000;
  const minutes = Math.floor(diff / 60_000);
  return { days, hours, minutes, targetMs, totalMs: targetMs - nowMs };
}
