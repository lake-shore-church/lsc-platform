import * as Linking from "expo-linking";
import { Platform } from "react-native";

/**
 * Redirect URL for Supabase magic links — must match an entry in
 * Supabase → Auth → Redirect URLs exactly.
 */
export function getMobileAuthRedirectUrl(): string {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.origin}/auth/callback`;
  }
  return Linking.createURL("auth/callback");
}
