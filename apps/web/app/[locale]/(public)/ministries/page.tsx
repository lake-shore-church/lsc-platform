import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getMinistryPages } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { MinistryCard } from "@/components/ministries/MinistryCard";
import {
  MINISTRY_CATEGORY_LABELS,
  MINISTRY_CATEGORY_ORDER,
} from "@/lib/ministryCategories";
import { getFallbackMinistries } from "@/lib/ministriesFallback";
import type { MinistryCategory, MinistryPage } from "@repo/cms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ministries");
  return { title: t("page_title"), description: t("page_desc") };
}

function groupByCategory(pages: MinistryPage[]) {
  const map = new Map<MinistryCategory, MinistryPage[]>();
  for (const cat of MINISTRY_CATEGORY_ORDER) {
    map.set(cat, []);
  }
  for (const page of pages) {
    const list = map.get(page.category) ?? [];
    list.push(page);
    map.set(page.category, list);
  }
  return map;
}

export default async function MinistriesPage() {
  const t = await getTranslations("ministries");
  let ministries = await getMinistryPages().catch(() => [] as MinistryPage[]);
  if (!ministries.length) ministries = getFallbackMinistries();

  const grouped = groupByCategory(ministries);

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Container className="py-12">
        <p className="max-w-3xl text-base leading-relaxed text-foreground-secondary">
          {t("intro")}
        </p>

        {MINISTRY_CATEGORY_ORDER.map((category) => {
          const items = grouped.get(category) ?? [];
          if (!items.length) return null;
          return (
            <section key={category} className="mt-14">
              <h2 className="font-display text-h2 text-brand-primary">
                {MINISTRY_CATEGORY_LABELS[category]}
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((ministry) => (
                  <MinistryCard key={ministry._id} ministry={ministry} />
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
