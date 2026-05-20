# LSC Platform — SDLC stack

> **Canonical infrastructure doc.** Update when hosting or vendors change.

**Organization:** Lake Shore Church West Loop, Chicago  
**Product:** Public website + member/staff portals + iOS/Android app

---

## Stack overview

| Layer | Choice | Notes |
|-------|--------|-------|
| Monorepo | Turborepo + pnpm | `apps/web`, `apps/mobile`, `packages/*` |
| Web | Next.js App Router | Vercel hosting (planned) |
| Mobile | Expo + React Native | EAS Build (planned) |
| Database + Auth | Supabase | Postgres, RLS, Edge Functions, Realtime |
| CMS | Sanity.io | Staff-editable content; embedded Studio `/studio` |
| Media | Cloudflare R2 | Buckets: `lsc-media`, `lsc-docs`, `lsc-captions`, `lsc-financials` |
| DNS / CDN | Cloudflare | `media.lschurch.com` |
| Email | Resend + React Email | Transactional |
| Push | OneSignal | Mobile notifications |
| Giving | Zeffy embed | 0% fees; nightly sync → `giving_records` |
| Transcription | OpenAI Whisper | Edge Function on sermon upload |
| Translation (Phase 3) | DeepL | Subtitles / `translations` table |
| i18n (Phase 3) | next-intl | `/es` `/fr` `/pt` `/zh` |

---

## SDLC by stage

### Discovery & planning

| Tool | Status |
|------|--------|
| `docs/PROJECT_STATUS.md` | ✅ Living status |
| `docs/ROADMAP.md` | ✅ Phased plan |
| `.cursorrules` + blueprint HTML/PDF | ✅ In parent `LSAG Church` folder |
| `/platform` page | ✅ Dev status mirror |
| GitHub Projects | ⏳ Optional |

### Development

| Tool | Status |
|------|--------|
| Cursor + `AGENTS.md` | ✅ |
| Local `.env.local` | ✅ Maintainer machine |
| `pnpm run verify` | ✅ typecheck + lint |

### CI/CD (planned)

| Tool | Status |
|------|--------|
| GitHub Actions | ⏳ lint + test on PR |
| Vercel preview deploys | ⏳ per PR |
| EAS | ⏳ mobile |

### Production

| Tool | Status |
|------|--------|
| Vercel production | ⏳ |
| Supabase production | ✅ |
| Sanity production dataset | ✅ |

---

## Environment variables (reference)

Client-safe: `NEXT_PUBLIC_SUPABASE_*`, `NEXT_PUBLIC_SANITY_*`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_MEDIA_URL`, `NEXT_PUBLIC_ONESIGNAL_APP_ID`.

Server-only: `SUPABASE_SERVICE_ROLE_KEY`, `SANITY_API_TOKEN`, `CLOUDFLARE_R2_*`, `RESEND_*`, `OPENAI_API_KEY`, `ONESIGNAL_REST_API_KEY`, `DEEPL_API_KEY`.

Full template: `apps/web/.env.local` (gitignored).
