import { getSupabase, type TypedSupabaseClient } from "../client";
import type { SermonWithSeries } from "../types";

const SERMON_SELECT = `
  *,
  sermon_series (*),
  pastor:pastor_id (id, full_name, avatar_url)
`;

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

/** Published sermons, newest first. */
export async function getSermons(
  options?: { limit?: number },
  db?: TypedSupabaseClient,
): Promise<SermonWithSeries[]> {
  const supabase = client(db);
  const now = new Date().toISOString();

  let query = supabase
    .from("sermons")
    .select(SERMON_SELECT)
    .not("published_at", "is", null)
    .lte("published_at", now)
    .order("published_at", { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data ?? []) as SermonWithSeries[];
}

/** Single published sermon by slug. */
export async function getSermonBySlug(
  slug: string,
  db?: TypedSupabaseClient,
): Promise<SermonWithSeries | null> {
  const supabase = client(db);
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("sermons")
    .select(SERMON_SELECT)
    .eq("slug", slug)
    .not("published_at", "is", null)
    .lte("published_at", now)
    .maybeSingle();

  if (error) throw error;
  return data as SermonWithSeries | null;
}

/** Published sermons in a series, newest first. */
export async function getSermonsBySeries(
  seriesId: string,
  options?: { limit?: number },
  db?: TypedSupabaseClient,
): Promise<SermonWithSeries[]> {
  const supabase = client(db);
  const now = new Date().toISOString();

  let query = supabase
    .from("sermons")
    .select(SERMON_SELECT)
    .eq("series_id", seriesId)
    .not("published_at", "is", null)
    .lte("published_at", now)
    .order("published_at", { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data ?? []) as SermonWithSeries[];
}
