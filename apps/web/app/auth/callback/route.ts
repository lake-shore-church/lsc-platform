import { NextResponse } from "next/server";
import { createSupabaseRouteHandlerClient } from "@/lib/supabase/route-handler";

const EMAIL_OTP_TYPES = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
] as const;

type EmailOtpType = (typeof EMAIL_OTP_TYPES)[number];

function isEmailOtpType(value: string): value is EmailOtpType {
  return (EMAIL_OTP_TYPES as readonly string[]).includes(value);
}

function safeRedirectPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/member/dashboard";
  }
  return value;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const authError = searchParams.get("error");
  const authErrorDescription = searchParams.get("error_description");
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const typeParam = searchParams.get("type");
  const type = typeParam && isEmailOtpType(typeParam) ? typeParam : null;
  const redirect = safeRedirectPath(
    searchParams.get("redirect") ?? searchParams.get("next"),
  );

  if (authError) {
    const login = new URL("/login", origin);
    login.searchParams.set("message", "auth-error");
    login.searchParams.set("redirect", redirect);
    if (authErrorDescription) {
      login.searchParams.set("detail", authErrorDescription.slice(0, 200));
    }
    return NextResponse.redirect(login);
  }

  if (!code && !(token_hash && type)) {
    return NextResponse.redirect(`${origin}/login?message=sign-in`);
  }

  const response = NextResponse.redirect(`${origin}${redirect}`);
  const supabase = await createSupabaseRouteHandlerClient(response);

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({ token_hash: token_hash!, type: type! });

  if (error) {
    const login = new URL("/login", origin);
    login.searchParams.set("message", "auth-error");
    login.searchParams.set("redirect", redirect);
    return NextResponse.redirect(login);
  }

  return response;
}
