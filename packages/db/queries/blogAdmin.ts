import { getSupabase, type TypedSupabaseClient } from "../client";
import type { BlogPost } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

/** All blog posts for staff (drafts + published). */
export async function getAllBlogPostsForStaff(
  db?: TypedSupabaseClient,
): Promise<BlogPost[]> {
  const supabase = client(db);
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function setBlogEmailSent(
  id: string,
  db?: TypedSupabaseClient,
): Promise<void> {
  const supabase = client(db);
  const { error } = await supabase
    .from("blog_posts")
    .update({ email_sent: true })
    .eq("id", id);
  if (error) throw error;
}

export async function unpublishBlogPost(
  id: string,
  db?: TypedSupabaseClient,
): Promise<void> {
  const supabase = client(db);
  const { error } = await supabase
    .from("blog_posts")
    .update({ published_at: null })
    .eq("id", id);
  if (error) throw error;
}
