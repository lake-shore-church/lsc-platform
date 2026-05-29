# Lake Shore Church — Livestream Setup Guide

> **Recommended ($0): [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md)** — Mevo → YouTube Live, watch in our app/site.  
> **Future paid upgrade:** [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md) — Mux HLS when budget allows.

Members open the **church website or app** and tap **Live**. YouTube handles video delivery for free; the platform embeds it so the experience stays on Lake Shore Church pages.

## What you need (all free)

- YouTube channel for Lake Shore Church
- Mevo camera **or** phone with Larix / Streamlabs (free apps)
- Optional: [Restream.io](https://restream.io) (free tier: YouTube + Facebook at once)
- Optional: Facebook page [facebook.com/lschurchchicago](https://www.facebook.com/lschurchchicago)

## One-time setup

### Step 1 — Create YouTube channel

1. Go to [youtube.com](https://www.youtube.com) and sign in with the church Google account.
2. Create channel: **Lake Shore Church**.
3. YouTube Studio → **Create** → **Go live** → **Stream**.
4. Note **Stream URL** and **Stream key** (for Mevo). Optional: **Channel ID** for Sanity fallback.

### Step 2 — Point Mevo at YouTube (replace Subsplash)

**Direct to YouTube (simplest — $0, one destination):**

1. Open the **Mevo** app.
2. Remove old **Subsplash** destination.
3. **Add destination** → **Custom RTMP**.
4. Enter YouTube **Stream URL** and **Stream key** from Step 1 (keep the key private).
5. Save as `Lake Shore Church — YouTube`.

**Optional — Restream for YouTube + Facebook:**

1. Sign up at [restream.io](https://restream.io) (free).
2. Add **YouTube** and **Facebook** as destinations.
3. In Mevo, use Restream’s **RTMP URL** and **Stream key** instead of YouTube’s directly.

### Step 3 — Sanity Site Config

`/studio` → **Site Config**:

- **Live stream mode:** **YouTube embed** (default)
- **Is live now:** OFF until service

### Step 4 — Streaming from phone (no Mevo)

- **Larix Broadcaster** (iOS + Android) or **Streamlabs Mobile**
- Enter YouTube RTMP URL + key (or Restream credentials)

### Step 5 — Before each service (go live on website + app)

**Option A — Staff portal (recommended)**

1. Sign in at `/staff/sermons`.
2. Start Mevo → confirm live in YouTube Studio.
3. In **Livestream control**, paste the YouTube **video ID** or full watch URL.
4. Click **Go live**.
5. Site header, `/live`, and mobile **Live** tab update within ~60 seconds.
6. Optional push if OneSignal is configured.

**Option B — Sanity Studio**

1. `/studio` → **Site Config**.
2. Set **Live video ID** (11 characters).
3. Turn **Is live now** **ON**.

### Step 6 — After service

1. Stop Mevo / YouTube stream.
2. Staff portal → **End stream**, or Sanity → **Is live now** **OFF**.
3. YouTube saves the replay automatically.
4. Add a new **Sermon** in Sanity (title, scripture, YouTube replay URL).

## How the platform works

| Piece | Behavior |
|--------|----------|
| `GET /api/live-status` | Reads Sanity `isLiveNow`, `liveStreamMode`, `liveVideoId` (cached ~60s) |
| `/live` | Embedded player when live; countdown when not |
| Mobile **Sermons → Live** | Same API; in-app YouTube embed when live |
| Staff **Go live / End** | Updates Sanity; optional OneSignal push |

## Environment variables (Vercel / `apps/web/.env.local`)

| Variable | Purpose |
|----------|---------|
| `SANITY_API_TOKEN` | Staff go-live / end-live writes |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | Fallback embed if live with no video ID |
| `NEXT_PUBLIC_SITE_URL` | Magic links, push links, embed domain |
| `NEXT_PUBLIC_ONESIGNAL_APP_ID` | Push (optional) |
| `ONESIGNAL_REST_API_KEY` | Push (optional) |
| `CRON_SECRET` | Protects `/api/cron/church-notifications` |
| `RESEND_API_KEY` | Prayer/contact/RSVP emails |
| `RESEND_FROM_EMAIL` | Church sender (verified in Resend) |

## Cost: $0

- YouTube Live: free ingest, CDN, and archive
- Restream free plan (optional): 2 platforms
- Facebook Live (optional): free

## Test checklist

See [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md) for the full Sunday checklist. Quick test:

1. Staff portal: paste test video ID → **Go live**.
2. Homepage: **Live now** badge.
3. `/live`: embedded player + prayer form.
4. Mobile **Live** tab: in-app player.
5. **End stream** → countdown returns.
