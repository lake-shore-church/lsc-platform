"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPublicSiteUrl } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginActionState = { error?: string } | null;

/** Origin embedded in magic-link emails — must match Supabase redirect allow list. */
function getMagicLinkOrigin(headersList: Headers): string {
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "https";

  // Local dev: return to the same host you used on /login.
  if (host && (host.includes("localhost") || host.startsWith("127.0.0.1"))) {
    return `http://${host.replace(/^https?:\/\//, "")}`;
  }

  // Production deploy: always use canonical site URL (Vercel env), not a stray preview host.
  if (process.env.VERCEL === "1") {
    return getPublicSiteUrl();
  }

  const configured =
    process.env.NEXT_PUBLIC_APP_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured?.startsWith("http")) return configured.replace(/\/$/, "");

  if (host) return `${proto}://${host}`;

  return getPublicSiteUrl();
}

export async function sendMagicLink(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const redirectTo = String(formData.get("redirect") ?? "/member/dashboard");

  if (!email) {
    return { error: "Please enter your email address." };
  }

  const headersList = await headers();
  const origin = getMagicLinkOrigin(headersList);
  const supabase = await createSupabaseServerClient();

  // Drop broken/stale sessions so sign-in uses the anon key (not a corrupted Bearer token).
  await supabase.auth.signOut();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("invalid header value") || msg.includes("headers.append")) {
      return {
        error:
          "Sign-in was blocked by a broken browser cookie. Refresh this page, try again, or clear site data for localhost and request a new link.",
      };
    }
    if (msg.includes("rate limit") || msg.includes("too many")) {
      return {
        error:
          "Too many sign-in emails were sent (Supabase rate limit). Wait about 1 hour, then try again — or use a different email for testing. In Supabase Dashboard → Authentication → Rate limits you can raise the limit for development.",
      };
    }
    return { error: error.message };
  }

  redirect(
    `/login?message=check-email&redirect=${encodeURIComponent(redirectTo)}`,
  );
}
