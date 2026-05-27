import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Sermon } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";

export async function FeaturedSeriesSection({ latestSermon }: { latestSermon: Sermon | null }) {
  const t = await getTranslations("home");

  return (
    <section className="section-pad bg-brand-primary text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-label tracking-widest text-white/70">{t("current_series")}</p>
            <h2 className="mt-3 font-display text-h2">{t("series_title")}</h2>
            <p className="mt-2 text-lg text-white/90">{t("series_by")}</p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-white/85">
              {t("series_desc")}
            </p>
            <Link
              href="/sermons"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-6 text-base font-semibold text-white hover:opacity-90"
            >
              {t("watch_series")}
            </Link>
          </div>
          {latestSermon ? (
            <article className="rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-label text-white/70">{t("latest_message")}</p>
              <h3 className="mt-2 font-display text-h3">{latestSermon.title}</h3>
              {latestSermon.scripture ? (
                <p className="mt-2 text-base text-white/85">{latestSermon.scripture}</p>
              ) : null}
              {latestSermon.publishedAt ? (
                <p className="mt-2 text-sm text-white/70">
                  {formatDate(latestSermon.publishedAt)}
                </p>
              ) : null}
              <Link
                href={`/sermons/${latestSermon.slug.current}`}
                className="link-hover mt-4 inline-block font-semibold text-brand-accent"
              >
                {t("watch_now")}
              </Link>
            </article>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
