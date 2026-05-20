import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

const STAFF_ROLES = new Set(["staff", "admin"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabase, response } = createSupabaseMiddlewareClient(request);

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
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
