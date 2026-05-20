import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database, TypedSupabaseClient } from "@repo/db";
import { getSupabasePublicEnv } from "./env";

export async function createSupabaseServerClient(): Promise<TypedSupabaseClient> {
  const { url, anonKey } = getSupabasePublicEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from Server Component — middleware will refresh session
        }
      },
    },
  }) as unknown as TypedSupabaseClient;
}
