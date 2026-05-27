# Website demo — Pastor & members meeting

**Use this today** to walk through the public site. Live **video on `/live`** is not Subsplash-equivalent yet — see [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md).

**Production URL:** https://lsc-platform-kappa.vercel.app  
**Sanity Studio:** https://lsc-platform-kappa.vercel.app/studio  

---

## Before guests arrive (15 min)

- [ ] Open site in Chrome (incognito optional) — confirm homepage loads  
- [ ] Language switcher: show **English** (other locales if time)  
- [ ] Sanity Studio: glance at **Site configuration** — hero text looks correct  
- [ ] Optional: `pnpm seed:site-config` only if content looks empty (needs `SANITY_API_TOKEN`)  
- [ ] Do **not** turn **Is live now** ON unless you have a test YouTube ID (in-house player not live yet)  
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
| 8 | **/live** | Countdown to next Sunday; prayer; “in-house player coming” (not full stream yet) |
| 9 | **/prayer** | Submit prayer — church cares online |
| 10 | **/give** | Zeffy / giving (iframe when URL in Studio) |
| 11 | **/events** | Upcoming events + RSVP |
| 12 | **/testimonies** | Stories from the church |
| 13 | **/faq** | Common questions |
| 14 | **/about/leaders** | Leadership |
| 15 | **/contact** | Reach the church |

**Staff (if logged in):** `/staff/sermons` — show livestream control for *future* Sunday (explain L2 plan).

---

## What to say about live streaming

> “Our **live page and app tab** are ready. The next step is plugging in our **own video host** so Mevo feeds **our website** like Subsplash did — not YouTube-first. YouTube can stay as an **extra** for people who find us there.”

See [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md).

---

## Avoid during demo

- Turning **Go live** without a real stream (confusing)  
- Apologizing for every unfinished feature — frame **phases** instead  
- Deep technical jargon (RTMP, Sanity, Vercel) unless audience is technical  

---

## After meeting

- [ ] Note Pastor feedback in [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md) or meeting notes  
- [ ] Merge open PRs (`feature/cp-1-this-week`) when ready  
- [ ] Schedule **L2 in-house live** build ([LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md))  
- [ ] Credentials: [PASTOR_MEETING_CHECKLIST.md](./PASTOR_MEETING_CHECKLIST.md)  

---

*Lake Shore Church — West Loop · 38 S. Peoria St · Sunday 10:00 AM CT*
