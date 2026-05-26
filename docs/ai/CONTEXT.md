# AI Context — LSC Platform

**Read at the start of every session** (with [ai-agent-preflight.md](../specs/ai-agent-preflight.md)).

---

## Session snapshot

| Field | Value |
|-------|-------|
| **Last updated** | 2026-05-26 |
| **Active branch** | `main` (production deploys from here) |
| **Current phase** | Phase 2A operational + content polish; edit-on-page planned |
| **Just completed** | Ministries/FAQ/leaders/testimonies; `/join` direct Zoom; OneSignal web subscriber; Vercel deploy fixes |
| **Next up** | Operational layer (Zeffy, Zoom pwd, weekly Sanity updates); inline edit Phase A (`siteConfig`) |
| **Blocked** | `lschurch.com` DNS; Pastor one-click Zoom URL; Zeffy embed URL |
| **Handover (secrets)** | `docs/handover/CHURCH_ACCOUNTS.local.md` (gitignored) |
| **Claude sync** | [CLAUDE_SYNC_PROMPT.md](./CLAUDE_SYNC_PROMPT.md) |
| **Mega content platform brief** | [CONTENT_PLATFORM_EVALUATION.md](../CONTENT_PLATFORM_EVALUATION.md) — phased; no wholesale 7-page merge without Pastor sign-off |

---

## Project

- **Name:** lsc-platform (Lake Shore Church West Loop, Chicago)
- **Repo:** https://github.com/lake-shore-church/lsc-platform
- **Workspace:** `/Users/usha/Documents/LSAG Church/lsc-platform`
- **Production web:** https://lsc-platform-kappa.vercel.app
- **Vision:** [PASTOR_PRIORITIES.md](../PASTOR_PRIORITIES.md) · **Activate:** [PHASE_2A_SETUP.md](../PHASE_2A_SETUP.md)

## Key docs

| Topic | Doc |
|-------|-----|
| Claude paste prompt | [CLAUDE_SYNC_PROMPT.md](./CLAUDE_SYNC_PROMPT.md) |
| Phase 2A activation | [PHASE_2A_SETUP.md](../PHASE_2A_SETUP.md) |
| Accounts / DNS / keys (local) | [handover/README.md](../handover/README.md) |
| Livestream / Mevo | [LIVESTREAM_SETUP.md](../LIVESTREAM_SETUP.md) |
| Mobile + auth | [MOBILE_SETUP.md](../MOBILE_SETUP.md) |
| Session log | [MAINTAINER-NOTES.md](./MAINTAINER-NOTES.md) |

## Production credentials (May 2026 — no secrets here)

| Service | Vercel / status |
|---------|-----------------|
| Supabase URL + anon + **service_role** | On Vercel; redeployed |
| Resend | `RESEND_*` on Vercel; **contact form verified** |
| OneSignal | App ID + REST + `CRON_SECRET` on Vercel; web SDK on **main** (worker fix deployed) |
| Custom domain | NS at Cloudflare; site **pending Active** |

## Shipped + Phase 2A branch

See [CLAUDE_SYNC_PROMPT.md](./CLAUDE_SYNC_PROMPT.md) for the full sync block.
