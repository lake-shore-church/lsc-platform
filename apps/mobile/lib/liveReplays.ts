import type { MobileSermon } from "./api";

/** Recent services with video — streamed from CDN, not auto-downloaded to save phone storage. */
export function recentLiveReplays(
  sermons: MobileSermon[],
  days = 31,
): MobileSermon[] {
  const cutoff = Date.now() - days * 86_400_000;
  return sermons.filter((s) => {
    if (!s.videoUrl?.trim() || !s.publishedAt) return false;
    return new Date(s.publishedAt).getTime() >= cutoff;
  });
}
