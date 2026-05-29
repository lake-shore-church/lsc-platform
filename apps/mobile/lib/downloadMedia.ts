import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { isDownloadableMediaUrl } from "./video";

/**
 * Optional download — user-initiated only (saves to cache, opens share sheet).
 * HLS/live streams are not downloaded (too large; use stream-only).
 */
export async function downloadMediaToDevice(
  url: string,
  filename: string,
): Promise<void> {
  if (!isDownloadableMediaUrl(url)) {
    Alert.alert(
      "Download unavailable",
      "This video streams online only. When Pastor uploads MP4 files to our media library, download will be available here.",
    );
    return;
  }

  const dest = `${FileSystem.cacheDirectory ?? ""}${filename}`;
  if (!FileSystem.cacheDirectory) {
    Alert.alert("Error", "Storage is not available on this device.");
    return;
  }

  try {
    const result = await FileSystem.downloadAsync(url, dest);
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Saved", `File saved to: ${result.uri}`);
      return;
    }
    await Sharing.shareAsync(result.uri);
  } catch {
    Alert.alert("Download failed", "Check your connection and try again.");
  }
}
