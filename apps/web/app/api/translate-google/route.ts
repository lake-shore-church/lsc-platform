import { NextResponse } from "next/server";
import { getSanityWriteClient, getSermonBySlug } from "@repo/cms";
import { googleTranslateLocales, type AppLocale } from "@/i18n/routing";
import { splitTitleAndExcerpt, translateWithGoogle } from "@/lib/translate/google";

/** Tamil and Filipino via Google Cloud Translation — optional Sanity draft save. */
export async function POST(request: Request) {
  let body: {
    text?: string;
    slug?: string;
    targetLanguage?: AppLocale;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const target = body.targetLanguage;
  if (!target || !googleTranslateLocales.has(target)) {
    return NextResponse.json(
      { error: "Supported targetLanguage: ta, tl, hi" },
      { status: 400 },
    );
  }

  let sourceText = body.text?.trim() ?? "";

  if (body.slug) {
    const sermon = await getSermonBySlug(body.slug).catch(() => null);
    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }
    sourceText = [sermon.title, sermon.summary].filter(Boolean).join("\n\n");
  }

  if (!sourceText) {
    return NextResponse.json({ error: "text or slug is required" }, { status: 400 });
  }

  try {
    const translatedText = await translateWithGoogle(sourceText, target);
    const { title, excerpt } = splitTitleAndExcerpt(translatedText);

    if (body.slug) {
      const sermon = await getSermonBySlug(body.slug);
      if (sermon) {
        const draft = {
          locale: target,
          title,
          excerpt: excerpt || sermon.summary,
          status: "draft" as const,
          approved: false,
        };
        const existing = sermon.translations?.filter((row) => row.locale !== target) ?? [];
        const client = getSanityWriteClient();
        await client
          .patch(sermon._id)
          .set({ translations: [...existing, draft] })
          .commit();
      }
    }

    return NextResponse.json({ ok: true, translatedText, title, excerpt });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Translation failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
