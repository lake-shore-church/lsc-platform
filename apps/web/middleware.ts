import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const STAFF_ROLES = new Set(["staff", "admin"]);

/** Paths that stay outside locale routing. */
const NON_LOCALIZED = [
  "/api",
  "/auth",
  "/login",
  "/member",
  "/staff",
  "/studio",
  "/platform",
  "/podcast.xml",
  "/OneSignalSDKWorker.js",
  "/OneSignalSDKUpdaterWorker.js",
];

function isNonLocalized(pathname: string): boolean {
  return NON_LOCALIZED.some((prefix) => pathname.startsWith(prefix));
}

function mergeSupabaseCookies(source: NextResponse, target: NextResponse): NextResponse {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie.name, cookie.value);
  });
  return target;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabase, response: supabaseResponse } = createSupabaseMiddlewareClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname.startsWith("/member") || pathname.startsWith("/staff")) {
    if (!user) {
      const login = new URL("/login", request.url);
      login.searchParams.set("redirect", pathname);
      return NextResponse.redirect(login);
    }

    if (pathname.startsWith("/staff")) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle<{ role: string }>();

      if (!profile?.role || !STAFF_ROLES.has(profile.role)) {
        const login = new URL("/login", request.url);
        login.searchParams.set("message", "staff-only");
        login.searchParams.set("redirect", pathname);
        return NextResponse.redirect(login);
      }
    }

    return supabaseResponse;
  }

  if (isNonLocalized(pathname)) {
    return supabaseResponse;
  }

  const intlResponse = intlMiddleware(request);
  return mergeSupabaseCookies(supabaseResponse, intlResponse);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|OneSignalSDKWorker\\.js|OneSignalSDKUpdaterWorker\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
