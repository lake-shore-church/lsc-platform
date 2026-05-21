# Lake Shore Church — Tech Team Guide

**Audience:** Church volunteers or staff who help with computers, the website, or “making it live” — not necessarily professional developers.  
**Last updated:** 2026-05-21  
**Website mirror:** [/platform/tech](http://localhost:3000/platform/tech) (internal, not linked from the public site)

---

## Quick summary

| Who | What they do |
|-----|----------------|
| **Pastor, office, comms** | Edit words in **Sanity Studio** (`/studio`) — sermons, about page, taglines. No code. |
| **Tech team (you)** | Keep the site running, deploy updates, manage passwords, fix “it’s broken.” |
| **Developer / Cursor** | Builds new features (member login, staff portal, etc.). |

The public church site does **not** require tech skills day to day. Tech work is occasional: go-live, updates, and troubleshooting.

---

## Two “versions” of the website

| Version | URL | Who sees it |
|---------|-----|-------------|
| **Local (dev)** | `http://localhost:3000` | Only on the computer where `pnpm dev` is running |
| **Live (production)** | Vercel URL or `https://lschurch.com` | Anyone on the internet |

**localhost** = practice / building. Closing the laptop or stopping the dev server → “site can’t be reached.”  
**Vercel / lschurch.com** = real church website.

---

## Accounts & services (keep a password manager entry)

| Service | What it’s for | Where to manage |
|---------|---------------|-----------------|
| **GitHub** | Code storage; merge updates | [github.com/lake-shore-church/lsc-platform](https://github.com/lake-shore-church/lsc-platform) |
| **Vercel** | Hosts the live website | [vercel.com](https://vercel.com) |
| **Sanity** | Content database + Studio login | [sanity.io/manage](https://www.sanity.io/manage) → project `7hl877lg` |
| **Supabase** | Events, prayers, members data | [supabase.com](https://supabase.com) → project `zstnygokvxrrszvkfejs` |
| **Resend** | Email from contact/prayer forms | [resend.com](https://resend.com) (when configured) |

**Project IDs (for support tickets):**

- Sanity project: `7hl877lg`, dataset: `production`
- Supabase project: `zstnygokvxrrszvkfejs`

---

## For church staff — Sanity Studio (no code)

1. Open **`/studio`** on the live site (after deploy) or `http://localhost:3000/studio` locally.
2. Sign in with the church’s Sanity account (Google or email).
3. Edit documents → click **Publish** (drafts do not appear on the public site).

**Main document types:**

| Type | Use for |
|------|---------|
| **Site configuration** | Home page headlines, address, service time, default theme |
| **Sermon** | Title, video link, scripture, date |
| **Page** | About, Beliefs |
| **Blog post** | Devotionals / announcements |
| **Staff bio** | Pastor & leaders |
| **Sermon series** | Grouping sermons (e.g. Resurrection) |

**Events and prayer requests** are stored in **Supabase**, not Sanity. Staff manage them in the **staff portal** at `/staff` (prayers, events, members, financials). Sign in at `/login` with a magic link; promote roles with `pnpm promote:member <email> staff`.

**Mobile app** — See **[MOBILE_SETUP.md](./MOBILE_SETUP.md)** for env vars, Supabase redirect `lschurch://auth/callback`, and EAS. The app reads CMS data from the web API (`/api/mobile/*`); run `pnpm --filter web dev` when testing mobile locally.

---

## For the tech team — run the site on your computer

**Requirements:** Node 18+, `pnpm`, repo cloned to your machine.

```bash
cd "/path/to/lsc-platform"
pnpm install
pnpm --filter web dev
```

Wait for `✓ Ready`, then open **http://localhost:3000**.

**Secrets file (never commit):** `apps/web/.env.local`  
Copy from a teammate or from `apps/web/.env.production.example` and fill in real keys.

**If the dev server crashes** after config changes, run `pnpm --filter web dev` again. If you see a Turbopack “workspace root” error, ensure `apps/web/next.config.js` includes `turbopack.root` (already set in this repo).

---

## Sanity CORS (required once per URL)

Studio in the browser must be allowed to talk to Sanity.

1. Go to [Sanity API → CORS](https://www.sanity.io/manage/project/7hl877lg/api#cors-origins)
2. **Add CORS origin:** `http://localhost:3000` — enable **Allow credentials**
3. After **Vercel deploy**, also add: `https://your-project.vercel.app` and eventually `https://lschurch.com`

Without this, Studio shows “Before you continue… add CORS URL.”

---

## Seed sample content (optional, tech only)

Refreshes demo sermon, pages, blog, site config in Sanity + sample events/prayer in Supabase:

```bash
pnpm seed:content
```

Requires `SANITY_API_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY` in `apps/web/.env.local`.

---

## Go live on Vercel (step-by-step)

**Goal:** A public link anyone can open (e.g. for Pastor Brian), without your laptop running.

**GitHub:** `main` is the default branch (PR #1 merged). Vercel should deploy from **`main`** only.

### Option A — New Vercel project (recommended)

1. Sign in at [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import **`lake-shore-church/lsc-platform`**.
3. **Production Branch:** `main` (should be default).
4. **Root Directory:** click **Edit** → set to **`apps/web`** → Enable **“Include source files outside of the Root Directory”** (monorepo).
5. Leave **Framework** as Next.js (uses `apps/web/vercel.json` for install/build).
6. Add env vars (Step 3 below) → **Deploy**.

### Option B — Existing Vercel project (switch to `main`)

1. Vercel → your **lsc-platform** project → **Settings** → **Git**.
2. **Production Branch** → change to **`main`** → Save.
3. **Settings** → **General** → **Root Directory** → **`apps/web`** (enable include files outside root).
4. **Deployments** → **Redeploy** latest, or push any commit to `main` to trigger a build.

### CLI deploy (optional, for tech team)

```bash
npx vercel login          # once, in your browser
cd apps/web
npx vercel link           # link to church Vercel team/project
npx vercel --prod         # deploy production from local
```

### Step 3 — Environment variables (one time)

In Vercel → Project → **Settings** → **Environment Variables**, add each line from:

`apps/web/.env.production.example`

Use the **same values** as `apps/web/.env.local` on a machine that already works (Supabase URL/keys, Sanity project ID, `SANITY_API_TOKEN`, etc.).

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** — server only |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `7hl877lg` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | **Secret** — for server/API |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL or `https://lschurch.com` |
| `RESEND_API_KEY` | When email is ready |
| Others | Add when those features are turned on |

### Step 4 — Deploy

Click **Deploy**. First build may take several minutes.

### Step 5 — After deploy

1. Open the Vercel URL → click through Home, Sermons, Events, About.
2. Add the **Vercel URL** to Sanity CORS (see above).
3. Open **`/studio`** on the live URL and confirm login works.
4. Optional: point **lschurch.com** DNS to Vercel (church domain registrar).

---

## What “PR” means (plain language)

A **pull request (PR)** is a proposal to merge finished work into the main codebase.  
You do **not** need PRs for editing sermons in Studio.

You **do** need a merged PR when **new features or code** should go live (e.g. member portal later).

---

## Troubleshooting

| Problem | Likely fix |
|---------|------------|
| `localhost refused to connect` | Dev server not running → `pnpm --filter web dev` |
| Studio: “add CORS URL” | Add origin in Sanity manage (see above) |
| Studio: “no access to project” | Invite user’s email in Sanity → Members |
| Public page empty but Studio has content | Click **Publish** in Studio; hard-refresh browser |
| Events page empty | Run `pnpm seed:content` or add events in Supabase (staff tools later) |
| Build fails on Vercel | Check build logs; missing env var is the most common cause |

---

## Recording changes in docs (tech team habit)

When you deploy or change how something works, update:

| File | When |
|------|------|
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | “What’s done / what’s next” |
| [CHANGELOG.md](./CHANGELOG.md) | One line per change (date + what) |
| **This file** | New URLs, new contacts, revised deploy steps |

**Living status page:** [/platform](http://localhost:3000/platform) — shows status, roadmap, changelog from those files.

---

## Member & staff portals (roles)

New sign-ins get role **`public`** until a tech admin promotes them in Supabase.

1. Supabase → **Table Editor** → `profiles` → find the user’s row  
2. Set `role` to **`member`** (member portal) or **`staff`** (staff portal)  
3. For full member features, also add a row in **`members`** with the same `id` as the profile

| URL | Role required |
|-----|----------------|
| `/login` | Anyone (magic link) |
| `/member/dashboard` | `member`, `staff`, or `admin` |
| `/staff/prayers` | `staff` or `admin` |

**Supabase Auth:** add redirect URL `http://localhost:3000/auth/callback` (and your Vercel URL after deploy) under **Authentication → URL configuration**.

## Roadmap (what’s coming)

| Phase | What | Who uses it |
|-------|------|-------------|
| **Done** | Public site, Studio, sample content, Vercel config | Everyone / staff |
| **Done** | Magic link login, member + staff portals (baseline) | Members & church team |
| **Next** | Event create/edit UI, R2 sermon upload, tithing PDFs | Staff |

Details: [ROADMAP.md](./ROADMAP.md)

---

## Contacts & handoff

| Question | Ask |
|----------|-----|
| Wording, sermons, beliefs copy | Pastor Brian / comms — use Studio |
| Site down, deploy, passwords | Tech team (this doc) |
| New features, bugs in code | Developer / Cursor sessions |

**Repo:** [lake-shore-church/lsc-platform](https://github.com/lake-shore-church/lsc-platform)

---

## Checklist: first production launch

- [ ] PR merged to `main`
- [ ] Vercel project created and env vars set
- [ ] Deploy succeeded; public URL works
- [ ] Sanity CORS includes production URL
- [ ] `/studio` works on production URL
- [ ] `PROJECT_STATUS.md` updated with live URL
- [ ] Pastor Brian has Studio login (Sanity member invite)
