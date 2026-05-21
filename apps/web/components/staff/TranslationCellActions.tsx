"use client";

import Link from "next/link";
import { deeplLocales, googleTranslateLocales, manualOnlyLocales, type AppLocale } from "@/i18n/routing";

export function TranslationCellActions({
  slug,
  locale,
  title,
  excerpt,
}: {
  slug: string;
  locale: AppLocale;
  title: string;
  excerpt?: string;
}) {
  async function autoTranslate() {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, targetLanguage: locale }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Translation failed");
      return;
    }
    window.location.reload();
  }

  async function translateTamil() {
    const res = await fetch("/api/translate-google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [title, excerpt].filter(Boolean).join("\n\n"),
        targetLanguage: "ta",
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Google Translate failed");
      return;
    }
    alert("Tamil draft returned — paste into Sanity Studio translations tab.");
  }

  if (deeplLocales.has(locale)) {
    return (
      <button
        type="button"
        className="mt-1 text-xs font-semibold text-brand-primary"
        onClick={() => void autoTranslate()}
      >
        Auto-translate
      </button>
    );
  }

  if (googleTranslateLocales.has(locale)) {
    return (
      <button
        type="button"
        className="mt-1 text-xs font-semibold text-brand-primary"
        onClick={() => void translateTamil()}
      >
        Google (TA)
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
