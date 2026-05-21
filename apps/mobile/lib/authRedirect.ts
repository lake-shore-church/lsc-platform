import * as Linking from "expo-linking";

/** Redirect URL sent to Supabase — must be listed in Auth → Redirect URLs exactly. */
export function getMobileAuthRedirectUrl(): string {
  return Linking.createURL("auth/callback");
}
