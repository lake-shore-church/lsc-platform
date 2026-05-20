import Link from "next/link";
import type { Sermon } from "@repo/cms";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";
import { youtubeEmbedUrl } from "@/lib/format";

export function LatestSermonSection({ sermon }: { sermon: Sermon | null }) {
  const embed = sermon ? youtubeEmbedUrl(sermon.videoUrl) : null;
  const title = sermon?.title ?? "Watch our latest message";
  const pastor = sermon?.pastor?.name ?? "Pastor Brian";
  const scripture = sermon?.scripture ?? "Scripture-based teaching every Sunday";

  return (
    <section className="section-pad bg-brand-primary text-white">
      <Container>
        <p className="text-label text-white/70">Sunday&apos;s message</p>
        <h2 className="mt-2 font-display text-h2 leading-heading text-white">{title}</h2>
        <p className="mt-3 text-lg leading-relaxed text-white/85">
          {pastor}
          {scripture ? ` · ${scripture}` : null}
        </p>

        <div className="mt-8 aspect-video overflow-hidden rounded-card shadow-card">
          {embed ? (
            <iframe
              title={title}
              src={embed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-surface-2 bg-cover bg-center"
              style={{ backgroundImage: `url(${IMAGES.worship})` }}
            >
              <Link
                href="/sermons"
                className="rounded-card bg-brand-accent px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                Browse sermons
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/sermons"
          className="mt-6 inline-block text-sm font-semibold text-brand-accent hover:underline"
        >
          View all sermons →
        </Link>
      </Container>
    </section>
  );
}
