import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getSermonBySlug,
  getSermonsBySeries,
  getAllSermonSlugs,
} from "@repo/cms";
import { routing, type AppLocale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SermonPlayer } from "@/components/sermons/SermonPlayer";
import { SermonCard } from "@/components/sermons/SermonCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate, youtubeEmbedUrl } from "@/lib/format";
import { localizeSermon } from "@/lib/i18n/sermon";
import { slugValue } from "@/lib/sanity";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSermonSlugs().catch(() => []);
  return routing.locales.flatMap((locale) =>
    slugs.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const sermon = await getSermonBySlug(slug).catch(() => null);
  if (!sermon) return { title: "Sermon" };
  const view = localizeSermon(sermon, locale as AppLocale);
  return {
    title: view.title,
    description: view.summary || `Sermon from Lake Shore Church — ${sermon.scripture ?? ""}`,
  };
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const loc = locale as AppLocale;
  const t = await getTranslations("sermon");
  const sermon = await getSermonBySlug(slug).catch(() => null);
  if (!sermon) notFound();

  const view = localizeSermon(sermon, loc);
  const seriesSlug = slugValue(sermon.series?.slug);
  const related = seriesSlug
    ? await getSermonsBySeries(seriesSlug, { limit: 4 }).catch(() => [])
    : [];

  const videoEmbed = youtubeEmbedUrl(sermon.videoUrl);
  const mediaBase = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
  const captionsUrl = mediaBase ? `${mediaBase}/captions/${slug}.vtt` : null;

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: view.title,
    description: view.summary,
    uploadDate: sermon.publishedAt,
    contentUrl: sermon.videoUrl,
    url: `${SITE_URL}/sermons/${slug}`,
  };

  return (
    <>
      <JsonLd data={videoJsonLd} />
      <Container className="py-10">
        <p className="text-sm text-foreground-muted">{formatDate(sermon.publishedAt)}</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-primary sm:text-4xl">{view.title}</h1>
        {sermon.pastor?.name ? (
          <p className="mt-2 text-lg text-foreground-secondary">{sermon.pastor.name}</p>
        ) : null}
        {sermon.scripture ? (
          <p className="font-medium text-brand-accent">{sermon.scripture}</p>
        ) : null}
        {loc !== "en" ? (
          <p className="mt-2 text-sm text-foreground-muted">{t("watch_english_video")}</p>
        ) : null}
        <div className="mt-8">
          <SermonPlayer videoUrl={videoEmbed} audioUrl={sermon.audioUrl} />
        </div>
        {captionsUrl ? (
          <p className="mt-4 text-sm">
            <a href={captionsUrl} className="text-brand-primary hover:underline">
              Download captions (.vtt)
            </a>
          </p>
        ) : null}
        {view.summary ? (
          <p className="mt-6 text-lg text-foreground-secondary">{view.summary}</p>
        ) : null}
        {loc !== "en" && sermon.summary ? (
          <details className="mt-6 rounded-card border border-default bg-surface p-4">
            <summary className="cursor-pointer font-semibold text-brand-primary">
              {t("transcript_english")}
            </summary>
            <p className="mt-3 text-foreground-secondary">{sermon.summary}</p>
          </details>
        ) : null}
        {related.length > 1 ? (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-brand-primary">More in this series</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related
                .filter((s) => slugValue(s.slug) !== slug)
                .slice(0, 2)
                .map((s) => (
                  <SermonCard key={s._id} sermon={s} />
                ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
