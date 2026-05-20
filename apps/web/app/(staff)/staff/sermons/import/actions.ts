"use server";

import { revalidatePath } from "next/cache";
import { getSanityWriteClient } from "@repo/cms";
import { requireStaffPortal } from "@/lib/auth/session";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

export type ImportSermonState = { error?: string; success?: string } | null;

export async function importSermonFromYouTube(
  _prev: ImportSermonState,
  formData: FormData,
): Promise<ImportSermonState> {
  await requireStaffPortal();

  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const scripture = String(formData.get("scripture") ?? "").trim();
  const seriesSlug = String(formData.get("seriesSlug") ?? "sunday-sermons");
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();

  if (!youtubeUrl || !title || !scripture || !excerpt) {
    return { error: "YouTube URL, title, scripture, and excerpt are required." };
  }

  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId) {
    return { error: "Could not parse YouTube URL." };
  }

  const seriesRef =
    seriesSlug === "sheer-goodness-of-jesus"
      ? "series-sheer-goodness"
      : "series-sunday-sermons";

  const slug = slugify(title);
  const id = `sermon-import-${slug}`;

  try {
    const client = getSanityWriteClient();
    await client.createOrReplace({
      _id: id,
      _type: "sermon",
      title,
      slug: { _type: "slug", current: slug },
      summary: excerpt,
      scripture,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: publishedAt
        ? new Date(publishedAt).toISOString()
        : new Date().toISOString(),
      series: { _type: "reference", _ref: seriesRef },
      pastor: { _type: "reference", _ref: "staff-pastor-brian" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save sermon.";
    return { error: message };
  }

  revalidatePath("/sermons");
  revalidatePath("/staff/sermons");

  return {
    success: `Sermon "${title}" saved to Sanity. Whisper transcription will run when audio is uploaded to R2.`,
  };
}
