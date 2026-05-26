# Pastor priorities — platform direction (May 2026)

After the May 2026 visit, Pastor Brian confirmed the public site and mobile app direction. This document ties his requests to **one system** so web, app, email, and push stay in sync without duplicate work.

---

## Vision

**One church platform** — Lake Shore Church reaches people globally with the gospel (God raised Jesus from the dead; hope for all who follow Him). The website and app are the same ministry: content is entered once, flows everywhere, and is maintainable by non-technical staff.

---

## Design principle: single source of truth

| Need | Where staff update | Flows to |
|------|-------------------|----------|
| Hero, themes, live toggle, Zeffy URL | **Sanity Studio** (`/studio`) | Web + mobile APIs |
| Events, RSVPs | **Staff portal** (`/staff/events`) | Web `/events` + mobile home/More |
| Sermons, slides, go-live | **Staff** (`/staff/sermons`) + Sanity | Web + mobile Sermons/Live |
| Blog / devotionals | **Sanity** or WordPress RSS (decision pending) | Web + mobile |
| Prayers | Public form + **staff** (`/staff/prayers`) | Web + mobile Prayer |
| Giving / bookkeeping | **Zeffy** (0% nonprofit fees) → nightly sync → `giving_records` | Staff financials + member giving history |
| Member messaging / email | **Resend** (free tier) + optional **OneSignal** push | Scheduled + transactional |
| Notifications (Wed prayer, Sunday service, go-live) | **Staff settings** (to build) → OneSignal + email | Mobile + email subscribers |

No temporary “mobile-only” content paths — mobile reads `/api/mobile/*` backed by the same CMS and Supabase data as the website.

---

## Cost-free stack (recommended)

| Service | Cost | Role |
|---------|------|------|
| **Sanity** | Free tier | Non-technical CMS: homepage, site config, sermons metadata |
| **Supabase** | Free tier | Auth, events, prayers, giving records, profiles, Realtime |
| **Vercel** | Free tier | Website + API routes |
| **Zeffy** | 0% platform fee (501(c)(3)) | Donations + recurring + donor data → export/sync |
| **YouTube + Restream** | Free | Live stream (no extra video host bill) |
| **Resend** | Free tier (limits) | Magic links, event reminders, prayer confirmations |
| **OneSignal** | Free tier | Mobile push (Sunday, Wednesday, go-live) |
| **Expo / EAS** | Free until store accounts | iOS/Android builds |

Paid only when the church chooses: Apple Developer ($99/yr), Google Play ($25 once), custom domain email volume above free limits.

---

## What Pastor asked for → our plan

### 1. Donations & finance (easy bookkeeping)

- **Zeffy** as payment host (501(c)(3), no platform fee).
- Sync gifts into Supabase `giving_records` (amount, donor, fund type: tithe / building / missions).
- **Staff** `/staff/financials` — income from sync, expenses, PDF reports (already scaffolded).
- **Mobile Give** — native fund picker → Zeffy; signed-in **giving history** on mobile (Phase 2).
- Pastor provides: Zeffy church account, fund names, who receives exports.

### 2. Live stream & media

- Keep **YouTube Live** + staff **Go live** (Sanity + `/api/live-status`).
- Mobile **Live** tab + home banner (done).
- Phase 2: transcripts (Whisper), captions, archive download — no paid Vimeo unless church decides later.
- Unified Zoom join: web + mobile use `/join` (configured via Sanity → **Church Zoom join URL**).

### 3. Content & back office (non-technical admins)

- **Sanity Studio** training for hero, themes, sermon posts, live toggle.
- **Staff portal** for events, prayers, members, blog drafts, translations.
- Short **video or one-page guide** per role: Pastor (live/sermons), office (events), finance (Zeffy + reports).
- WordPress **RSS**: optional import to Sanity or replace with Sanity blog only — Pastor to confirm.

### 4. Events & calendar

- Staff creates events in `/staff/events` (recurring supported in schema).
- Web: full detail + **Add to calendar** (iCal).
- Mobile: native events list + calendar button (Phase 2).
- Same data via `/api/mobile/home`.

### 5. Notifications & email (Wednesday prayer, Sunday worship)

- `notification_prefs` + `email_subscribers` (DB ready).
- **OneSignal** for push; **Resend** for email — templates: Wed evening prayer, Sunday 10 AM, live now.
- Staff toggle schedules in portal (to build); no duplicate manual Facebook-only workflow required.

### 6. Global reach (souls worldwide)

- **8 languages** on web and mobile UI (done).
- SEO + `hreflang`, sermon/podcast RSS, share links.
- Sermon translation workflow (DeepL draft + staff review) — Phase 3.
- Fast, accessible site (Core Web Vitals) on Vercel CDN.

---

## Phased delivery (no throwaway demos)

| Phase | Focus | Outcome |
|-------|--------|---------|
| **2A** (now) | Credentials + push + Zeffy | Live giving, scheduled notifications, App Store prep |
| **2B** | Staff UX polish | Simpler event/prayer/notification screens; mobile About/Events native |
| **3** | Media + global | Transcripts, offline audio, WordPress RSS decision, more locales |

---

## Credentials checklist (from Pastor visit)

- [ ] Sanity Studio login (editor role)
- [ ] Supabase staff accounts promoted (`pnpm promote:member`)
- [ ] Zeffy nonprofit account + fund list
- [ ] YouTube / Restream / Facebook
- [ ] Resend domain (or use Supabase email for magic links only at first)
- [ ] OneSignal app (optional Phase 2A)
- [ ] Apple / Google developer accounts (when publishing app)

---

## Related docs

- [PROJECT_STATUS.md](./PROJECT_STATUS.md) — current ship state
- [ROADMAP.md](./ROADMAP.md) — phase checklist
- [MOBILE_SETUP.md](./MOBILE_SETUP.md) — app env and auth
- [LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md) — Sunday live workflow
- [AUTH_TROUBLESHOOTING.md](./AUTH_TROUBLESHOOTING.md) — sign-in
