import { getSanityWriteClient } from "../client";
import { parseYouTubeVideoId } from "./livestream";

const SITE_CONFIG_ID = "siteConfig";

export async function patchSiteLiveFields(fields: {
  isLiveNow?: boolean;
  liveVideoId?: string | null;
  liveStreamUrl?: string | null;
}): Promise<void> {
  const client = getSanityWriteClient();
  const set: Record<string, unknown> = {};
  if (fields.isLiveNow !== undefined) set.isLiveNow = fields.isLiveNow;
  if (fields.liveVideoId !== undefined) set.liveVideoId = fields.liveVideoId ?? "";
  if (fields.liveStreamUrl !== undefined) set.liveStreamUrl = fields.liveStreamUrl ?? "";

  await client.patch(SITE_CONFIG_ID).set(set).commit();
}

export async function goLiveInSanity(videoInput: string): Promise<string | null> {
  const videoId = parseYouTubeVideoId(videoInput);
  const streamUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : videoInput.trim();

  await patchSiteLiveFields({
    isLiveNow: true,
    liveVideoId: videoId ?? videoInput.trim(),
    liveStreamUrl: streamUrl,
  });

  return videoId;
}

export async function endLiveInSanity(): Promise<void> {
  await patchSiteLiveFields({ isLiveNow: false });
}
