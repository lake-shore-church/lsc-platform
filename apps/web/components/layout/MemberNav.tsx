"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/member/dashboard", label: "Dashboard" },
  { href: "/member/giving", label: "Giving" },
  { href: "/member/prayers", label: "Prayers" },
  { href: "/member/groups", label: "Groups" },
  { href: "/member/resources", label: "Resources" },
  { href: "/member/notifications", label: "Notifications" },
] as const;

export function MemberNav({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-default bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <div>
          <Link href="/" className="text-sm text-brand-primary">
            ← Public site
          </Link>
          <p className="font-display text-lg font-semibold text-foreground">
            Member portal
          </p>
          <p className="text-sm text-foreground-muted">{name}</p>
        </div>
        <form action="/auth/signout" method="post">
          <button type="submit" className="link-hover min-h-[44px] text-sm">
            Sign out
          </button>
        </form>
      </div>
      <nav
        aria-label="Member"
        className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 pb-3"
      >
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`min-h-[44px] rounded-md px-3 py-2 text-sm font-semibold ${
              pathname === item.href
                ? "bg-brand-primary text-white"
                : "text-foreground-secondary hover:bg-surface-2"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
