"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLiveStatus } from "@/hooks/useLiveStatus";

const DISMISS_KEY = "lsc-live-banner-dismissed";

export function LiveSiteBanner() {
  const { status } = useLiveStatus();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (!status?.isLive || dismissed) return null;

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  return (
    <div
      className="relative bg-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
      role="status"
    >
      <Link href="/live" className="inline-flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        We&apos;re live right now! Join Sunday Service →
      </Link>
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-1/2 min-h-[44px] min-w-[44px] -translate-y-1/2 rounded px-2 text-white/90 hover:text-white"
        aria-label="Dismiss live banner"
      >
        ×
      </button>
    </div>
  );
}
