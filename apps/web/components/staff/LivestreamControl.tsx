"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  isLiveNow: boolean;
  liveVideoId?: string;
  streamMode?: "inhouse" | "youtube";
  livePlaybackUrl?: string;
};

export function LivestreamControl({
  isLiveNow,
  liveVideoId,
  streamMode = "youtube",
  livePlaybackUrl,
}: Props) {
  const router = useRouter();
  const [videoInput, setVideoInput] = useState(liveVideoId ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inhouse = streamMode === "inhouse" && Boolean(livePlaybackUrl?.trim());

  async function goLive() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/go-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          inhouse && !videoInput.trim() ? {} : { videoId: videoInput },
        ),
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
        Toggle live on the website and mobile app. Default ($0): start Mevo → YouTube, paste
        the YouTube video ID here — members watch inside our app, not on YouTube.com. Push
        notifications send when OneSignal keys are configured.
      </p>

      {inhouse ? (
        <p className="mt-3 rounded-md bg-brand-primary/10 px-3 py-2 text-sm text-brand-primary">
          <strong>In-house mode.</strong> Start Mevo streaming first, then click Go live —
          no YouTube ID needed. Playback:{" "}
          <span className="break-all font-mono text-xs">{livePlaybackUrl}</span>
        </p>
      ) : null}

      {isLiveNow ? (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-700 px-3 py-1 text-sm font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-white" />
            Currently live
          </span>
          {liveVideoId ? (
            <span className="text-sm text-foreground-muted">Video: {liveVideoId}</span>
          ) : inhouse ? (
            <span className="text-sm text-foreground-muted">In-house HLS</span>
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
          {!inhouse ? (
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
          ) : null}
          <button
            type="button"
            onClick={() => void goLive()}
            disabled={busy || (!inhouse && !videoInput.trim())}
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
