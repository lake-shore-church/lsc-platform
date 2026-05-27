import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getTestimonies } from "@repo/cms";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

const FALLBACK_IMAGE = "/church/community.webp";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("testimonies");
  return { title: t("page_title"), description: t("page_desc") };
}

export default async function TestimoniesPage() {
  const t = await getTranslations("testimonies");
  const cmsItems = await getTestimonies().catch(() => []);

  const items =
    cmsItems.length > 0
      ? cmsItems
      : [
          {
            _id: "fallback-1",
            kind: "story" as const,
            title: t("sample_1_title"),
            excerpt: t("sample_1_body"),
            imageUrl: FALLBACK_IMAGE,
          },
          {
            _id: "fallback-2",
            kind: "story" as const,
            title: t("sample_2_title"),
            excerpt: t("sample_2_body"),
            imageUrl: "/church/worship.jpg",
          },
        ];

  const kinds = [
    { key: "story" as const, label: t("filter_story") },
    { key: "video" as const, label: t("filter_video") },
    { key: "audio" as const, label: t("filter_audio") },
  ];

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Container className="py-12">
        <p className="max-w-3xl text-base leading-relaxed text-foreground-secondary">
          {t("intro")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {kinds.map((k) => (
            <span
              key={k.key}
              className="rounded-full border border-default bg-surface px-4 py-1 text-sm font-semibold text-brand-primary"
            >
              {k.label}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {items.map((item) => {
            const kind = item.kind ?? "story";
            const image = item.imageUrl ?? FALLBACK_IMAGE;
            const hasVideo = "videoUrl" in item && item.videoUrl;
            const hasAudio = "audioUrl" in item && item.audioUrl;
            const mediaNote: string | undefined =
              "mediaNote" in item && typeof item.mediaNote === "string"
                ? item.mediaNote
                : hasVideo
                  ? t("video_placeholder")
                  : hasAudio
                    ? t("audio_placeholder")
                    : kind === "video"
                      ? t("video_placeholder")
                      : kind === "audio"
                        ? t("audio_placeholder")
                        : undefined;

            return (
              <article
                key={item._id}
                className="overflow-hidden rounded-card border border-default bg-background shadow-card"
              >
                <div className="relative aspect-video bg-surface-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {mediaNote && (kind === "video" || kind === "audio") ? (
                    <span className="absolute bottom-3 left-3 rounded-md bg-background/90 px-3 py-1 text-xs font-semibold text-brand-primary">
                      {mediaNote}
                    </span>
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-label text-brand-accent">{kind}</p>
                  <h2 className="mt-1 font-display text-h3 text-brand-primary">{item.title}</h2>
                  <p className="mt-3 text-base text-foreground-secondary">{item.excerpt}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-card border border-dashed border-brand-accent/40 bg-surface p-8 text-center">
          <h2 className="font-display text-h3 text-brand-primary">{t("share_heading")}</h2>
          <p className="mt-2 text-foreground-secondary">{t("share_body")}</p>
          <Link
            href="/contact"
            className="link-hover mt-4 inline-block font-semibold text-brand-primary"
          >
            {t("share_cta")} →
          </Link>
        </div>

        <p className="mt-8 text-sm text-foreground-secondary">
          <Link
            href="/ministries/water-baptism-testimonies"
            className="link-hover text-brand-primary"
          >
            {t("baptism_link")}
          </Link>
          {" · "}
          <Link href="/ministries/simple-ministers" className="link-hover text-brand-primary">
            {t("simple_ministers_link")}
          </Link>
        </p>
      </Container>
    </>
  );
}
