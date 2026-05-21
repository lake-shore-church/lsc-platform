import type { AuthError } from "@supabase/supabase-js";
import { getMobileSupabase } from "./supabase";
import { parseAuthCallbackUrl } from "./parseAuthCallbackUrl";

const EMAIL_OTP_TYPES = new Set([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]);

export async function completeAuthFromUrl(url: string): Promise<{ error: AuthError | Error | null }> {
  const params = parseAuthCallbackUrl(url);
  const supabase = getMobileSupabase();

  if (params.error) {
    return {
      error: new Error(params.error_description || params.error || "Sign-in failed"),
    };
  }

  if (params.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(params.code);
    return { error };
  }

  if (params.access_token && params.refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token: params.access_token,
      refresh_token: params.refresh_token,
    });
    return { error };
  }

  if (params.token_hash && params.type && EMAIL_OTP_TYPES.has(params.type)) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: params.token_hash,
      type: params.type as "email" | "magiclink",
    });
    return { error };
  }

  return { error: new Error("Invalid auth link — open the email link on this device in Expo Go.") };
}
