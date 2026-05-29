# Mobile live streaming — test guide (Mevo → Mux → app)

**Goal:** Replace Subsplash with **in-house video** on the Lake Shore Church mobile app — no YouTube/Facebook required for members.

**Status:** Mobile app supports native **HLS** playback (L2 MVP). Mevo + Mux account setup is the next step before Sunday testing.

---

## Architecture (recommended)

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

**Storage on phones:** We **stream** video (like Netflix) — we do **not** fill the phone with a month of files. Recent services (31 days) appear in a list; users tap to stream. **Download** is optional and only works for direct MP4 files (not live HLS).

---

## Phase 1 — Test without Mevo (today)

Use a public HLS test stream to confirm the app player works.

1. Open **Sanity Studio** → **Site Config**
2. Set:
   - **Live stream mode:** In-house (Mux HLS)
   - **Live playback URL (HLS):**  
     `https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop16x9.m3u8`
   - **Is live now:** ON
3. Run mobile app:
   ```bash
   cd lsc-platform
   pnpm --filter web dev          # API at localhost:3000 or use production URL in .env
   cd apps/mobile && pnpm start
   ```
4. Open **Sermons → Live** — you should see native video (not YouTube WebView).
5. Turn **Is live now** OFF — countdown + **Recent services** list appears.

Ensure `EXPO_PUBLIC_APP_URL` in `apps/mobile/.env` points at your API (`https://lsc-platform-kappa.vercel.app` for device testing on the same Wi‑Fi, or your machine IP for local dev).

---

## Phase 2 — Mux account + Mevo (before first real Sunday)

### 1. Create Mux

1. Sign up at [mux.com](https://www.mux.com)
2. **Video → Live streams → Create live stream**
3. Copy:
   - **RTMP URL** + **Stream key** (for Mevo)
   - **Playback ID** → HLS URL: `https://stream.mux.com/{PLAYBACK_ID}.m3u8`

### 2. Configure Mevo (replace Subsplash)

1. Open **Mevo** app on the church iPad/phone
2. **Destinations → Add → Custom RTMP**
3. Paste Mux **RTMP URL** and **stream key** (from Mux dashboard — keep private)
4. Remove old Subsplash destination
5. Name it e.g. `Lake Shore — Mux`

### 3. Sanity Site Config

| Field | Value |
|-------|--------|
| Live stream mode | In-house (Mux HLS) |
| Live playback URL | `https://stream.mux.com/YOUR_PLAYBACK_ID.m3u8` |
| Is live now | OFF until service |

### 4. Sunday flow

1. **~9:45 AM** — Start stream on **Mevo** (Mux destination)
2. **Staff** — `/staff/sermons` → **Go live** (no YouTube ID in in-house mode)
3. Members open app → **Live** tab
4. **After service** — Stop Mevo → **End stream** in staff portal
5. In Mux, open the asset → copy **VOD HLS or MP4 URL** → add to new **Sermon** in Sanity

---

## Phase 3 — Archive & download (memory-safe)

| Content | Where stored | On phone |
|---------|----------------|----------|
| Live Sunday | Mux CDN | Stream only |
| Last 31 days | Sanity sermon `videoUrl` | Stream from list |
| Older sermons | Sanity archive | Stream on demand |
| Download | MP4 on R2/Mux | User taps **Download** — saves via share sheet, not auto |

**Do not** auto-download a month of video — a single service can be 1–2 GB.

---

## Staff go-live (in-house)

1. `/staff/sermons` — when **Live playback URL** is set in Site Config, staff see **In-house mode**
2. Click **Go live** after Mevo is streaming (no YouTube ID)
3. **End stream** when done

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Black player | Confirm Mevo is streaming; open HLS URL in Safari on phone |
| Still YouTube WebView | Site Config → mode must be **In-house** + valid `.m3u8` URL |
| App can’t reach API | Set `EXPO_PUBLIC_APP_URL` to production or LAN IP |
| Download button does nothing | Expected for HLS — only MP4 URLs can download |

---

## Related docs

- [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md)
- [LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md) — legacy YouTube/Restream interim
- [MOBILE_SETUP.md](./MOBILE_SETUP.md)
