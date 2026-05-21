import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@repo/cms";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { formatDate } from "@/lib/format";
import { slugValue, urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const posts = await getBlogPosts().catch(() => []);

  return (
    <>
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="py-12">
        <div className="mb-10 rounded-xl border border-default bg-surface p-6">
          <h2 className="font-semibold text-brand-primary">{t("email_heading")}</h2>
          <p className="mt-1 text-sm text-foreground-muted">{t("email_sub")}</p>
          <div className="mt-4">
            <SubscribeForm />
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const slug = slugValue(post.slug);
            const img = post.featuredImage
              ? urlFor(post.featuredImage).width(600).height(340).url()
              : null;
            return (
              <article key={post._id} className="overflow-hidden rounded-xl border border-default bg-surface">
                {img ? (
                  <div className="relative aspect-video">
                    <Image src={img} alt="" fill className="object-cover" sizes="33vw" />
                  </div>
                ) : null}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    <Link href={`/blog/${slug}`} className="hover:text-brand-primary">
                      {post.title}
                    </Link>
                  </h2>
                  {post.author?.name ? (
                    <p className="text-sm text-foreground-muted">{post.author.name}</p>
                  ) : null}
                  <p className="mt-2 text-sm text-foreground-secondary line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="mt-2 text-xs text-foreground-muted">{formatDate(post.publishedAt)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </>
  );
}
