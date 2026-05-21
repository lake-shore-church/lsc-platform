import { useCallback, useEffect, useState } from "react";
import { fetchLiveStatus, type LiveStatus } from "@/lib/live";

const POLL_MS = 60_000;

export function useLiveStatus() {
  const [status, setStatus] = useState<LiveStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setStatus(await fetchLiveStatus());
    } catch {
      setStatus(null);
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
