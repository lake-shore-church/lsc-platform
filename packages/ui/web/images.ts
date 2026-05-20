/**
 * Unsplash placeholders — each URL verified HTTP 200.
 */
const q = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  /** White dove — Holy Spirit */
  heroBase: q("1564429541910-321de2b3af95", 1920),
  /** Birds in flight — soft overlay on hero */
  heroAccent: q("1721788673938-a06dd0d30ae2", 1920),
  hero: q("1564429541910-321de2b3af95", 1920),
  /** Fellowship — “We'd love to meet you” section */
  community: q("1529156069898-49953e39b3ac", 800),
  /** Connect card — conversation / small group (not the old friends-circle shot) */
  connect: q("1522202176988-66273c2fd55f", 800),
  /** @deprecated use connect */
  smallGroup: q("1522202176988-66273c2fd55f", 800),
  serve: q("1559027615-cd4628902d4a", 800),
  give: q("1532629345422-7515f3d16bb6", 800),
  worship: q("1511632765486-a01980e01a18", 800),
  prayer: q("1544027993-37dbfe43562a", 800),
  bible: q("1504052434569-70ad5836ab65", 800),
} as const;
