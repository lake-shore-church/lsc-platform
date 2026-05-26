"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import { LiveNavLink } from "@/components/live/LiveNavLink";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { LiveBadge } from "@/components/live/LiveBadge";

export function PublicNav({
  churchName,
  serviceTimesLine,
}: {
  churchName: string;
  serviceTimesLine: string;
}) {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status: liveStatus } = useLiveStatus();

  const NAV_GROUPS = useMemo(() => [
    {
      label: t("watch"),
      links: [
        { href: "/sermons", label: t("sermons") },
        { href: "/live", label: t("live") },
        { href: "/podcast.xml", label: t("podcast") },
      ],
    },
    {
      label: t("connect"),
      links: [
        { href: "/visit", label: t("visit") },
        { href: "/events", label: t("groups") },
        { href: "/prayer", label: t("prayer") },
      ],
    },
    {
      label: t("grow"),
      links: [
        { href: "/ministries", label: t("ministries") },
        { href: "/blog", label: t("blog") },
        { href: "/resources", label: t("resources") },
        { href: "/beliefs", label: t("beliefs") },
        { href: "/faq", label: t("faq") },
      ],
    },
    {
      label: t("give"),
      links: [
        { href: "/give", label: t("give") },
        { href: "/give", label: t("about_giving") },
      ],
    },
    {
      label: t("about"),
      links: [
        { href: "/about", label: t("about_us") },
        { href: "/about/leaders", label: t("leaders") },
        { href: "/about#pastor", label: t("pastor") },
        { href: "/testimonies", label: t("testimonies") },
        { href: "/contact", label: t("contact") },
      ],
    },
  ], [t]);

  return (
    <>
      <div className="border-b border-default bg-brand-primary/5">
        <p className="py-2 text-center text-sm font-semibold text-brand-primary">
          {serviceTimesLine}
        </p>
      </div>
      <div className="border-b border-default bg-background shadow-sm">
        <div className="mx-auto flex max-w-7xl min-h-[64px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 font-display text-base font-semibold text-brand-primary sm:text-h3"
          >
            {churchName}
          </Link>

          {liveStatus?.isLive ? (
            <Link href="/live" className="hidden shrink-0 lg:inline-flex">
              <LiveBadge compact />
            </Link>
          ) : null}

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-base font-semibold text-foreground-secondary transition-colors hover:bg-surface hover:text-brand-primary"
                  aria-haspopup="true"
                >
                  {group.label}
                </button>
                <div className="invisible absolute left-0 top-full z-50 min-w-[11rem] pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="rounded-card border border-default bg-surface py-2 shadow-card">
                    {group.links.map((link) => (
                      <li key={`${group.label}-${link.href}-${link.label}`}>
                        {link.href === "/live" ? (
                          <LiveNavLink />
                        ) : (
                          <Link
                            href={link.href}
                            className="link-hover block px-4 py-2 text-base text-foreground-secondary hover:bg-surface-2 hover:text-brand-primary"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>

          <button
            type="button"
            className="min-h-[44px] rounded-md border border-default px-4 text-base font-semibold text-brand-primary lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between border-b border-default bg-background px-4 py-4">
            <span className="font-display text-base font-semibold text-brand-primary">
              {churchName}
            </span>
            <button
              type="button"
              className="min-h-[44px] rounded-md border border-default px-4 text-base font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {t("close")}
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto bg-background px-4 py-6" aria-label="Mobile">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-8">
                <p className="text-label text-brand-accent">{group.label}</p>
                <ul className="mt-3 space-y-1">
                  {group.links.map((link) => (
                    <li key={`${group.label}-${link.href}-${link.label}`}>
                      {link.href === "/live" ? (
                        <div onClick={() => setMobileOpen(false)}>
                          <LiveNavLink />
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="link-hover block min-h-[44px] py-2 text-base text-foreground-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
