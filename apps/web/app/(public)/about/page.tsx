import type { Metadata } from "next";
import Image from "next/image";
import { getAllStaffBios, getPage } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team and story of Lake Shore Church in Chicago's West Loop.",
};

export default async function AboutPage() {
  const [page, staff] = await Promise.all([
    getPage("about").catch(() => null),
    getAllStaffBios().catch(() => []),
  ]);

  return (
    <>
      <PageHeader title="About us" description={page?.seoDescription ?? "Our story, team, and vision."} />
      <Container className="py-12">
        <PortableText value={page?.body} />
        <h2 className="mt-12 text-2xl font-bold text-brand-primary">Our team</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((person) => {
            const photoUrl = person.photo
              ? urlFor(person.photo).width(400).height(400).url()
              : null;
            return (
              <article key={person._id} className="text-center">
                {photoUrl ? (
                  <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                    <Image src={photoUrl} alt="" fill className="object-cover" sizes="160px" />
                  </div>
                ) : (
                  <div className="mx-auto h-40 w-40 rounded-full bg-surface-2" />
                )}
                <h3 className="mt-4 text-lg font-semibold">{person.name}</h3>
                {person.role ? <p className="text-sm text-brand-accent">{person.role}</p> : null}
              </article>
            );
          })}
        </div>
      </Container>
    </>
  );
}
