import { useCallback, useEffect, useState } from "react";
import { fetchLiveStatus, type LiveStatus } from "@/lib/live";

const POLL_MS = 60_000;
const POLL_LIVE_MS = 15_000;

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
    const pollMs = status?.isLive ? POLL_LIVE_MS : POLL_MS;
    const id = setInterval(() => void refresh(), pollMs);
    return () => clearInterval(id);
  }, [refresh, status?.isLive]);

  return { status, loading, refresh };
}
