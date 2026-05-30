# Zero-cost live streaming (recommended)

**Cost to the church: $0/month.** Members watch inside the **Lake Shore Church website and mobile app** — not by hunting on YouTube. YouTube is only the free video backbone (Google’s CDN); the church app embeds the player.

**Full setup steps:** [LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md)

---

## Architecture

```text
Sunday morning
──────────────
Mevo camera (or phone app)
    │  RTMP
    ▼
YouTube Live (free ingest + CDN + auto-archive)
    │
    ├─► Staff: Go live with YouTube video ID → Sanity
    │
    ├─► Web: /live (embedded player)
    └─► Mobile: Sermons → Live tab (embedded player)

After service: YouTube saves replay → add URL to Sermon in Sanity
```

**Optional (still $0):** [Restream.io](https://restream.io) free tier sends the same Mevo feed to **YouTube + Facebook** at once. The app still uses YouTube for the in-app player.

**Not required:** Mux, Livepeer, Cloudflare Stream, or Subsplash. Those are paid or ended. In-house HLS in the codebase stays available if you add budget later — see [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md).

---

## One-time setup (about 30 minutes)

### 1. YouTube channel

**Church channel (Pastor):** [Lake Shore Church Chicago](https://www.youtube.com/@lakeshorechurchchicago8615) · channel ID `UCvd4npADnhNfLXXiM_4DQgQ`

1. Sign in at [youtube.com](https://www.youtube.com) with the church Google account.
2. Channel is **Lake Shore Church Chicago** (handle `@lakeshorechurchchicago8615`).
3. YouTube Studio → **Create** → **Go live** → choose **Stream** (not webcam).
4. Copy **Stream URL** (`rtmp://a.rtmp.youtube.com/live2`) and **Stream key** (keep private).

**Privacy:** Schedule or start streams as **Unlisted** so only people with the app/site see it easily; the embed still works for members.

### 2. Mevo → YouTube (direct — no Restream needed)

1. Open the **Mevo** app on the device used Sunday.
2. Remove old **Subsplash** destination if still listed.
3. **Add destination** → **Custom RTMP** (or **YouTube** if Mevo offers it).
4. Paste YouTube **Stream URL** and **Stream key** from step 1.
5. Save as e.g. `Lake Shore Church — YouTube`.

**No Mevo?** Use **Larix Broadcaster** or **Streamlabs Mobile** (free) with the same YouTube RTMP credentials.

### 3. Sanity Site Config

In `/studio` → **Site Config**:

| Field | Value |
|--------|--------|
| **Live stream mode** | YouTube embed |
| **Is live now** | OFF (until service) |
| **Live video ID** | Leave empty until Sunday |
| **YouTube channel ID** | `UCvd4npADnhNfLXXiM_4DQgQ` |
| **Live stream URL** | `https://www.youtube.com/@lakeshorechurchchicago8615` (optional link for members) |

Optional: **YouTube channel ID** is already set above for fallback embed when no video ID is pasted yet.

### 4. Test once before Sunday

1. YouTube Studio → start a **test stream** (unlisted).
2. Copy the **video ID** from the watch URL (`watch?v=XXXXXXXXXXX`).
3. `/staff/sermons` → **Livestream control** → paste ID → **Go live**.
4. Check:
   - [https://lsc-platform-kappa.vercel.app/live](https://lsc-platform-kappa.vercel.app/live)
   - Mobile app → **Sermons** → **Live** tab
5. **End stream** in staff portal and stop YouTube test.

---

## Every Sunday checklist

| When | Who | Action |
|------|-----|--------|
| ~15 min before | Tech | Mevo charged, wired internet if possible, YouTube stream ready |
| ~5 min before | Tech | Start stream in Mevo → confirm “Live” in YouTube Studio |
| When service starts | Staff | `/staff/sermons` → paste **YouTube video ID** → **Go live** |
| During service | Members | Open church app → **Live** tab (in-app player) |
| After benediction | Tech | Stop Mevo / YouTube stream |
| Right after | Staff | **End stream** in staff portal |
| Same day | Staff | New **Sermon** in Sanity with YouTube replay URL |

**Video ID tip:** While live, open the YouTube watch page — the 11-character code after `v=` is what you paste.

---

## Reliability tips (free)

- **Ethernet** to the router beats Wi‑Fi for Mevo when you can run a cable.
- **Unlisted** live — fewer random viewers, same embed quality.
- **One person** owns “Go live” / “End stream” so the app never shows live after you’ve stopped.
- YouTube may take **30–60 seconds** after go-live before the embed works; that’s normal.

---

## What members see

- **Live:** Red **LIVE NOW** on mobile; **Live** tab with video inside the church app (WebView embed — same idea as Subsplash’s in-app player).
- **Not live:** Countdown to next Sunday 10:00 AM CT.
- **Past services:** Recent replays list (streams from sermon videos; last ~31 days).

We **stream** replays — we do not auto-download a month of video onto phones.

---

## Costs

| Service | Cost |
|---------|------|
| YouTube Live | $0 |
| Restream (optional, 2 destinations) | $0 |
| Mevo (church already owns) | — |
| Vercel + Sanity (existing site) | existing plan |
| Mobile app (Expo) | $0 dev; App Store fees only when you ship |

---

## If you want “true” in-house video later

When the church is ready to pay (~$10–40/mo for Mux or similar), switch **Live stream mode** to **In-house (Mux HLS)** and follow [MOBILE_LIVESTREAM_TEST.md](./MOBILE_LIVESTREAM_TEST.md). Until then, the YouTube-backed path above is the recommended production setup.
