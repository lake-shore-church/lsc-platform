import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts, getAllBlogSlugs } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/format";
import { slugValue } from "@/lib/sanity";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs().catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const allPosts = await getBlogPosts({ limit: 4 }).catch(() => []);
  const related = allPosts.filter((p) => slugValue(p.slug) !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    author: post.author?.name,
    url: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Container className="py-10 max-w-3xl">
        <p className="text-sm text-foreground-muted">{formatDate(post.publishedAt)}</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-primary">{post.title}</h1>
        {post.author?.name ? (
          <p className="mt-2 text-foreground-secondary">By {post.author.name}</p>
        ) : null}
        <div className="mt-8">
          <PortableText value={post.content} />
        </div>
        {related.length ? (
          <section className="mt-12 border-t border-default pt-8">
            <h2 className="text-lg font-bold text-brand-primary">Related posts</h2>
            <ul className="mt-4 space-y-2">
              {related.map((p) => (
                <li key={p._id}>
                  <Link href={`/blog/${slugValue(p.slug)}`} className="text-brand-accent hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </>
  );
}
