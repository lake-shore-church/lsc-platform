# Magic link auth — troubleshooting

If sign-in fails on **web** (`/login`) or **mobile** (More → Sign in) with errors like *invalid auth*, *expired*, or *redirect URL*, work through this list.

## 1. Supabase redirect URLs (most common fix)

Open [Supabase → Authentication → URL Configuration](https://supabase.com/dashboard/project/zstnygokvxrrszvkfejs/auth/url-configuration).

**Site URL** — use **one** canonical production URL (not localhost) when pastors or members sign in on the live site:

- `https://lsc-platform-kappa.vercel.app` (or `https://lschurch.com` when the domain is live)

Use `http://localhost:3000` **only** when everyone on your team is testing locally that day. If Site URL is still `localhost`, **every magic-link email will point at localhost** even when someone uses `/login` on Vercel.

If the email link looks like `http://localhost:3000/?code=...` (root URL, no `/auth/callback`), fix Site URL + Redirect URLs below, request a **new** link, and the app will forward `?code=` to `/auth/callback` automatically.

**Redirect URLs** — add every line below (wildcards reduce Expo Go pain):

```
http://localhost:3000/auth/callback
https://lsc-platform-kappa.vercel.app/auth/callback
lschurch://auth/callback
lschurch://**
exp://**
http://localhost:8081/**
http://127.0.0.1:8081/**
```

**Expo web in Chrome** uses `http://localhost:8081/auth/callback` (port may differ — check the hint on the sign-in screen after sending a link). Add that exact URL or use `http://localhost:8081/**`.

For Expo Go without wildcards, you must add the **exact** URL the app uses. On the phone, request a magic link once; if Supabase returns a redirect error, the app shows the URL to paste into the dashboard. It looks like:

`exp://192.168.x.x:8081/--/auth/callback`

Your Mac’s LAN IP changes on different networks — `exp://**` avoids updating this every time.

Click **Save** in Supabase before testing again.

## 2. Web: test on the same host as the magic link

Magic links redirect to:

`{origin}/auth/callback?redirect=...`

- Local web dev: run `pnpm --filter web dev` and use **http://localhost:3000/login**
- Production: use **https://lsc-platform-kappa.vercel.app/login**

Do not start login on localhost and expect the email link to work if `NEXT_PUBLIC_APP_URL` pointed the link at Vercel (the app now prefers localhost when you’re on localhost).

## 3. Mobile: open the link on the same device

1. Request the link in **Expo Go** on your iPhone.
2. Open the email **on the iPhone** and tap the link.
3. It should open Expo Go → `auth/callback` → Home.

Opening the link on a laptop browser will **not** sign you into the phone app.

## 4. `Headers.append … is an invalid header value` (web login)

Usually a **stale or corrupted sign-in cookie** (Bearer token pasted 3×). The app now clears the session before sending a new magic link.

1. **Hard refresh** the login page (Cmd+Shift+R).
2. Try **Email me a sign-in link** again.
3. If it persists: Chrome → Settings → Privacy → clear **cookies for localhost** (or your site host).
4. On **Vercel**, check **Environment Variables** → `NEXT_PUBLIC_SUPABASE_ANON_KEY` is pasted **once** (no spaces, no `Bearer` prefix).

## 5. `email rate limit exceeded`

Supabase limits how many magic-link emails can be sent per hour (per email and per project). This often appears after many test logins in one session.

**What to do:**

1. **Wait** ~60 minutes, then request **one** new link (do not spam the button).
2. **Test with a different email** (e.g. a second Gmail alias).
3. **Raise limits (dev):** [Supabase Dashboard](https://supabase.com/dashboard/project/zstnygokvxrrszvkfejs/auth/rate-limits) → **Authentication** → **Rate limits** → increase email/OTP limits for your project.
4. Check **Authentication → Logs** for repeated failed sends.

This is **not** a bug in the church app — it is Supabase protecting against email abuse.

## 6. “Expired or already used”

- Request a **fresh** link (only the newest works).
- Some email apps **prefetch** links and burn them — try Gmail on the phone or long-press → Open in Expo Go.
- Wait for the full redirect; don’t tap the link twice.

## 7. After first successful sign-in (member/staff portal)

Promote your user so `/member` works:

```bash
cd lsc-platform
pnpm promote:member your@email.com member
# staff portal:
pnpm promote:member your@email.com staff
```

## 8. Still stuck?

1. Supabase → **Authentication → Logs** — check failed sign-in reason.  
2. Web: browser devtools → Network on `/auth/callback`.  
3. Mobile: Metro terminal when returning from the email link.  
4. Confirm `EXPO_PUBLIC_SUPABASE_*` in `apps/mobile/.env` matches `NEXT_PUBLIC_SUPABASE_*` in `apps/web/.env.local` (same project).

See also [MOBILE_SETUP.md](./MOBILE_SETUP.md) and [TECH-TEAM-GUIDE.md](./TECH-TEAM-GUIDE.md).
