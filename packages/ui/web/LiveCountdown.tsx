"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  targetIso: string;
  className?: string;
  /** When true, show seconds and link when service starts */
  showSeconds?: boolean;
  liveHref?: string;
};

function partsUntil(targetMs: number, nowMs: number) {
  let diff = Math.max(0, targetMs - nowMs);
  const days = Math.floor(diff / 86_400_000);
  diff -= days * 86_400_000;
  const hours = Math.floor(diff / 3_600_000);
  diff -= hours * 3_600_000;
  const minutes = Math.floor(diff / 60_000);
  diff -= minutes * 60_000;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds, totalMs: targetMs - nowMs };
}

export function LiveCountdown({
  targetIso,
  className = "",
  showSeconds = true,
  liveHref = "/live",
}: Props) {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds, totalMs } = partsUntil(targetMs, now);
  const underHour = totalMs > 0 && totalMs < 3_600_000;
  const starting = totalMs <= 0;

  if (starting) {
    return (
      <p className={`text-lg font-semibold text-red-600 ${className}`}>
        Service is starting now!{" "}
        <a href={liveHref} className="underline">
          Watch live →
        </a>
      </p>
    );
  }

  return (
    <div className={className}>
      {underHour ? (
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-red-600">
          Starting soon!
        </p>
      ) : null}
      <p
        className={`font-display text-2xl font-bold sm:text-3xl ${underHour ? "text-red-600" : "text-white"}`}
      >
        <span className="tabular-nums">{days}</span>
        <span className="mx-1 text-base font-semibold opacity-80">days</span>
        <span className="tabular-nums">{hours}</span>
        <span className="mx-1 text-base font-semibold opacity-80">hrs</span>
        <span className="tabular-nums">{minutes}</span>
        <span className="mx-1 text-base font-semibold opacity-80">min</span>
        {showSeconds ? (
          <>
            <span className="tabular-nums">{seconds}</span>
            <span className="mx-1 text-base font-semibold opacity-80">sec</span>
          </>
        ) : null}
      </p>
      <p className="mt-2 text-sm text-white/80">Next service in</p>
    </div>
  );
}
