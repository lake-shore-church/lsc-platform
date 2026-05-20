"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_GROUPS = [
  {
    label: "Watch",
    links: [
      { href: "/sermons", label: "Sermons" },
      { href: "/live", label: "Live stream" },
    ],
  },
  {
    label: "Connect",
    links: [
      { href: "/visit", label: "Plan a visit" },
      { href: "/prayer", label: "Prayer" },
    ],
  },
  {
    label: "Grow",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/resources", label: "Resources" },
      { href: "/beliefs", label: "Beliefs" },
    ],
  },
  {
    label: "Serve",
    links: [
      { href: "/events", label: "Events" },
      { href: "/give", label: "Give" },
    ],
  },
  {
    label: "About",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export function PublicNav({ churchName }: { churchName: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="border-b border-default bg-background shadow-sm">
        <div className="mx-auto flex max-w-7xl min-h-[64px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 font-display text-base font-semibold text-brand-primary sm:text-h3"
          >
            {churchName}
          </Link>

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
                        <Link
                          href={link.href}
                          className="link-hover block px-4 py-2 text-base text-foreground-secondary hover:bg-surface-2 hover:text-brand-primary"
                        >
                          {link.label}
                        </Link>
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
            {mobileOpen ? "Close" : "Menu"}
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
              Close
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto bg-background px-4 py-6" aria-label="Mobile">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-8">
                <p className="text-label text-brand-accent">{group.label}</p>
                <ul className="mt-3 space-y-1">
                  {group.links.map((link) => (
                    <li key={`${group.label}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="link-hover block min-h-[44px] py-2 text-base text-foreground-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
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
