import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSermonBySlug,
  getSermonsBySeries,
  getAllSermonSlugs,
} from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { SermonPlayer } from "@/components/sermons/SermonPlayer";
import { SermonCard } from "@/components/sermons/SermonCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate, youtubeEmbedUrl } from "@/lib/format";
import { slugValue } from "@/lib/sanity";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSermonSlugs().catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug).catch(() => null);
  if (!sermon) return { title: "Sermon" };
  return {
    title: sermon.title,
    description: sermon.summary ?? `Sermon from Lake Shore Church — ${sermon.scripture ?? ""}`,
  };
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug).catch(() => null);
  if (!sermon) notFound();

  const seriesSlug = slugValue(sermon.series?.slug);
  const related = seriesSlug
    ? await getSermonsBySeries(seriesSlug, { limit: 4 }).catch(() => [])
    : [];

  const videoEmbed = youtubeEmbedUrl(sermon.videoUrl);
  const mediaBase = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
  const captionsUrl = mediaBase
    ? `${mediaBase}/captions/${slug}.vtt`
    : null;

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: sermon.title,
    description: sermon.summary,
    uploadDate: sermon.publishedAt,
    contentUrl: sermon.videoUrl,
    url: `${SITE_URL}/sermons/${slug}`,
  };

  return (
    <>
      <JsonLd data={videoJsonLd} />
      <Container className="py-10">
        <p className="text-sm text-foreground-muted">{formatDate(sermon.publishedAt)}</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-primary sm:text-4xl">{sermon.title}</h1>
        {sermon.pastor?.name ? (
          <p className="mt-2 text-lg text-foreground-secondary">{sermon.pastor.name}</p>
        ) : null}
        {sermon.scripture ? (
          <p className="text-brand-accent font-medium">{sermon.scripture}</p>
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
        {sermon.summary ? (
          <p className="mt-6 text-lg text-foreground-secondary">{sermon.summary}</p>
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
