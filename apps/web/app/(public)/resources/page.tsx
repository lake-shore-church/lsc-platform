import type { Metadata } from "next";
import { getPage } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";

export const metadata: Metadata = {
  title: "Resources",
  description: "Documents, guides, and resources from Lake Shore Church.",
};

const publicDocs = [
  { title: "New here guide", href: "/visit", memberOnly: false },
  { title: "Statement of faith", href: "/beliefs", memberOnly: false },
];

export default async function ResourcesPage() {
  const page = await getPage("resources").catch(() => null);

  return (
    <>
      <PageHeader title="Resources" description="Helpful documents for your journey." />
      <Container className="py-12">
        <PortableText value={page?.body} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {publicDocs.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              className="rounded-xl border border-default bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase text-brand-accent">
                {doc.memberOnly ? "Members" : "Public"}
              </span>
              <h2 className="mt-2 text-lg font-semibold text-foreground-primary">
                {doc.title}
              </h2>
            </a>
          ))}
        </div>
        <p className="mt-8 text-sm text-foreground-muted">
          Member-only PDFs and study materials will appear here after sign-in is enabled.
        </p>
      </Container>
    </>
  );
}
