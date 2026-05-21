import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PrayerForm } from "@/components/forms/PrayerForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("prayer");
  return { title: t("page_title"), description: t("page_desc") };
}

export default async function PrayerPage() {
  const t = await getTranslations("prayer");

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Container className="max-w-xl py-12">
        <PrayerForm
          labels={{
            public: t("public"),
            private: t("private"),
            nameOptional: t("name_optional"),
            share: t("share"),
            submit: t("submit"),
            success: t("success"),
          }}
        />
      </Container>
    </>
  );
}
