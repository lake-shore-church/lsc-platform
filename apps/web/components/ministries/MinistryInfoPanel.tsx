import type { MinistryPage } from "@repo/cms";
import { Link } from "@/i18n/navigation";
import { isExternalHref } from "@/lib/ministryLinks";

export function MinistryInfoPanel({
  scheduleLabel,
  scheduleDetails,
  venueName,
  venueAddress,
  zoomLink,
  liveStreamLink,
  externalUrl,
  ctaLabel,
  ctaHref,
}: Pick<
  MinistryPage,
  | "scheduleLabel"
  | "scheduleDetails"
  | "venueName"
  | "venueAddress"
  | "zoomLink"
  | "liveStreamLink"
  | "externalUrl"
  | "ctaLabel"
  | "ctaHref"
>) {
  const hasSchedule = scheduleLabel || scheduleDetails || venueName || venueAddress;
  const hasLinks = zoomLink || liveStreamLink || externalUrl || ctaHref;

  if (!hasSchedule && !hasLinks) return null;

  return (
    <aside className="rounded-card border border-default bg-surface p-6 shadow-card">
      {hasSchedule ? (
        <div>
          <h2 className="text-label text-brand-accent">When & where</h2>
          {scheduleLabel ? (
            <p className="mt-2 font-semibold text-brand-primary">{scheduleLabel}</p>
          ) : null}
          {scheduleDetails ? (
            <p className="mt-2 text-base text-foreground-secondary">{scheduleDetails}</p>
          ) : null}
          {venueName ? (
            <p className="mt-3 font-semibold text-foreground-primary">{venueName}</p>
          ) : null}
          {venueAddress ? (
            <p className="mt-1 whitespace-pre-line text-foreground-secondary">{venueAddress}</p>
          ) : null}
        </div>
      ) : null}

      {hasLinks ? (
        <ul className={`space-y-2 ${hasSchedule ? "mt-6 border-t border-default pt-6" : ""}`}>
          {zoomLink ? (
            <li>
              <a
                href={zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover font-semibold text-brand-primary"
              >
                Join on Zoom →
              </a>
            </li>
          ) : null}
          {liveStreamLink ? (
            <li>
              {isExternalHref(liveStreamLink) ? (
                <a
                  href={liveStreamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover font-semibold text-brand-primary"
                >
                  Watch live stream →
                </a>
              ) : (
                <Link href={liveStreamLink} className="link-hover font-semibold text-brand-primary">
                  Watch live stream →
                </Link>
              )}
            </li>
          ) : null}
          {externalUrl ? (
            <li>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover font-semibold text-brand-primary"
              >
                Related site →
              </a>
            </li>
          ) : null}
          {ctaHref && ctaLabel ? (
            <li>
              {isExternalHref(ctaHref) ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover font-semibold text-brand-primary"
                >
                  {ctaLabel} →
                </a>
              ) : (
                <Link href={ctaHref} className="link-hover font-semibold text-brand-primary">
                  {ctaLabel} →
                </Link>
              )}
            </li>
          ) : null}
        </ul>
      ) : null}
    </aside>
  );
}
