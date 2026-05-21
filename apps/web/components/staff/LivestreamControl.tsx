"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  isLiveNow: boolean;
  liveVideoId?: string;
};

export function LivestreamControl({ isLiveNow, liveVideoId }: Props) {
  const router = useRouter();
  const [videoInput, setVideoInput] = useState(liveVideoId ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function goLive() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/go-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: videoInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to go live");
    } finally {
      setBusy(false);
    }
  }

  async function endLive() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/end-live", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to end stream");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl border-2 border-brand-accent/30 bg-surface p-6">
      <h2 className="font-display text-h3 text-brand-primary">Livestream control</h2>
      <p className="mt-2 text-sm text-foreground-secondary">
        Toggle live on the website and app. Also update Sanity Site Config if you
        prefer Studio. Push notifications send when OneSignal keys are configured.
      </p>

      {isLiveNow ? (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-700 px-3 py-1 text-sm font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-white" />
            Currently live
          </span>
          {liveVideoId ? (
            <span className="text-sm text-foreground-muted">Video: {liveVideoId}</span>
          ) : null}
          <button
            type="button"
            onClick={() => void endLive()}
            disabled={busy}
            className="min-h-[44px] rounded-md border border-red-600 px-5 font-semibold text-red-700 disabled:opacity-50"
          >
            End stream
          </button>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm">
            <span className="font-semibold text-brand-primary">
              YouTube video ID or URL
            </span>
            <input
              type="text"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              placeholder="dQw4w9WgXcQ or full YouTube URL"
              className="mt-1 w-full rounded-md border border-default px-3 py-2"
            />
          </label>
          <button
            type="button"
            onClick={() => void goLive()}
            disabled={busy || !videoInput.trim()}
            className="min-h-[44px] rounded-md bg-red-600 px-6 font-semibold text-white disabled:opacity-50"
          >
            Go live
          </button>
        </div>
      )}

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </section>
  );
}
