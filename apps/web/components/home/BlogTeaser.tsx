import Link from "next/link";
import type { BlogPost } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { formatDate } from "@/lib/format";
import { slugValue } from "@/lib/sanity";

export function BlogTeaser({ posts }: { posts: BlogPost[] }) {
  const display = posts.slice(0, 2);

  return (
    <section className="section-pad border-t border-default bg-surface">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-h2 text-brand-primary">From the blog</h2>
          <TextLink href="/blog" className="text-base">
            Read all posts
          </TextLink>
        </div>
        {display.length === 0 ? (
          <p className="mt-6 text-foreground-muted">New posts coming soon.</p>
        ) : (
          <ul className="mt-8 grid gap-8 md:grid-cols-2">
            {display.map((post) => (
              <li key={post._id} className="rounded-card border border-default bg-background p-6 shadow-card">
                <p className="text-base text-foreground-muted">{formatDate(post.publishedAt)}</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground-primary">
                  <Link
                    href={`/blog/${slugValue(post.slug)}`}
                    className="link-hover hover:text-brand-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-foreground-secondary">{post.excerpt}</p>
                ) : null}
                <TextLink
                  href={`/blog/${slugValue(post.slug)}`}
                  className="mt-4 inline-block text-base text-brand-accent"
                >
                  Read more
                </TextLink>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
