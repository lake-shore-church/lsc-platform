import { defineRouting } from "next-intl/routing";

/** Active locales — English has no URL prefix (localePrefix: as-needed). */
export const locales = ["en", "es", "zh", "ja", "ta", "tl", "hi", "fr"] as const;
export type AppLocale = (typeof locales)[number];

/** Scaffolded for Phase 3 — not routed until content is ready. */
export const futureLocales = ["yo", "tw", "ms"] as const;

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "as-needed",
  /** Prefer explicit user choice (cookie) over browser language alone. */
  localeDetection: true,
  localeCookie: true,
});

export const localeLabels: Record<
  AppLocale,
  { label: string; flag: string; htmlLang: string }
> = {
  en: { label: "English", flag: "🇺🇸", htmlLang: "en" },
  es: { label: "Español", flag: "🇪🇸", htmlLang: "es" },
  zh: { label: "中文", flag: "🇨🇳", htmlLang: "zh-Hans" },
  ja: { label: "日本語", flag: "🇯🇵", htmlLang: "ja" },
  ta: { label: "தமிழ்", flag: "🇮🇳", htmlLang: "ta" },
  tl: { label: "Filipino", flag: "🇵🇭", htmlLang: "tl" },
  hi: { label: "हिन्दी", flag: "🇮🇳", htmlLang: "hi" },
  fr: { label: "Français", flag: "🇫🇷", htmlLang: "fr" },
};

/** DeepL-supported targets (Tagalog/Filipino uses Google). */
export const deeplLocales = new Set<AppLocale>(["es", "zh", "ja", "fr"]);
export const googleTranslateLocales = new Set<AppLocale>(["ta", "tl", "hi"]);
/** No manual-only locales at this time. */
export const manualOnlyLocales = new Set<AppLocale>();
