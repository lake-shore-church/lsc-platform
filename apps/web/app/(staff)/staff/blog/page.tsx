import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPostsForStaff } from "@repo/db";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog admin",
  robots: { index: false, follow: false },
};

export default async function StaffBlogPage() {
  await requireStaffPortal();
  const supabase = await createSupabaseServerClient();
  const posts = await getAllBlogPostsForStaff(supabase).catch(() => []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-h2 text-brand-primary">Blog</h1>
        <Link
          href="/studio"
          className="inline-flex min-h-[44px] items-center rounded-md bg-brand-primary px-5 font-semibold text-white"
        >
          Create in Studio
        </Link>
      </div>
      <p className="mt-2 text-sm text-foreground-secondary">
        Public blog posts are edited in Sanity Studio. Supabase blog_posts table is listed
        here when used.
      </p>
      <ul className="mt-8 space-y-3">
        {posts.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap justify-between gap-2 rounded-card border border-default bg-surface px-4 py-3"
          >
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-foreground-muted">
                {p.published_at
                  ? `Published ${new Date(p.published_at).toLocaleDateString()}`
                  : "Draft"}
                {p.email_sent ? " · Email sent" : ""}
              </p>
            </div>
            {p.slug ? (
              <Link href={`/blog/${p.slug}`} className="text-sm text-brand-primary">
                View
              </Link>
            ) : null}
          </li>
        ))}
        {posts.length === 0 ? (
          <li className="text-foreground-muted">
            No rows in blog_posts — use{" "}
            <Link href="/studio" className="text-brand-primary">
              Sanity Studio
            </Link>{" "}
            for the live blog.
          </li>
        ) : null}
      </ul>
    </>
  );
}
