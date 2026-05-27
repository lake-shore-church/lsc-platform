import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getAllStaffBios } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { Link } from "@/i18n/navigation";
import { PastorLeaderCard } from "@/components/about/PastorLeaderCard";
import { PASTOR_PHOTO_SRC } from "@/lib/pastorBioContent";
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
              const slug = person.slug?.current ?? "";
              const isPastor =
                slug === "pastor-brian" || person.name.toLowerCase().includes("larson");
              const photoUrl = person.photo
                ? urlFor(person.photo).width(400).height(400).url()
                : isPastor
                  ? PASTOR_PHOTO_SRC
                  : null;
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
            <PastorLeaderCard
              name={t("pastor_name")}
              role={t("pastor_role")}
              summary={t("pastor_bio")}
              moreLabel={t("about_pastor")}
            />
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
