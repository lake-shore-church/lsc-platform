"use client";

import { Link } from "@/i18n/navigation";

export function LiveBadge({ compact }: { compact?: boolean }) {
  return (
    <Link
      href="/live"
      className={`inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase text-white ${compact ? "" : "shadow-sm"}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      Live now
    </Link>
  );
}
