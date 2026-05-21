import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "What We Believe",
  description:
    "Find inerrant truth from Scripture in a world of confusion — the statement of faith of Lake Shore Church.",
};

const BELIEFS = [
  "We believe the Bible is the inspired, inerrant Word of God — our ultimate authority for faith and life.",
  "We believe in one God — Father, Son, and Holy Spirit.",
  "We believe Jesus Christ is the Son of God, who died for our sins and rose bodily from the dead.",
  "God raised Jesus from the dead. There is hope for all who follow him.",
  "We believe salvation is by grace alone, through faith alone, in Christ alone.",
  "We believe the church is called to make disciples of all nations, beginning in our own neighbourhood — the West Loop of Chicago.",
] as const;

const FAQ = [
  {
    question: "What does Lake Shore Church believe?",
    answer:
      "We hold to scripture-based, Assemblies of God theology — the Bible as our authority, the Trinity, the bodily resurrection of Jesus, salvation by grace through faith, and the mission of the church to make disciples.",
  },
  {
    question: "Is Lake Shore Church welcoming to newcomers?",
    answer:
      "Yes — everyone is welcome wherever they are on their journey of faith.",
  },
  {
    question: "What denomination is Lake Shore Church?",
    answer: "Lake Shore Church is part of the Assemblies of God.",
  },
] as const;

export default function BeliefsPage() {
  return (
    <>
      <PageHeader
        title="What We Believe"
        description="Find inerrant truth from Scripture in a world of confusion."
      />
      <Container className="max-w-3xl py-12">
        <ul className="space-y-4">
          {BELIEFS.map((belief) => (
            <li
              key={belief}
              className="border-l-4 border-brand-accent pl-4 text-base leading-relaxed text-foreground-primary"
            >
              {belief}
            </li>
          ))}
        </ul>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
    </>
  );
}
