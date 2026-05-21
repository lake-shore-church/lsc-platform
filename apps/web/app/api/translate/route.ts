import { NextResponse } from "next/server";
import { getSanityWriteClient, getSermonBySlug } from "@repo/cms";
import { deeplLocales, type AppLocale } from "@/i18n/routing";

const DEEPL_TARGET: Partial<Record<AppLocale, string>> = {
  es: "ES",
  zh: "ZH",
  ja: "JA",
  fr: "FR",
};

export async function POST(request: Request) {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "DEEPL_API_KEY is not configured. Add it to apps/web/.env.local." },
      { status: 503 },
    );
  }

  let body: { sermonId?: string; slug?: string; targetLanguage?: AppLocale };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const target = body.targetLanguage;
  if (!target || !deeplLocales.has(target)) {
    return NextResponse.json({ error: "Unsupported DeepL target language" }, { status: 400 });
  }

  const slug = body.slug;
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const sermon = await getSermonBySlug(slug).catch(() => null);
  if (!sermon) {
    return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
  }

  const deeplTarget = DEEPL_TARGET[target] ?? target.toUpperCase();
  const text = [sermon.title, sermon.summary].filter(Boolean).join("\n\n");

  const params = new URLSearchParams({
    auth_key: apiKey,
    text,
    target_lang: deeplTarget,
  });

  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err || "DeepL request failed" }, { status: 502 });
  }

  const data = (await res.json()) as { translations: { text: string }[] };
  const translated = data.translations[0]?.text ?? "";
  const [titleLine, ...rest] = translated.split("\n\n");
  const draft = {
    locale: target,
    title: titleLine,
    excerpt: rest.join("\n\n") || sermon.summary,
    status: "draft" as const,
    approved: false,
  };

  const existing = sermon.translations?.filter((row) => row.locale !== target) ?? [];
  const client = getSanityWriteClient();
  await client
    .patch(sermon._id)
    .set({ translations: [...existing, draft] })
    .commit();

  return NextResponse.json({ ok: true, draft });
}
