# Presenter Mode — Mobile slide controller

Staff and admin can control Sunday sermon slides from a phone connected to the projector (HDMI).

## Access

1. Sign in on the **Lake Shore Church** app as **staff** or **admin**.
2. **More** tab → **Presenter Mode** (tv icon).
3. Landscape full-screen opens with the latest sermon slides (or pick another sermon if none have slides).

## Slides in Sanity

1. Open `/studio` → **Sermon** → add images under **Presentation slides** (order = slide sequence).
2. If empty, the app falls back to the sermon featured image.

## Controls

| Action | Result |
|--------|--------|
| Swipe right | Previous slide |
| Swipe left | Next slide |
| Volume up / down | Next / previous (device build recommended; limited in Expo Go) |
| Thumbnail strip | Jump to any slide |
| YouTube icon | Full-screen sermon video |
| Tap screen | Show / hide controls (auto-hide after 3 seconds) |

## Online viewers

When presentation is active, anyone on `/sermons/[slug]` for that sermon sees the same slide full-screen (`PresentationSync` + Supabase Realtime).

## One-time Supabase setup

Run in **Supabase SQL Editor**:

`supabase/migrations/20260521_presentation_state.sql`

Then **Database → Replication** → enable Realtime for `presentation_state`.

## Staff portal alternative

Slides sync via the `presentation_state` table. Ending the presenter session sets `is_active = false` when you leave the screen.
