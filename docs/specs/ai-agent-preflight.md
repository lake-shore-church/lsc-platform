# AI agent pre-flight (read before solutioning)

**Purpose:** Non-negotiables for LSC Platform so agents do not violate architecture, security, or doc hygiene.

**Rule for AI agents:** At the start of any session involving architecture, new packages, auth, or multi-file features, **read this file and give the human a short bullet recap of §1–§6**, then proceed.

**Rule for humans:** Paste into chat when starting a big task:

> Read `docs/specs/ai-agent-preflight.md` and remind me of the non-negotiables before we build X.

---

## 1. Product and trust (non-negotiable)

| Topic | Rule |
|-------|------|
| **Church data** | Prayer requests, giving, members — **RLS in Postgres** is primary; never rely on UI-only hiding. |
| **Roles** | `public` / `member` / `staff` / `admin` — enforce in Supabase policies and Next.js middleware (second layer). |
| **Secrets** | Service role, Sanity token, R2 keys — **server-only** env vars; never `NEXT_PUBLIC_` except anon key + public IDs. |
| **Media** | All files → **Cloudflare R2**, not Supabase Storage. |
| **Giving copy** | Zeffy primary; do not promise PayPal Giving Fund until Sanity toggle + 501(c)(3). |
| **PDFs** | Tithing/financial PDFs — **server-side** API routes only (`@react-pdf/renderer`). |

---

## 2. Architecture (know before you design)

| Topic | Reality |
|-------|---------|
| **Business logic** | `packages/db` and `packages/cms` only — **never** duplicate queries in `apps/web` or `apps/mobile`. |
| **Apps** | Web and mobile import from `packages/*` — **never** from each other. |
| **Web data** | Next.js **Server Components** for fetching — no `useEffect` for initial data. |
| **Supabase client** | Single typed client in `packages/db/client.ts`. |
| **Sanity** | GROQ in `packages/cms/queries/` — not inline in components. |
| **Monorepo** | pnpm workspaces + Turborepo; package names `@repo/db`, `@repo/ui`, etc. |

---

## 3. Process (so work does not drift)

| Topic | Rule |
|-------|------|
| **Status docs** | After meaningful work → `docs/CHANGELOG.md`, `docs/PROJECT_STATUS.md`, often `docs/ai/MAINTAINER-NOTES.md`. |
| **Branches** | Planned work on `feature/<topic>` → PR to `main`. |
| **Verify** | `pnpm run verify` before push. |
| **Single source** | Architecture: **`.cursorrules`**. Session state: **`docs/ai/CONTEXT.md`**. |
| **Prompt hub** | [docs/prompts/copy-paste.md](../prompts/copy-paste.md) — merge new blocks; do not replace wholesale. |

---

## 4. Services (before integrating a new vendor)

| Service | Project ref |
|---------|-------------|
| Supabase | `zstnygokvxrrszvkfejs` |
| Sanity | `7hl877lg` / `production` |
| GitHub | `lake-shore-church/lsc-platform` |
| Web hosting | Vercel (planned) |
| Mobile builds | EAS (`eas.json`; run `eas init`) — see [MOBILE_SETUP.md](../MOBILE_SETUP.md) |
| Media CDN | Cloudflare R2 + `media.lschurch.com` |

Confirm credentials exist in local `.env.local` before testing integrations.

---

## 5. Default build order (unless human reprioritizes)

Checkboxes live in **[PROJECT_STATUS.md](../PROJECT_STATUS.md)** and **[ROADMAP.md](../ROADMAP.md)**.

1. **Foundation** — monorepo, Supabase migration, `@repo/db` ✅
2. **`packages/cms`** — Sanity schemas + GROQ ✅
3. **Web shell** — public routes, 8 locales, beliefs, dedication ✅
4. **Auth** — web + mobile magic link ✅
5. **Staff tools** — prayers, events, financials, translations ✅
6. **Mobile** — tabs + API + auth ✅; offline audio, push ⏳
7. **Phase 2+** — R2, Zeffy live, Whisper, per-locale beliefs copy

---

## 6. End-of-session checklist (for AI agents)

- [ ] Violated any row in **§1**?
- [ ] Updated **`docs/CHANGELOG.md`** and **`docs/PROJECT_STATUS.md`**?
- [ ] Updated **`docs/ai/CONTEXT.md`** session snapshot?
- [ ] Updated **`docs/ai/MAINTAINER-NOTES.md`** if non-trivial?
- [ ] If new env vars → documented names in `.cursorrules` / CONTEXT only (no secret values)?
- [ ] Ran **`pnpm run verify`** if code changed?
