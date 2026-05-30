/** In-app routes — prefer these over opening the website in a browser. */
export const nativeRoutes = {
  home: "/(tabs)/home",
  sermons: "/(tabs)/sermons",
  sermonsLive: "/(tabs)/sermons?tab=live",
  prayer: "/(tabs)/prayer",
  give: "/(tabs)/give",
  more: "/(tabs)/more",
  visit: "/visit",
  contact: "/contact",
  events: "/events",
} as const;

/** Human-readable iOS back button labels keyed by `from` route param. */
export const TAB_BACK_LABELS = {
  home: "Home",
  sermons: "Sermons",
  prayer: "Prayer",
  give: "Give",
  more: "More",
  events: "Events",
} as const;

export type TabBackFrom = keyof typeof TAB_BACK_LABELS;

export function backLabelFrom(from?: string | string[]): string {
  const key = Array.isArray(from) ? from[0] : from;
  if (key && key in TAB_BACK_LABELS) {
    return TAB_BACK_LABELS[key as TabBackFrom];
  }
  return "Back";
}

export function sermonHref(slug: string, from?: TabBackFrom): `/sermon/${string}` {
  return from ? (`/sermon/${slug}?from=${from}` as const) : (`/sermon/${slug}` as const);
}

export function blogHref(slug: string, from?: TabBackFrom): `/blog/${string}` {
  return from ? (`/blog/${slug}?from=${from}` as const) : (`/blog/${slug}` as const);
}

export function eventHref(id: string, from?: TabBackFrom): `/events/${string}` {
  return from ? (`/events/${id}?from=${from}` as const) : (`/events/${id}` as const);
}
