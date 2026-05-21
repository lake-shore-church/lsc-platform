"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PresentationState } from "@repo/db";
import { PRESENTATION_SESSION_ID } from "@/lib/presentation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  sermonSlug: string;
  slideUrls: string[];
};

/**
 * When Presenter Mode is active for this sermon, online viewers see the same slide.
 */
export function PresentationSync({ sermonSlug, slideUrls }: Props) {
  const [active, setActive] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const load = async () => {
      const { data: row } = await supabase
        .from("presentation_state")
        .select("sermon_id, current_slide, is_active")
        .eq("id", PRESENTATION_SESSION_ID)
        .maybeSingle();
      const data = row as Pick<
        PresentationState,
        "sermon_id" | "current_slide" | "is_active"
      > | null;
      if (data?.is_active && data.sermon_id === sermonSlug) {
        setActive(true);
        setSlideIndex(data.current_slide ?? 0);
      } else {
        setActive(false);
      }
    };

    void load();

    const channel = supabase
      .channel("web-presentation")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "presentation_state",
          filter: `id=eq.${PRESENTATION_SESSION_ID}`,
        },
        (payload) => {
          const row = payload.new as {
            sermon_id?: string;
            current_slide?: number;
            is_active?: boolean;
          };
          if (row.is_active && row.sermon_id === sermonSlug) {
            setActive(true);
            setSlideIndex(row.current_slide ?? 0);
          } else {
            setActive(false);
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [sermonSlug]);

  if (!active || !slideUrls.length) return null;

  const url = slideUrls[Math.min(slideIndex, slideUrls.length - 1)];
  if (!url) return null;

  return (
    <section
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      aria-label="Live presentation slides"
    >
      <Image
        src={url}
        alt=""
        fill
        className="object-contain"
        sizes="100vw"
        priority
      />
      <p className="absolute bottom-4 left-4 rounded bg-black/60 px-3 py-1 text-sm text-white">
        Live slides · {slideIndex + 1} / {slideUrls.length}
      </p>
    </section>
  );
}
