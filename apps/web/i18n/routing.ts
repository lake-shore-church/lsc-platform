import { defineRouting } from "next-intl/routing";

/** Active locales — English has no URL prefix (localePrefix: as-needed). */
export const locales = ["en", "es", "zh", "ja", "ta", "tl", "nag"] as const;
export type AppLocale = (typeof locales)[number];

/** Scaffolded for Phase 3 — not routed until content is ready. */
export const futureLocales = ["yo", "tw", "ms"] as const;

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
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
  nag: { label: "Nagamese", flag: "🇮🇳", htmlLang: "en" },
};

/** CMS / DeepL locale codes (nag is manual-only). */
/** DeepL-supported targets (Tagalog/Filipino is not on DeepL — use Studio/manual). */
export const deeplLocales = new Set<AppLocale>(["es", "zh", "ja"]);
export const googleTranslateLocales = new Set<AppLocale>(["ta"]);
/** No reliable DeepL target — use Studio or future Google batch. */
export const manualOnlyLocales = new Set<AppLocale>(["tl", "nag"]);
