# Pastor RSS feeds — Craig Brian Larson

**Collected:** 2026-05-22  
**Source:** Pastor Brian (duplicate links deduplicated)

These feeds are Pastor’s **personal teaching site and podcast** (“Knowing God and His Ways”), not the old `lschurch.com` WordPress site. We can use them for blog/podcast sync or links on the church platform.

---

## Use these URLs (canonical)

| Purpose | URL | Format |
|---------|-----|--------|
| **Blog / articles (WordPress)** | https://craigbrianlarson.com/feed/ | RSS 2.0 — posts with title, date, categories |
| **Podcast (Libsyn)** | https://craigbrianlarson.libsyn.com/rss | RSS 2.0 + iTunes tags — audio episodes |

**Prefer HTTPS** for Libsyn: `https://craigbrianlarson.libsyn.com/rss` (same feed as http).

---

## Do not use as RSS (web pages only)

| URL | What it is |
|-----|------------|
| https://five.libsyn.com/show/episodes | Libsyn **website** page — not an RSS file |
| http://craigbrianlarson.libsyn.com/website | Podcast **homepage** — not RSS |
| https://craigbrianlarson.com/ | Main site — use `/feed/` for RSS |

---

## What we verified (2026-05-22)

**Blog feed** (`craigbrianlarson.com/feed/`):

- Title: *Knowing God and His Ways*
- Author: Craig Brian Larson
- Recent item example: “Worldliness or Holiness: Which Direction Are You Going?”
- WordPress generator

**Podcast feed** (`craigbrianlarson.libsyn.com/rss`):

- Same show title: *Knowing God and His Ways*
- Libsyn podcast with iTunes metadata
- Owner email in feed: `brian@craigbrianlarson.com`

---

## How this fits Lake Shore Church platform

| Platform piece | Today | With these feeds |
|----------------|-------|------------------|
| **Sermons** | Sanity CMS (Lake Shore Sunday sermons) | Keep Sanity as source; optional link “Pastor’s podcast” to Libsyn |
| **Podcast RSS** | `/podcast.xml` from **Sanity** sermons | Separate from Libsyn; could add second link or import episodes later |
| **Blog / devotionals** | Sanity `blog` | **Low-hanging fruit:** import or sync from `craigbrianlarson.com/feed/` |
| **Mobile / web** | `/api/mobile/*` | Imported posts appear after Sanity import |

---

## Suggested implementation order

1. **Quick (no code):** Add link on About or Resources → “Pastor’s blog” / “Knowing God and His Ways podcast” (external URLs).
2. **Phase 2A optional:** Script `pnpm import:wordpress-rss` → create/update Sanity `blogPost` from `craigbrianlarson.com/feed/` (needs Pastor approval to republish on church site).
3. **Later:** Libsyn episode import or Apple/Spotify submit using church `podcast.xml` when domain is live.

---

## Env / config (when we build import)

```env
# Optional — do not commit real values to git
WORDPRESS_RSS_URL=https://craigbrianlarson.com/feed/
LIBSYN_PODCAST_RSS_URL=https://craigbrianlarson.libsyn.com/rss
```

Store in `CHURCH_ACCOUNTS.local.md` and Vercel only if a cron import is added.

---

## Pastor confirmation (before import)

- [ ] OK to show **blog posts** from craigbrianlarson.com on **lschurch.com** / church app?
- [ ] OK to link **Libsyn podcast** on church site (same teaching, personal feed)?
- [ ] Any posts to **exclude** (categories, dates)?

---

*See also [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md) § WordPress RSS.*
