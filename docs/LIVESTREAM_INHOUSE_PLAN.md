# In-house live streaming plan (Subsplash replacement)

**Status:** Deferred — use [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md) until budget for Mux (~$10–40/mo). Code for in-house HLS is already in the repo.  
**Audience:** Pastor Brian, tech steward, Cursor agents  

---

## What Pastor wants (and what Subsplash provided)

Members should open **our website or app**, tap **Live**, and watch **video and audio** on Lake Shore Church pages — the same experience they had with **Subsplash**, without being sent to YouTube or Facebook first.

| Subsplash (ended) | Lake Shore target |
|-------------------|-------------------|
| Mevo → Subsplash RTMP | Mevo → **our** RTMP ingest |
| Subsplash player on church app/site | Player on **`/live`** + mobile **Live** tab |
| Staff “go live” toggle | Staff **Go live** (already scaffolded) |
| Optional social simulcast | **YouTube as secondary** (reach), not primary UX |

---

## Architecture (north star)

```text
Sunday morning
──────────────
Mevo camera
    │  RTMP (one destination in Mevo app)
    ▼
Hosted ingest (Mux / Livepeer / Cloudflare Stream — pick one)
    │  transcode + CDN
    ▼
HLS playback URL
    │
    ├─► Web: /live + homepage “Live now” banner (native player)
    ├─► Mobile: Sermons → Live tab (WebView or native HLS)
    └─► Optional simulcast: YouTube + Facebook (background; not required for members)

Staff: /staff/sermons → Go live (no YouTube ID required in in-house mode)
```

**YouTube / Facebook:** optional **secondary** outputs via Restream simulcast — useful for discovery, not the main member path.

---

## Phased delivery

| Phase | Scope | Outcome | Estimate |
|-------|--------|---------|----------|
| **L1 — Today** | Website content polish; `/live` countdown + prayer; docs | Presentable demo for Pastor meeting | Done in repo |
| **L2 — In-house MVP** | Mux (or Livepeer) live stream; Sanity `livePlaybackUrl` / stream keys; HLS player on web + mobile; staff go-live without YouTube ID | Subsplash-like watch on **our** site | ~3–5 dev days + account setup |
| **L3 — Simulcast** | Restream: YouTube + Facebook as extra outputs | Reach without changing member UX | ~½ day |
| **L4 — Archive** | Auto VOD → Sanity `sermon` after service | Replay in sermon archive | Phase 2 media |

---

## What exists today (accurate)

| Piece | Status |
|-------|--------|
| `/live` page, countdown, prayer during service | ✅ Production |
| Mobile Live tab + LIVE NOW banner | ✅ |
| Staff Go live / End stream | ✅ (writes Sanity) |
| **In-house video player** | ❌ — player expects **YouTube embed** today |
| Mevo → our RTMP | ❌ — needs L2 |

Do **not** tell Pastor that live video on the website works like Subsplash until **L2** ships. Today: show **site tour**, **sermon archive**, **Zoom `/join`**, **this week** content, and explain L2 as the Subsplash replacement.

---

## Recommended host: Mux (default choice for L2)

- RTMP ingest from Mevo  
- Low-latency HLS for web/mobile  
- Sane pricing for weekly 90-minute services  
- Webhook when stream active → auto-set `isLiveNow` (optional polish)

**Alternatives:** Livepeer (cost-sensitive), Cloudflare Stream (if already on Cloudflare heavily).

---

## Sanity fields (L2 — to add)

| Field | Purpose |
|-------|---------|
| `liveStreamMode` | `inhouse` \| `youtube` (fallback) |
| `muxLiveStreamId` / `livePlaybackUrl` | Playback for player |
| `liveStreamKey` (secret — env or Sanity token-gated) | Mevo RTMP destination |
| `isLiveNow` | Already exists |
| `youtubeSimulcastEnabled` | Optional secondary |

---

## Mevo setup (after L2)

Same as `LIVESTREAM_SETUP.md` Step 3, but RTMP points to **Mux ingest URL**, not Subsplash or YouTube.

---

## Meeting talking points (Pastor)

1. “The **shell** is ready — live page, app tab, go-live button, prayer during service.”  
2. “We’re adding the **video engine** Subsplash used to host — watch here, like before.”  
3. “YouTube can be **optional** for people who find us there — not required for Sunday on our site.”  
4. “Today we’re showing the **whole website** ministries, giving, prayer, sermons, visit.”

---

## Related docs

- [LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md) — current go-live + Mevo/Restream (interim)  
- [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md) — platform vision  
- [DEMO_MEETING_CHECKLIST.md](./DEMO_MEETING_CHECKLIST.md) — today’s website walkthrough  
