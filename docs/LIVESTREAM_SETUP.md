# Lake Shore Church — Livestream Setup Guide

## What you need (all free)

- [Restream.io](https://restream.io) account (free tier: 2 destinations)
- YouTube channel for Lake Shore Church
- Facebook page: [facebook.com/lschurchchicago](https://www.facebook.com/lschurchchicago)
- Phone or laptop with camera

## One-time setup

### Step 1 — Create YouTube channel

1. Go to [youtube.com](https://www.youtube.com) and sign in with the church Google account.
2. Create channel: **Lake Shore Church**.
3. In YouTube Studio → **Go Live**, note your **Channel ID** (from the channel URL).
4. Optional: add `youtubeChannelId` in Sanity **Site Config** for embed fallback.

### Step 2 — Set up Restream.io

1. Sign up at [restream.io](https://restream.io) (free).
2. Add **YouTube** and **Facebook** as destinations.
3. Copy the Restream **RTMP URL** and **Stream Key**.

### Step 3 — Streaming from phone

Download one of these free apps:

- **Larix Broadcaster** (iOS + Android)
- **Streamlabs Mobile**

Enter the Restream RTMP URL + key, then start streaming — video goes to **YouTube and Facebook** at once.

### Step 4 — Before each service (go live on website + app)

**Option A — Staff portal (recommended)**

1. Sign in at `/staff/sermons`.
2. In **Livestream control**, paste the YouTube **video ID** or full watch URL.
3. Click **Go live**.
4. Site header, `/live`, and the mobile app update within ~60 seconds.
5. If `ONESIGNAL_REST_API_KEY` is set in Vercel, subscribers get a push notification.

**Option B — Sanity Studio**

1. Open `/studio` → **Site Config**.
2. Set **Live video ID** (11 characters, e.g. from the YouTube watch URL).
3. Turn **Is live now** **ON**.

### Step 5 — After service

1. Stop the stream on your phone or Restream.
2. Staff portal → **End stream**, or Sanity → **Is live now** **OFF**.
3. YouTube saves the replay automatically.
4. Add the service as a new **Sermon** in Sanity Studio (title, scripture, video URL).

## How the platform works

| Piece | Behavior |
|--------|----------|
| `GET /api/live-status` | Reads Sanity `isLiveNow` + `liveVideoId` (cached 60s) |
| `/live` | Live player + chat + prayer form when live; countdown when not |
| Mobile **Sermons → Live** | Same status API; YouTube WebView when live |
| Staff **Go live / End** | Updates Sanity; optional OneSignal push |

## Environment variables (Vercel / `apps/web/.env.local`)

| Variable | Purpose |
|----------|---------|
| `SANITY_API_TOKEN` | Staff go-live / end-live writes |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | Fallback embed if live with no video ID |
| `NEXT_PUBLIC_SITE_URL` | Push notification link + chat embed domain |
| `NEXT_PUBLIC_ONESIGNAL_APP_ID` | Push (optional) |
| `ONESIGNAL_REST_API_KEY` | Push (optional) |

## Cost: $0

- Restream free plan: 2 platforms
- YouTube Live: free
- Facebook Live: free

## Test checklist

1. Sanity or staff portal: `isLiveNow = true`, `liveVideoId = dQw4w9WgXcQ` (test ID).
2. Homepage nav: **Live now** badge.
3. `/live`: video player + prayer form.
4. Mobile home: red **LIVE NOW** banner.
5. Mobile Sermons → **Live** tab: player.
6. Set `isLiveNow = false` → countdown on `/live` and mobile.
