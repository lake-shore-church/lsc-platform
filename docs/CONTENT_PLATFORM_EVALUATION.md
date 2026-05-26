# Content platform mega-spec — evaluation (2026-05-26)

This document evaluates the **Claude “multi-agent content platform”** brief (seven core pages + `thisWeek` + visual editing + weekly email + multilingual automation) against **pastor priorities**, **shipped code**, and **operational realism**.

---

## Executive recommendation

**Do not execute that spec as a single delivery.**  
It is coherent as a north-star architecture, but it is multiple quarters of engineering in one sprint. Shipping it blindly would:

- Remove or bury URLs that shipped **recently on purpose** (ministries catalogue, FAQ, testimonies page, `/visit`, `/belief` anchors for SEO/bookmarks/mobile deep links).
- Duplicate state already in **`siteConfig`** (`upcomingSermon*`, `wednesday*`, Zoom, hero) unless we migrate carefully.
- Introduce **translation + email + Whisper** pipelines that imply new costs, quotas, review workflows, and legal/privacy checks (especially testimonies and beliefs).

**Proceed in thin vertical slices**, each testable by Pastor Brian in under 30 minutes—not “Agent A+B+C finish line.”

---

## Alignment with Pastor priorities (`docs/PASTOR_PRIORITIES.md`)

| Principle | Claude spec | Verdict |
|-----------|-------------|---------|
| One church platform | Yes | ✅ Aligned |
| Single source of truth | `thisWeek` doc + APIs | ⚠️ Aligned **if** folded into migration plan; clashes with existing `siteConfig` until migrated |
| Non-technical maintainers | Inline edit + staff `/staff/updates` | ✅ Goals align |
| Minimum pages | Compress to seven routes | ⚠️ **Needs explicit Pastor trade-off** vs ministry discovery and crawlable detail pages |

---

## What is strong in the Claude brief (borrow later)

| Idea | Notes |
|------|--------|
| **“This week” singleton** | Valuable—but start as fields on existing `siteConfig` **or** a single `weeklySchedule`/`thisWeek` document with migration from `upcomingSermon*` fields; avoid duplicate sources. |
| **GET `/api/this-week`** | Fine once schema is finalized; wire home + `/api/mobile/home` gradually. |
| **Add to calendar (.ics)** | Product win; reusable component—can ship standalone. |
| **Weekly pastor email archive** (`/updates`) | Fits “one archive” narrative; overlaps with **`blog`** and Resend—we should pick one primary story first (either “updates” CMS type **or** `blogPost` with a tag). |

---

## Risky / needs sign-off before code

### 1. Redirecting ministries to anchors on `/about`

The church asked for **all services catalogued without duplicate URLs**—we shipped **`/ministries` + `/ministries/[slug]`** intentionally. Folding every ministry into **`/about#ministries`**:

- Drops **bookmarkable URLs** per ministry unless we keep redirects from each slug to unique anchors (`/about#sunday-school` etc.), which duplicates maintenance.
- Weakens discovery (long scroll page vs focussed detail).

**Recommendation:** keep the ministry hub unless Pastor explicitly prefers the seven-page brochure model.

### 2. Merging FAQ, dedication, testimonials into single pages

FAQ has **FAQPage structured data**. Testimonies have **privacy** implications. Consolidation OK only if schemas and redirects are recreated carefully.

### 3. Fully automatic multilingual preaching copy

Doctrine-heavy content (beliefs, testimonies, sermons) should **not** be auto-published without review—pastor priorities already anticipate **staff translation workflow** (`/staff/translations`). The spec’s “auto publish Pastor voice” contradicts prudent governance.

### 4. Sanity Visual Editing everywhere

Adds **presentation mode**, CSP, CDN, preview hosts, and authoring UX work. Powerful but heavy; **simple allowlisted PATCH forms** (“Phase A: site config + this week”) are faster to adopt.

---

## Recommended phased plan (minimal scope per phase)

### Phase CP-0 — Freeze IA sign-off first (documentation only)

Paste this doc link to Pastor Brian. Decide:

- Keep **`/ministries/*`** yes/no  
- Confirm **seven pages** vs current IA  
- Confirm **notifications**: manual-only is fine; cron routes already exist env-gated  

### Phase CP-1 — Single source “this Sunday / this week” (no IA change)

**Smallest coherent win:**

- Either extend **`siteConfig`** with one extra group of weekly fields **or** add one Sanity document type **`thisWeek`** and **migrate** values from existing `siteConfig` fields via script.
- Expose **`GET /api/this-week`** (or extend **`/api/mobile/config`** incrementally).
- Update **homepage + mobile home** consumers only—not every page yet.

*(No removals of `/ministries`, `/faq`, `/visit`. No visual editing mandatory.)*

### Phase CP-2 — Pastor-simple editing (still no mega-merge)

**Allowlisted editors** (`staff/admin` OR email allowlist in `siteConfig`):

- PATCH API for **weekly block + hero image + theme** (same data as Phase CP-1).  
Optionally Visual Editing later.

### Phase CP-3 — `/connect` (optional)

Merge **events + prayer** only if usability testing shows overwhelm. Otherwise keep `/events` and `/prayer` with clearer nav labels.

### Phase CP-4 — `/updates`

New archive after **pastor-approved** UX: differentiate “weekly email” vs “blog” first to avoid duplicate content models.

---

## Branch note

Working on **`feature/content-platform`** is fine for **experimentation** once Phase CP-0 is signed off. **Do not** merge large redirect tables to `main` without:

- `pnpm run verify` green  
- Redirect map reviewed for SEO (`next.config`/middleware)  
- Sanity dataset backup / seed update plan  

---

## Sync line for tooling

```
Sync evaluation: defer full 7-page + visual editing + multilingual auto-send spec until IA sign-off 
and phased CP-1 (this-week single source) ships.
```

---

## Related docs

- [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md)  
- [PAGES_AND_MINISTRIES_MAP.md](./PAGES_AND_MINISTRIES_MAP.md)  
- [ai/CLAUDE_SYNC_PROMPT.md](./ai/CLAUDE_SYNC_PROMPT.md)  
- [PROJECT_STATUS.md](./PROJECT_STATUS.md)  
