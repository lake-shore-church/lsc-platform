import type { Metadata } from "next";
import Link from "next/link";
import { getResources } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Resources",
  description: "Books, guides, and resources from Lake Shore Church.",
};

const publicDocs = [
  { title: "New here guide", href: "/visit", memberOnly: false },
  { title: "Statement of faith", href: "/beliefs", memberOnly: false },
];

export default async function ResourcesPage() {
  const resources = await getResources({ publicOnly: true }).catch(() => []);

  return (
    <>
      <PageHeader title="Resources" description="Helpful documents for your journey." />
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
              <span className="text-xs font-semibold uppercase text-brand-accent">Public</span>
              <h2 className="mt-2 text-lg font-semibold text-foreground-primary">{doc.title}</h2>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
