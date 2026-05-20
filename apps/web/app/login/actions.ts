"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginActionState = { error?: string } | null;

function getOrigin(headersList: Headers): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured?.startsWith("http")) return configured.replace(/\/$/, "");

  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`;

  return "http://localhost:3000";
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
  const origin = getOrigin(headersList);
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(
    `/login?message=check-email&redirect=${encodeURIComponent(redirectTo)}`,
  );
}
