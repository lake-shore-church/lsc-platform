import type { Sermon } from "@repo/cms";

/** One episode per title (newest slug wins) — avoids duplicate Sanity imports. */
export function dedupeSermonsForPodcast(sermons: Sermon[]): Sermon[] {
  const byTitle = new Map<string, Sermon>();

  for (const sermon of sermons) {
    const key = sermon.title.trim().toLowerCase();
    const existing = byTitle.get(key);
    if (!existing) {
      byTitle.set(key, sermon);
      continue;
    }
    const existingAt = existing.publishedAt ?? "";
    const nextAt = sermon.publishedAt ?? "";
    if (nextAt >= existingAt) byTitle.set(key, sermon);
  }

  return [...byTitle.values()].sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return tb - ta;
  });
}

export function sermonEpisodeDescription(sermon: Sermon): string {
  const parts = [sermon.summary ?? sermon.title];
  if (sermon.scripture?.trim()) parts.push(`Scripture: ${sermon.scripture.trim()}`);
  if (sermon.videoUrl?.trim()) parts.push(`Watch: ${sermon.videoUrl.trim()}`);
  return parts.join("\n\n");
}
