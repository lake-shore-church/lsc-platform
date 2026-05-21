"use client";

import { useCallback, useEffect, useState } from "react";
import type { LiveStatusResponse } from "@repo/cms";

const POLL_MS = 60_000;

export function useLiveStatus() {
  const [status, setStatus] = useState<LiveStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/live-status");
      if (res.ok) setStatus((await res.json()) as LiveStatusResponse);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = setInterval(() => void refresh(), POLL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  return { status, loading, refresh };
}
