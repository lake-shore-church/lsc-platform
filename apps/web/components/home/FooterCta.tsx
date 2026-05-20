import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function FooterCta() {
  return (
    <section className="section-pad bg-brand-primary text-white">
      <Container className="text-center">
        <h2 className="font-display text-h2">Ready to take the next step?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-sm font-bold text-white hover:opacity-90"
          >
            Plan a Visit
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center rounded-card border-2 border-white px-8 text-sm font-bold text-white hover:bg-white/15"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}
