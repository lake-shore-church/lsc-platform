import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function FooterCtaBanner() {
  return (
    <section className="bg-[#1B4F8A] py-16 text-white">
      <Container className="text-center">
        <h2 className="font-display text-h2">Ready to take your next step?</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/90">
          Join us this Sunday at 10:00 AM. Everyone is welcome.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-base font-semibold text-white hover:opacity-90"
          >
            Plan a Visit
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center rounded-card border-2 border-white px-8 text-base font-semibold text-white hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}
