import type { MinistryCategory } from "@repo/cms";

export const MINISTRY_CATEGORY_LABELS: Record<MinistryCategory, string> = {
  watch: "Watch & listen",
  connect: "Connect",
  grow: "Grow in faith",
  serve: "Serve",
  missions: "Missions & global",
  "church-life": "Church life & stories",
};

export const MINISTRY_CATEGORY_ORDER: MinistryCategory[] = [
  "connect",
  "watch",
  "grow",
  "serve",
  "missions",
  "church-life",
];
