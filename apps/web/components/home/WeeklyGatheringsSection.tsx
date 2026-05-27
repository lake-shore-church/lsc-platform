import type { SiteConfig, Sermon } from "@repo/cms";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ZoomJoinBlock,
} from "@/components/zoom/ZoomJoinBlock";
import {
  resolveChurchZoomMeetingId,
  resolveChurchZoomPasscode,
  churchZoomJoinPath,
} from "@repo/cms";

const PLACEHOLDER_SERMON_TITLES = new Set([
  "next sunday message",
  "sunday message",
]);

function resolveUpcomingSermonTitle(
  config: SiteConfig,
  latestSermon: Sermon | null,
  defaultTitle: string,
): string {
  const fromConfig = config.upcomingSermonTitle?.trim();
  if (fromConfig && !PLACEHOLDER_SERMON_TITLES.has(fromConfig.toLowerCase())) {
    return fromConfig;
  }
  if (latestSermon?.title?.trim()) return latestSermon.title;
  return defaultTitle;
}

export async function WeeklyGatheringsSection({
  config,
  featured,
  latestSermon = null,
}: {
  config: SiteConfig;
  featured: import("@repo/cms").MinistryPage[];
  latestSermon?: Sermon | null;
}) {
  const t = await getTranslations("home");
  const upcomingTitle = resolveUpcomingSermonTitle(
    config,
    latestSermon,
    t("upcoming_sermon_default_title"),
  );

  const wednesday = featured.find((m) => m.slug.current === "wednesday-prayer");
  const joinPrayer = featured.find((m) => m.slug.current === "join-our-prayers");
  const meetingId = resolveChurchZoomMeetingId(config);
  const passcode = resolveChurchZoomPasscode(config);

  return (
    <section className="section-pad bg-surface">
      <Container>
        <h2 className="font-display text-h2 text-brand-primary">{t("weekly_gatherings")}</h2>
        <p className="mt-2 max-w-2xl text-foreground-secondary">{t("weekly_gatherings_intro")}</p>

        <ZoomJoinBlock meetingId={meetingId} passcode={passcode} className="mt-8 max-w-2xl" />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <article className="rounded-card border border-default bg-background p-6 shadow-card lg:col-span-1">
            <p className="text-label text-brand-accent">{t("upcoming_sermon")}</p>
            <h3 className="mt-2 font-display text-h3 text-brand-primary">{upcomingTitle}</h3>
            {config.upcomingSermonDate ? (
              <p className="mt-1 text-sm font-semibold text-brand-accent">
                {config.upcomingSermonDate}
              </p>
            ) : null}
            <p className="mt-3 text-base text-foreground-secondary">
              {config.upcomingSermonDescription || t("upcoming_sermon_default_desc")}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href={churchZoomJoinPath()} variant="primary" className="text-sm">
                {t("join_zoom")}
              </Button>
              <Button href="/live" variant="secondary" className="text-sm">
                {t("watch_online")}
              </Button>
            </div>
          </article>

          <article className="rounded-card border border-default bg-background p-6 shadow-card">
            <p className="text-label text-brand-accent">{t("sunday_prayer")}</p>
            <h3 className="mt-2 font-display text-h3 text-brand-primary">
              {config.sundayPrayerGathering || joinPrayer?.scheduleLabel || t("sunday_prayer")}
            </h3>
            <p className="mt-3 text-base text-foreground-secondary">
              {joinPrayer?.summary ?? t("sunday_prayer_desc")}
            </p>
            <Link
              href={churchZoomJoinPath()}
              className="link-hover mt-4 inline-block font-semibold text-brand-primary"
            >
              {t("join_zoom")} →
            </Link>
          </article>

          <article className="rounded-card border border-default bg-background p-6 shadow-card">
            <p className="text-label text-brand-accent">{t("wednesday_prayer")}</p>
            <h3 className="mt-2 font-display text-h3 text-brand-primary">
              {config.wednesdayPrayerTitle || wednesday?.title}
            </h3>
            <p className="mt-3 text-base text-foreground-secondary">
              {config.wednesdayPrayerSummary || wednesday?.summary}
            </p>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              <li>
                <Link href={churchZoomJoinPath()} className="link-hover text-brand-primary">
                  {t("join_zoom")} →
                </Link>
              </li>
              <li>
                <Link href="/live" className="link-hover text-brand-primary">
                  {t("wednesday_live")} →
                </Link>
              </li>
              <li>
                <Link href="/ministries/wednesday-prayer" className="link-hover text-brand-primary">
                  {t("wednesday_details")} →
                </Link>
              </li>
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
