/** True for HLS streams (Mux live/VOD). */
export function isHlsUrl(url?: string | null): boolean {
  if (!url?.trim()) return false;
  return /\.m3u8(\?|$)/i.test(url.trim());
}

/** Direct file the app can download (MP4/M4A/MP3 on our CDN). */
export function isDownloadableMediaUrl(url?: string | null): boolean {
  if (!url?.trim()) return false;
  const u = url.trim().toLowerCase();
  if (isHlsUrl(u)) return false;
  if (/youtube\.com|youtu\.be|facebook\.com|vimeo\.com/.test(u)) return false;
  return /\.(mp4|m4a|mp3|mov)(\?|$)/i.test(u) || u.includes("media.lschurch.com");
}

export function youtubeEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (!match?.[1]) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

export function pickVideoSource(url?: string | null): "hls" | "youtube" | "direct" | null {
  if (!url?.trim()) return null;
  if (isHlsUrl(url)) return "hls";
  if (youtubeEmbedUrl(url)) return "youtube";
  if (/^https?:\/\//i.test(url)) return "direct";
  return null;
}
