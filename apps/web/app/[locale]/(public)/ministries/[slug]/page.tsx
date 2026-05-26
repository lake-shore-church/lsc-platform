import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getMinistryPageBySlug, getAllMinistrySlugs } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MinistryInfoPanel } from "@/components/ministries/MinistryInfoPanel";
import { getFallbackMinistryBySlug } from "@/lib/ministriesFallback";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await getAllMinistrySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page =
    (await getMinistryPageBySlug(slug).catch(() => null)) ??
    getFallbackMinistryBySlug(slug);
  if (!page) return { title: "Ministry" };
  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? page.summary,
  };
}

export default async function MinistryDetailPage({ params }: Props) {
  const { slug } = await params;
  const page =
    (await getMinistryPageBySlug(slug).catch(() => null)) ??
    getFallbackMinistryBySlug(slug);

  if (!page) notFound();

  if (page.canonicalPath && page.canonicalPath !== `/ministries/${slug}`) {
    redirect(page.canonicalPath);
  }

  return (
    <>
      <MinistryHero
        title={page.title}
        summary={page.summary}
        heroImageUrl={page.heroImageUrl}
        imageAlt={page.imageAlt}
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {page.body?.length ? (
            <div className="prose-church">
              <PortableText value={page.body} />
            </div>
          ) : null}
          <p className="mt-10">
            <Link href="/ministries" className="link-hover font-semibold text-brand-primary">
              ← All ministries
            </Link>
          </p>
        </div>
        <MinistryInfoPanel {...page} />
      </Container>
    </>
  );
}
