import type { AppLocale } from "@/i18n/routing";

const GOOGLE_TARGET: Partial<Record<AppLocale, string>> = {
  ta: "ta",
  tl: "tl",
};

export function googleTargetCode(locale: AppLocale): string | null {
  return GOOGLE_TARGET[locale] ?? null;
}

export async function translateWithGoogle(
  text: string,
  targetLocale: AppLocale,
): Promise<string> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_TRANSLATE_API_KEY is not configured.");
  }

  const target = googleTargetCode(targetLocale);
  if (!target) {
    throw new Error(`Google Translate does not support locale: ${targetLocale}`);
  }

  const url = new URL("https://translation.googleapis.com/language/translate/v2");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("q", text);
  url.searchParams.set("target", target);
  url.searchParams.set("source", "en");

  const res = await fetch(url.toString(), { method: "POST" });
  if (!res.ok) {
    throw new Error(await res.text());
  }

  const data = (await res.json()) as {
    data: { translations: { translatedText: string }[] };
  };

  return data.data.translations[0]?.translatedText ?? "";
}

export function splitTitleAndExcerpt(translated: string, fallbackExcerpt?: string) {
  const [titleLine, ...rest] = translated.split("\n\n");
  return {
    title: titleLine?.trim() ?? "",
    excerpt: rest.join("\n\n").trim() || fallbackExcerpt || "",
  };
}
