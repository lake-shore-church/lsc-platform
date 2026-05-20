import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import type { Database, TypedSupabaseClient } from "@repo/db";
import { getSupabasePublicEnv } from "./env";

/**
 * Supabase client for Route Handlers that must set session cookies on a
 * redirect response (e.g. /auth/callback). The server-only cookie helper
 * alone does not attach cookies to NextResponse.redirect().
 */
export async function createSupabaseRouteHandlerClient(
  response: NextResponse,
): Promise<TypedSupabaseClient> {
  const { url, anonKey } = getSupabasePublicEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
          response.cookies.set(name, value, options);
        });
      },
    },
  }) as unknown as TypedSupabaseClient;
}
