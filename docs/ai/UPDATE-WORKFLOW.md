# Documentation update workflow

Follow this on **every PR, merge, or significant Cursor/Claude session** — same discipline as A11y Studio's changelog + maintainer notes.

## 1. CHANGELOG.md (required)

Add a new section at the top under `[Unreleased]` or a dated heading:

```markdown
## YYYY-MM-DD — Short title

**What changed:** …
**Why:** …
**Impact:** …
```

## 2. PROJECT_STATUS.md (required)

- Update **Last updated** date
- Move checkboxes (⏳ → 🟡 → ✅)
- Refresh **Immediate next steps** and **Git branches** if changed

## 3. ROADMAP.md (when phase/item status changes)

- Update table Status column for any item that shipped or started

## 4. ai/MAINTAINER-NOTES.md (when non-trivial)

One short dated paragraph: branch name, PR link, spec section, commit hash if useful.

## 5. Website `/platform` (automatic)

No separate edit — page reads `docs/PROJECT_STATUS.md` and `docs/ROADMAP.md` at build time. Rebuild or redeploy web app to refresh.

## 6. ai/CONTEXT.md (occasionally)

Update only when repo URL, branch strategy, or service IDs change.

## Cursor agents

Rule file `.cursor/rules/project-documentation.mdc` enforces steps 1–2 automatically.
