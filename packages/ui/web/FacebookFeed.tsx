"use client";

import { useEffect, useState } from "react";

const PAGE_URL = "https://www.facebook.com/lschurchchicago";
const EMBED_SRC = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(PAGE_URL)}&tabs=timeline&width=380&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

export function FacebookFeed() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("facebook-jssdk")) return;

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onerror = () => setBlocked(true);
    document.body.appendChild(script);

    const timeout = window.setTimeout(() => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe[src*="facebook.com/plugins"]',
      );
      if (!iframe) setBlocked(true);
    }, 8000);

    return () => window.clearTimeout(timeout);
  }, []);

  if (blocked) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-card border border-default bg-surface p-8 text-center">
        <p className="text-4xl" aria-hidden>
          f
        </p>
        <p className="mt-4 text-base text-foreground-secondary">
          Follow Pastor Brian for daily scripture and church updates on Facebook.
        </p>
        <a
          href={PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[48px] items-center rounded-card bg-[#1877F2] px-6 text-base font-semibold text-white hover:opacity-90"
        >
          Follow us on Facebook →
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-default bg-surface">
      <iframe
        title="Lake Shore Church on Facebook"
        src={EMBED_SRC}
        width="100%"
        height={500}
        style={{ border: "none", overflow: "hidden", minHeight: 500 }}
        scrolling="no"
        allow="encrypted-media"
        onError={() => setBlocked(true)}
      />
    </div>
  );
}
