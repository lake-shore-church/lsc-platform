/**
 * Unsplash placeholders — URLs verified HTTP 200 (images.unsplash.com).
 * Replace with congregation photos in Sanity when ready.
 */
const q = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  /** Outdoor worship / community gathering */
  heroBase: q("1511632765486-a01980e01a18", 1920),
  /** Open Bible, warm light — blended over hero */
  heroAccent: q("1504052434569-70ad5836ab65", 1920),
  hero: q("1511632765486-a01980e01a18", 1920),
  /** Diverse group in fellowship */
  community: q("1529156069898-49953e39b3ac", 800),
  /** Friends in circle — small group */
  smallGroup: q("1511988617509-a57c8a288659", 800),
  /** Volunteering / serving */
  serve: q("1559027615-cd4628902d4a", 800),
  /** Hands open — generous giving */
  give: q("1532629345422-7515f3d16bb6", 800),
  /** Worship gathering */
  worship: q("1511632765486-a01980e01a18", 800),
  /** Prayer */
  prayer: q("1544027993-37dbfe43562a", 800),
  bible: q("1504052434569-70ad5836ab65", 800),
} as const;
