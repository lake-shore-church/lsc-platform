import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getAllStaffBios } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("leaders");
  return { title: t("page_title"), description: t("page_desc") };
}

export default async function LeadersPage() {
  const t = await getTranslations("leaders");
  const bios = await getAllStaffBios().catch(() => []);

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Container className="py-12">
        <p className="max-w-3xl text-base leading-relaxed text-foreground-secondary">
          {t("intro")}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {bios.length ? (
            bios.map((person) => {
              const photoUrl = person.photo ? urlFor(person.photo).width(400).height(400).url() : null;
              return (
                <article
                  key={person._id}
                  className="flex gap-6 rounded-card border border-default bg-surface p-6 shadow-card"
                >
                  {photoUrl ? (
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={photoUrl}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-2xl font-semibold text-brand-primary"
                      aria-hidden
                    >
                      {person.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="font-display text-h3 text-brand-primary">{person.name}</h2>
                    {person.role ? (
                      <p className="text-sm font-semibold text-brand-accent">{person.role}</p>
                    ) : null}
                    {person.bio?.length ? (
                      <div className="mt-3 text-base text-foreground-secondary">
                        <PortableText value={person.bio} />
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })
          ) : (
            <article className="rounded-card border border-default bg-surface p-6 md:col-span-2">
              <h2 className="font-display text-h3 text-brand-primary">{t("pastor_name")}</h2>
              <p className="text-sm font-semibold text-brand-accent">{t("pastor_role")}</p>
              <p className="mt-3 text-base leading-relaxed text-foreground-secondary">
                {t("pastor_bio")}
              </p>
              <Link
                href="/about#pastor"
                className="link-hover mt-4 inline-block font-semibold text-brand-primary"
              >
                {t("about_pastor")} →
              </Link>
            </article>
          )}
        </div>

        <p className="mt-12 text-foreground-secondary">
          {t("serve_note")}{" "}
          <Link href="/ministries/get-involved" className="link-hover font-semibold text-brand-primary">
            {t("get_involved")}
          </Link>
        </p>
      </Container>
    </>
  );
}
