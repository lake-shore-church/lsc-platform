import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import en from "../messages/en.json";
import es from "../messages/es.json";
import ja from "../messages/ja.json";
import nag from "../messages/nag.json";
import ta from "../messages/ta.json";
import tl from "../messages/tl.json";
import zh from "../messages/zh.json";

export const supportedLocales = ["en", "es", "zh", "ja", "ta", "tl", "nag"] as const;
export type MobileLocale = (typeof supportedLocales)[number];

const STORAGE_KEY = "lsc-lang";

const i18n = new I18n({ en, es, zh, ja, ta, tl, nag });
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export function t(scope: string, key: string): string {
  return i18n.t(`${scope}.${key}`);
}

export function getI18n() {
  return i18n;
}

function normalizeDeviceLocale(): MobileLocale {
  const code = Localization.getLocales()[0]?.languageCode?.toLowerCase() ?? "en";
  const map: Record<string, MobileLocale> = {
    en: "en",
    es: "es",
    zh: "zh",
    ja: "ja",
    ta: "ta",
    tl: "tl",
    fil: "tl",
    nag: "nag",
  };
  return map[code] ?? "en";
}

export async function initMobileI18n(): Promise<MobileLocale> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const locale =
    stored && supportedLocales.includes(stored as MobileLocale)
      ? (stored as MobileLocale)
      : normalizeDeviceLocale();
  i18n.locale = locale;
  return locale;
}

export async function setMobileLocale(locale: MobileLocale): Promise<void> {
  i18n.locale = locale;
  await AsyncStorage.setItem(STORAGE_KEY, locale);
}

export const localeOptions = [
  { code: "en" as const, label: "English", flag: "🇺🇸" },
  { code: "es" as const, label: "Español", flag: "🇪🇸" },
  { code: "zh" as const, label: "中文", flag: "🇨🇳" },
  { code: "ja" as const, label: "日本語", flag: "🇯🇵" },
  { code: "ta" as const, label: "தமிழ்", flag: "🇮🇳" },
  { code: "tl" as const, label: "Filipino", flag: "🇵🇭" },
  { code: "nag" as const, label: "Nagamese", flag: "🇮🇳" },
];
