"use client";

export function SermonPlayer({
  videoUrl,
  audioUrl,
}: {
  videoUrl: string | null;
  audioUrl?: string | null;
}) {
  if (!videoUrl) {
    return (
      <p className="rounded-lg border border-default bg-surface p-6 text-foreground-muted">
        Video will be available soon.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video overflow-hidden rounded-xl border border-default bg-black">
        <iframe
          src={videoUrl}
          title="Sermon video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {audioUrl ? (
        <a
          href={audioUrl}
          download
          className="inline-flex min-h-[44px] items-center rounded-lg border border-default bg-surface px-4 text-sm font-semibold text-brand-primary hover:bg-surface-2"
        >
          Download audio
        </a>
      ) : null}
    </div>
  );
}
