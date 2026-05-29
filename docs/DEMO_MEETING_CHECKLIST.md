# Website demo — Pastor & members meeting

**Production URL:** https://lsc-platform-kappa.vercel.app  
**Sanity Studio:** https://lsc-platform-kappa.vercel.app/studio  

**Live streaming ($0):** [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md) — Mevo → YouTube, watch in app/site.

---

## Before guests arrive (15 min)

- [ ] Open site in Chrome (incognito optional) — confirm homepage loads  
- [ ] Language switcher: show **English** (other locales if time)  
- [ ] Sanity Studio: glance at **Site configuration** — hero text looks correct  
- [ ] **This week’s content** (May 31): `pnpm seed:weekly-update` and `pnpm seed:week-events` (needs `SANITY_API_TOKEN` + `SUPABASE_SERVICE_ROLE_KEY` in `apps/web/.env.local`)  
- [ ] Optional: `pnpm seed:site-config` only if content looks empty  
- [ ] Do **not** turn **Is live now** ON unless you have a test YouTube video ID  
- [ ] Phone: open same URL — responsive check  

---

## Recommended tour order (~20–30 min)

| # | Route | What to highlight |
|---|--------|-------------------|
| 1 | **/** Home | Hero, service strip, **This week at Lake Shore**, series, ministries, events, testimonials |
| 2 | **/visit** | Merit School address, Sunday 10 AM, parking/doors |
| 3 | **/beliefs** | Full A/G-aligned beliefs |
| 4 | **/ministries** | All ministries catalogue (Pastor’s vision list) |
| 5 | **/ministries/wednesday-prayer** | Mid-week + Zoom |
| 6 | **/join** | One-tap Zoom (same room Sun + Wed) |
| 7 | **/sermons** | Archive + latest message |
| 8 | **/live** | Countdown when offline; live player + prayer when streaming |
| 9 | **/prayer** | Submit prayer — church cares online |
| 10 | **/give** | Zeffy / giving (iframe when URL in Studio) |
| 11 | **/events** | Upcoming events + RSVP |
| 12 | **/testimonies** | Stories from the church |
| 13 | **/faq** | Common questions |
| 14 | **/about/leaders** | Leadership |
| 15 | **/contact** | Reach the church |

**Staff (if logged in):** `/staff/sermons` — **Livestream control** (paste YouTube ID → Go live).

---

## What to say about live streaming

> “Sunday video plays **on our website and mobile app** — members open Lake Shore Church, not YouTube. We use YouTube behind the scenes for free, reliable streaming from our Mevo camera. Staff flip **Go live** when service starts.”

Setup guide: [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md).

---

## Avoid during demo

- Turning **Go live** without a real stream (confusing)  
- Apologizing for every unfinished feature — frame **phases** instead  
- Deep technical jargon (RTMP, Sanity, Vercel) unless audience is technical  

---

## After meeting

- [ ] Note Pastor feedback in [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md) or meeting notes  
- [ ] Merge open PRs (`feature/cp-1-this-week`) when ready  
- [ ] One-time Mevo → YouTube setup ([ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md))  
- [ ] Credentials: [PASTOR_MEETING_CHECKLIST.md](./PASTOR_MEETING_CHECKLIST.md)  

---

*Lake Shore Church — West Loop · 38 S. Peoria St · Sunday 10:00 AM CT*
