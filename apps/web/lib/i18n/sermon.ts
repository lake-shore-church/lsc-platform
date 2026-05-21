import type { ContentTranslation, Sermon } from "@repo/cms";
import type { AppLocale } from "@/i18n/routing";

export type LocalizedSermonView = {
  title: string;
  summary: string;
  usingFallback: boolean;
};

function pickTranslation(
  translations: ContentTranslation[] | undefined,
  locale: AppLocale,
): ContentTranslation | undefined {
  if (!translations?.length || locale === "en") return undefined;
  return translations.find(
    (row) =>
      row.locale === locale &&
      row.approved &&
      row.status === "published" &&
      row.title,
  );
}

export function localizeSermon(sermon: Sermon, locale: AppLocale): LocalizedSermonView {
  const row = pickTranslation(sermon.translations, locale);
  if (!row) {
    return {
      title: sermon.title,
      summary: sermon.summary ?? "",
      usingFallback: locale !== "en",
    };
  }
  return {
    title: row.title ?? sermon.title,
    summary: row.excerpt ?? sermon.summary ?? "",
    usingFallback: false,
  };
}
