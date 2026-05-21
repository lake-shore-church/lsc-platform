"use client";

import Link from "next/link";
import { deeplLocales, googleTranslateLocales, manualOnlyLocales, type AppLocale } from "@/i18n/routing";

export function TranslationCellActions({
  slug,
  locale,
}: {
  slug: string;
  locale: AppLocale;
}) {
  async function autoDeepL() {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, targetLanguage: locale }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "DeepL translation failed");
      return;
    }
    window.location.reload();
  }

  async function autoGoogle() {
    const res = await fetch("/api/translate-google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, targetLanguage: locale }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Google translation failed");
      return;
    }
    window.location.reload();
  }

  if (deeplLocales.has(locale)) {
    return (
      <button
        type="button"
        className="mt-1 text-xs font-semibold text-brand-primary"
        onClick={() => void autoDeepL()}
      >
        Auto-translate (DeepL)
      </button>
    );
  }

  if (googleTranslateLocales.has(locale)) {
    return (
      <button
        type="button"
        className="mt-1 text-xs font-semibold text-brand-primary"
        onClick={() => void autoGoogle()}
      >
        Auto-translate (Google)
      </button>
    );
  }

  if (manualOnlyLocales.has(locale)) {
    return (
      <Link href="/studio" className="mt-1 block text-xs text-brand-primary">
        Manual in Studio
      </Link>
    );
  }

  return null;
}
