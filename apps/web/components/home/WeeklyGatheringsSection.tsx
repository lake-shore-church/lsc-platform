import type { ResolvedThisWeek, SiteConfig } from "@repo/cms";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ZoomJoinBlock } from "@/components/zoom/ZoomJoinBlock";
import {
  resolveChurchZoomMeetingId,
  resolveChurchZoomPasscode,
  churchZoomJoinPath,
} from "@repo/cms";

export async function WeeklyGatheringsSection({
  config,
  thisWeek,
  featured,
}: {
  config: SiteConfig;
  thisWeek: ResolvedThisWeek;
  featured: import("@repo/cms").MinistryPage[];
}) {
  const t = await getTranslations("home");

  const joinPrayer = featured.find((m) => m.slug.current === "join-our-prayers");
  const meetingId = resolveChurchZoomMeetingId(config);
  const passcode = resolveChurchZoomPasscode(config);

  const sermonTitle =
    thisWeek.sermon_title?.trim() || t("upcoming_sermon_default_title");
  const sermonDesc =
    thisWeek.sermon_description?.trim() || t("upcoming_sermon_default_desc");
  const dateLabel = thisWeek.sunday_date_label;
  const wednesdayTitle =
    thisWeek.wednesday_topic?.trim() || config.wednesdayPrayerTitle;
  const wednesdaySummary =
    config.wednesdayPrayerSummary ||
    featured.find((m) => m.slug.current === "wednesday-prayer")?.summary;

  const venueLine = [thisWeek.venue_name, thisWeek.venue_room]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="section-pad bg-surface">
      <Container>
        <h2 className="font-display text-h2 text-brand-primary">{t("weekly_gatherings")}</h2>
        <p className="mt-2 max-w-2xl text-foreground-secondary">{t("weekly_gatherings_intro")}</p>

        <ZoomJoinBlock meetingId={meetingId} passcode={passcode} className="mt-8 max-w-2xl" />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <article className="rounded-card border border-default bg-background p-6 shadow-card lg:col-span-1">
            <p className="text-label text-brand-accent">{t("upcoming_sermon")}</p>
            <h3 className="mt-2 font-display text-h3 text-brand-primary">{sermonTitle}</h3>
            {thisWeek.sermon_scripture ? (
              <p className="mt-1 text-sm font-semibold text-foreground-secondary">
                {thisWeek.sermon_scripture}
              </p>
            ) : null}
            {dateLabel ? (
              <p className="mt-1 text-sm font-semibold text-brand-accent">{dateLabel}</p>
            ) : null}
            {thisWeek.sunday_time ? (
              <p className="mt-1 text-sm text-foreground-muted">{thisWeek.sunday_time}</p>
            ) : null}
            {venueLine ? (
              <p className="mt-2 text-sm text-foreground-secondary">{venueLine}</p>
            ) : null}
            <p className="mt-3 text-base text-foreground-secondary">{sermonDesc}</p>
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
              {wednesdayTitle || t("wednesday_prayer")}
            </h3>
            {thisWeek.wednesday_time ? (
              <p className="mt-1 text-sm font-semibold text-brand-accent">
                {thisWeek.wednesday_time}
              </p>
            ) : null}
            <p className="mt-3 text-base text-foreground-secondary">
              {wednesdaySummary ?? t("sunday_prayer_desc")}
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

        {thisWeek.sunday_school_topic ? (
          <article className="mt-8 max-w-2xl rounded-card border border-default bg-background p-6 shadow-card">
            <p className="text-label text-brand-accent">Sunday School</p>
            <h3 className="mt-2 font-display text-h3 text-brand-primary">
              {thisWeek.sunday_school_topic}
            </h3>
            {thisWeek.sunday_school_scripture ? (
              <p className="mt-1 text-sm text-foreground-secondary">
                {thisWeek.sunday_school_scripture}
              </p>
            ) : null}
            {thisWeek.sunday_school_teacher ? (
              <p className="mt-2 text-sm text-foreground-muted">
                Teacher: {thisWeek.sunday_school_teacher}
              </p>
            ) : null}
          </article>
        ) : null}
      </Container>
    </section>
  );
}
