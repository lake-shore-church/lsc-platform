# Mobile live streaming — test guide

**Production path ($0):** [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md) — Mevo → YouTube, embed in app.

**Optional paid upgrade:** In-house Mux HLS (Phases 2–3 below) when the church adds budget.

---

## Phase 1 — Test in-app YouTube embed ($0)

Confirm the mobile **Live** tab works before Sunday.

1. YouTube Studio → start an **unlisted test stream** (or use any public live/test video ID).
2. `/staff/sermons` → paste **YouTube video ID** → **Go live**.
3. Sanity **Site Config** → **Live stream mode:** **YouTube embed**.
4. Run mobile app → **Sermons** → **Live** tab → embedded player inside the app.
5. **End stream** when done.

**Web:** [https://lsc-platform-kappa.vercel.app/live](https://lsc-platform-kappa.vercel.app/live)

---

## Phase 2 — Test HLS player (optional / future Mux)

Use a public HLS test stream to confirm the native player works if you later switch to in-house mode.

1. Sanity **Site Config**:
   - **Live stream mode:** In-house (Mux HLS)
   - **Live playback URL (HLS):**  
     `https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop16x9.m3u8`
   - **Is live now:** ON
2. Mobile app → **Live** tab → native HLS player (not WebView).
3. Set **Is live now** OFF when finished.

---

## Phase 3 — Mevo → Mux (paid — defer until budget)

Only when the church pays for Mux (~$10–40/mo):

```text
Mevo camera (Sunday)
    │  RTMP
    ▼
Mux Live (ingest + CDN)
    │  HLS .m3u8
    ▼
Sanity Site Config → livePlaybackUrl
    │
    ├─► Mobile: Sermons → Live tab (native player)
    └─► Web: /live (same API)

After service: Mux auto-VOD → paste .m3u8 or MP4 into Sanity Sermon videoUrl
```

**Storage on phones:** We **stream** video — we do not auto-cache a month of files. Recent services (31 days) appear in a list; users tap to stream. **Download** is optional and only for direct MP4 files.

### Mux setup (when ready)

1. [mux.com](https://mux.com) → create account → **Live Streams** → create stream.
2. Copy **RTMP URL** + **Stream key** into Mevo (Custom RTMP).
3. Copy **Playback ID** → HLS URL: `https://stream.mux.com/PLAYBACK_ID.m3u8`
4. Sanity → **Live playback URL**, mode **In-house**, staff **Go live** (no YouTube ID).

See [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md) for full architecture.

---

## Sunday checklist ($0 path)

| Step | Action |
|------|--------|
| 1 | Mevo → YouTube stream live |
| 2 | Staff portal → YouTube video ID → **Go live** |
| 3 | Mobile **Live** tab shows in-app player |
| 4 | After service → **End stream** + add Sermon with replay URL |

Full details: [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md)
