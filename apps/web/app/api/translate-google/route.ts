import { NextResponse } from "next/server";

/** Tamil translation via Google Cloud Translation API (v2 REST). */
export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_TRANSLATE_API_KEY is not configured." },
      { status: 503 },
    );
  }

  let body: { text?: string; targetLanguage?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.text?.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  if (body.targetLanguage !== "ta") {
    return NextResponse.json({ error: "Only targetLanguage ta is supported" }, { status: 400 });
  }

  const url = new URL("https://translation.googleapis.com/language/translate/v2");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("q", body.text);
  url.searchParams.set("target", "ta");
  url.searchParams.set("source", "en");

  const res = await fetch(url.toString(), { method: "POST" });
  if (!res.ok) {
    return NextResponse.json({ error: await res.text() }, { status: 502 });
  }

  const data = (await res.json()) as {
    data: { translations: { translatedText: string }[] };
  };

  return NextResponse.json({
    translatedText: data.data.translations[0]?.translatedText ?? "",
  });
}
