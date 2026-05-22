import * as Linking from "expo-linking";
import { Platform } from "react-native";

/** URL that landed on the auth callback (web hash/query or native deep link). */
export async function getAuthCallbackUrl(): Promise<string | null> {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    const href = window.location.href;
    if (
      href.includes("access_token=") ||
      href.includes("code=") ||
      href.includes("token_hash=") ||
      href.includes("error=")
    ) {
      return href;
    }
  }

  return Linking.getInitialURL();
}
