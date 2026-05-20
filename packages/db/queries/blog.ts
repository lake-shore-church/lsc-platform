import { getSupabase, type TypedSupabaseClient } from "../client";
import type { BlogPost } from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

const BLOG_SELECT = `
  *,
  author:author_id (id, full_name, avatar_url)
`;

export type BlogPostWithAuthor = BlogPost & {
  author: { id: string; full_name: string | null; avatar_url: string | null } | null;
};

/** Published blog posts, newest first. */
export async function getBlogPosts(
  options?: { limit?: number },
  db?: TypedSupabaseClient,
): Promise<BlogPostWithAuthor[]> {
  const supabase = client(db);
  const now = new Date().toISOString();

  let query = supabase
    .from("blog_posts")
    .select(BLOG_SELECT)
    .not("published_at", "is", null)
    .lte("published_at", now)
    .order("published_at", { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data ?? []) as BlogPostWithAuthor[];
}

/** Single published blog post by slug. */
export async function getBlogPostBySlug(
  slug: string,
  db?: TypedSupabaseClient,
): Promise<BlogPostWithAuthor | null> {
  const supabase = client(db);
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("slug", slug)
    .not("published_at", "is", null)
    .lte("published_at", now)
    .maybeSingle();

  if (error) throw error;
  return data as BlogPostWithAuthor | null;
}
