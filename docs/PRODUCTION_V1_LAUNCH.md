# Production v1 — Church website launch

**Goal:** A complete, presentable **public website** for Lake Shore Church.  
**Deployment 2 (later):** In-house live video (Subsplash replacement) + full online giving (Zeffy embed).

---

## Already on production

Every push to `main` deploys automatically to:

**https://lsc-platform-kappa.vercel.app**

This **is** production hosting. “Launch” for the church usually means:

1. Pastor/members use that URL today, **or**
2. Point **`lschurch.com`** at Vercel when Cloudflare DNS is Active ([DOMAIN_SETUP_SIMPLE.md](./DOMAIN_SETUP_SIMPLE.md))

You do **not** need a second codebase deploy for v1 — you need confidence in content + optional custom domain.

---

## What v1 includes (ready now)

| Area | Route(s) | Status for v1 |
|------|----------|----------------|
| Home (hero, this week, events, testimonials) | `/` | ✅ Weekly content seeded May 26 |
| Plan a visit | `/visit` | ✅ |
| Beliefs | `/beliefs` | ✅ |
| Ministries (40+ topics, one URL each) | `/ministries`, `/ministries/[slug]` | ✅ Not “7-page merge” — full catalogue by design |
| Sermons + detail | `/sermons`, `/sermons/[slug]` | ✅ 10+ seeded; staff can import YouTube |
| Podcast RSS | `/podcast.xml` | ✅ iTunes/Spotify can subscribe |
| Blog / devotionals | `/blog` | ✅ Sanity posts; optional WordPress RSS import later |
| Events + RSVP | `/events` | ✅ Supabase; this week’s lunch + midweek seeded |
| Prayer requests | `/prayer` | ✅ Saves to DB; Resend ack when env set |
| Contact | `/contact` | ✅ |
| FAQ | `/faq` | ✅ |
| Leaders | `/about/leaders` | ✅ |
| Testimonies | `/testimonies` | ✅ |
| Zoom join (Sun + Wed) | `/join` | ✅ One-click from Pastor’s email |
| Give (fund descriptions) | `/give` | ✅ Page works; **Zeffy iframe** = Deployment 2 when URL ready |
| Live (countdown + prayer) | `/live` | ✅ Honest “in-house player coming”; not full Mevo yet |
| Dedication | `/dedication` | ✅ |
| 8 languages | `/es`, `/zh`, … | ✅ UI translated; CMS hero English |
| Sanity Studio | `/studio` | ✅ Pastor can edit site config, sermons |
| Staff portal | `/staff/*` | ✅ Events, prayers, sermons (staff login) |

**RSS links to share:**

- Podcast: `https://lsc-platform-kappa.vercel.app/podcast.xml`  
- (Use `https://lschurch.com/podcast.xml` after DNS)

---

## Deployment 2 — explicitly deferred

| Feature | Why wait | Doc |
|---------|----------|-----|
| **Paid Mux in-house video** | Optional upgrade; **$0 path ships now** (Mevo → YouTube in app) | [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md) |
| **Zeffy giving embed** | Needs church Zeffy account + embed URL in Studio | [ZEFFY_SETUP.md](./ZEFFY_SETUP.md) |
| **PayPal Giving Fund** | Optional; enable in Studio when 501(c)(3) ready | [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md) |
| **OneSignal push** | Nice-to-have; not required for website v1 | [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md) |
| **Mobile App Store** | Separate EAS / TestFlight track | [MOBILE_SETUP.md](./MOBILE_SETUP.md) |

Tell Pastor: *“The website is live. Giving and Sunday video on the site are phase two; everything else is ready.”*

---

## What we did **not** do (clarification)

- **“Consolidated 7 pages”** from the mega-spec was **not** shipped — Pastor kept the **ministries catalogue** (`/ministries/*`) on purpose. See [CONTENT_PLATFORM_EVALUATION.md](./CONTENT_PLATFORM_EVALUATION.md).
- **CP-1 `thisWeek` document** is on PR #3 — optional merge; v1 uses `siteConfig` weekly fields (already updated from Pastor’s email).

---

## v1 launch checklist (today)

### Must-do (30 min)

- [ ] Walk site using [DEMO_MEETING_CHECKLIST.md](./DEMO_MEETING_CHECKLIST.md)
- [ ] Confirm home shows **How Satan Influences the World** / May 31 (re-run `pnpm seed:weekly-update` if needed)
- [ ] Share production URL with Pastor + members attending the meeting
- [ ] Studio login: show Pastor **Site configuration** for weekly edits

### Should-do (when ready)

- [ ] Cloudflare **Active** → add `lschurch.com` in Vercel → DNS records
- [ ] Resend: verify `hello@lschurch.com` when domain is live
- [ ] Merge [PR #3](https://github.com/lake-shore-church/lsc-platform/pull/3) (thisWeek) when reviewed — cleaner Tuesday workflow

### Deployment 2 (next sprint)

- [ ] Zeffy embed URL in Studio
- [ ] Mevo → YouTube one-time setup — [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md)
- [ ] Optional: paid Mux in-house — [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md)
- [ ] Optional: `pnpm import:pastor-blog-rss` if Pastor wants WordPress posts in Sanity

---

## Verdict

**Yes — you can treat the website as v1 production today** on the Vercel URL (and `lschurch.com` when DNS is ready).  

**$0 live streaming** is documented and ready once Mevo points at YouTube; full online giving (Zeffy embed) is the main “coming next” item for the site tour.
