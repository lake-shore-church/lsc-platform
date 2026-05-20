import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PrayerForm } from "@/components/forms/PrayerForm";

export const metadata: Metadata = {
  title: "Prayer",
  description: "Submit a prayer request to Lake Shore Church.",
};

export default function PrayerPage() {
  return (
    <>
      <PageHeader
        title="Prayer requests"
        description="We would be honored to pray with you."
      />
      <Container className="py-12 max-w-xl">
        <PrayerForm />
      </Container>
    </>
  );
}
