"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/staff/prayers", label: "Prayer" },
  { href: "/staff/sermons", label: "Sermons" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/blog", label: "Blog" },
  { href: "/staff/members", label: "Members" },
  { href: "/staff/financials", label: "Financials" },
] as const;

export function StaffNav({ name, role }: { name: string; role: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-default bg-surface lg:w-56 lg:border-b-0 lg:border-r">
      <div className="p-4">
        <Link href="/" className="text-sm text-brand-primary">
          ← Public site
        </Link>
        <p className="mt-2 font-display text-lg font-semibold">Staff portal</p>
        <p className="text-sm text-foreground-secondary">{name}</p>
        <span className="mt-1 inline-block rounded bg-brand-secondary/15 px-2 py-0.5 text-xs font-semibold capitalize text-brand-secondary">
          {role}
        </span>
        <form action="/auth/signout" method="post" className="mt-4">
          <button type="submit" className="link-hover text-sm">
            Sign out
          </button>
        </form>
      </div>
      <nav aria-label="Staff" className="flex flex-wrap gap-1 p-2 lg:flex-col">
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`min-h-[44px] rounded-md px-3 py-2 text-sm font-semibold lg:w-full ${
              pathname.startsWith(item.href)
                ? "bg-brand-primary text-white"
                : "text-foreground-secondary hover:bg-surface-2"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/member/dashboard"
          className="min-h-[44px] rounded-md px-3 py-2 text-sm text-foreground-muted lg:w-full"
        >
          Member view
        </Link>
      </nav>
    </aside>
  );
}
