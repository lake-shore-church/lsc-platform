import Link from "next/link";
import type { Sermon } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { youtubeEmbedUrl } from "@/lib/format";

export function LatestSermonSection({ sermon }: { sermon: Sermon | null }) {
  if (!sermon) {
    return null;
  }

  const embed = youtubeEmbedUrl(sermon.videoUrl);
  const title = sermon.title;
  const pastor = sermon.pastor?.name;
  const scripture = sermon.scripture;

  return (
    <section className="section-pad bg-brand-primary text-white">
      <Container>
        <p className="text-label text-white/80">Sunday&apos;s message</p>
        <h2 className="mt-2 font-display text-h2 leading-heading text-white">{title}</h2>
        {(pastor || scripture) && (
          <p className="mt-3 text-base leading-relaxed text-white/85">
            {[pastor, scripture].filter(Boolean).join(" · ")}
          </p>
        )}

        {embed ? (
          <div className="mt-8 aspect-video overflow-hidden rounded-card shadow-card">
            <iframe
              title={title}
              src={embed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}

        <Link
          href="/sermons"
          className="link-hover mt-6 inline-block text-base font-semibold text-brand-accent"
        >
          View all sermons
        </Link>
      </Container>
    </section>
  );
}
