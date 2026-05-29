"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
};

/** HLS (.m3u8) for in-house / Mux live on web (Chrome via hls.js; Safari native). */
export function HlsLivePlayer({ src, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    let hls: { destroy: () => void } | null = null;
    let destroyed = false;

    void import("hls.js").then((mod) => {
      if (destroyed) return;
      const Hls = mod.default;
      if (Hls.isSupported()) {
        const instance = new Hls();
        instance.loadSource(src);
        instance.attachMedia(video);
        hls = instance;
      } else {
        video.src = src;
      }
    });

    return () => {
      destroyed = true;
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      playsInline
      title="Live stream"
    />
  );
}
