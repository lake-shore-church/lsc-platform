/**
 * Shared church photos — used by web (Next.js) and mobile (Expo).
 * Replace files in packages/media/images/ (see images/README.md).
 */
import hero from "../images/home/chicago_highrises.webp";
import community from "../images/home/plan_a_visit.webp";
import worship from "../images/home/worship.jpg";
import bible from "../images/home/flipping_bible.webp";
import serve from "../images/home/serve.jpg";
import pastorBrian from "../images/people/pastor-brian.jpg";

/** Bundled image modules (Next.js Image + Expo Image / RN Image). */
export const homeImages = {
  hero,
  community,
  worship,
  bible,
  serve,
} as const;

export const peopleImages = {
  pastorBrian,
} as const;

/** @deprecated Prefer homeImages — kept for existing imports */
export const IMAGES = {
  hero,
  community,
  worship,
  bible,
  serve,
  prayer: serve,
  give: serve,
  connect: community,
  smallGroup: community,
  heroBase: hero,
  heroAccent: hero,
} as const;

export type ImageKey = keyof typeof IMAGES;
