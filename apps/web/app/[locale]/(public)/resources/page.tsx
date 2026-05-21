import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getResources } from "@repo/cms";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function ResourcesPage() {
  const t = await getTranslations("resources");
  const tNav = await getTranslations("nav");
  const resources = await getResources({ publicOnly: true }).catch(() => []);

  const publicDocs = [
    { title: tNav("visit"), href: "/visit" as const },
    { title: tNav("beliefs"), href: "/beliefs" as const },
  ];

  return (
    <>
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((resource) => (
            <a
              key={resource._id}
              href={resource.externalUrl ?? "#"}
              target={resource.externalUrl ? "_blank" : undefined}
              rel={resource.externalUrl ? "noopener noreferrer" : undefined}
              className="rounded-xl border border-default bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase text-brand-accent">
                {resource.type ?? "Resource"}
              </span>
              <h2 className="mt-2 text-lg font-semibold text-foreground-primary">
                {resource.title}
              </h2>
              {resource.description ? (
                <p className="mt-2 text-sm text-foreground-secondary">{resource.description}</p>
              ) : null}
            </a>
          ))}
          {publicDocs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="rounded-xl border border-default bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase text-brand-accent">{t("public")}</span>
              <h2 className="mt-2 text-lg font-semibold text-foreground-primary">{doc.title}</h2>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
