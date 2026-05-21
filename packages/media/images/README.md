# Shared media (`@repo/media`)

**One folder for web + mobile.** Drop your church photos here; both apps import from `@repo/media`.

## Homepage images (required)

| File | Web | Mobile (when wired) |
|------|-----|---------------------|
| `home/chicago_highrises.webp` | Top banner (hero) | Splash / hero (optional) |
| `home/plan_a_visit.webp` | “New here” / plan a visit section | — |
| `home/worship.jpg` | Worship card | — |
| `home/flipping_bible.webp` | Grow / Bible card | — |
| `home/serve.jpg` | Serve card | — |

**Suggested sizes:** hero 1920×1080; others ~1200×750 (16:10) or 1200×900 (community).

**Format:** JPG or WebP (update imports in `src/index.ts` if you change extension).

## Replace placeholders

Temporary stock placeholders are included so the site builds. **Replace each file** with your own photo (same filename).

## After adding files

```bash
# Web — refresh localhost:3000
pnpm --filter web dev

# Mobile — restart Expo after adding images used in the app
pnpm --filter mobile start
```

## Adding more images

1. Add file under `images/` (e.g. `images/events/sunday.jpg`).
2. Import in `packages/media/src/index.ts` and export.
3. Use in web: `import { homeImages } from "@repo/media"`.
4. Use in mobile: `import { homeImages } from "@repo/media"` (same import).

Sermon/event photos should still come from **Sanity CMS** when staff upload content.
