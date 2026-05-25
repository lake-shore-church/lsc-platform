# Simple domain setup — `lschurch.com` → church website

**You already did the hard part:** Cloudflare shows **Active**.

Do these in order. Check each box when done. About **20 minutes**.

Secrets and keys: skip for now — this is DNS + Vercel only.

---

## Part A — Cloudflare (website only)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → click **lschurch.com**
2. Left menu → **DNS** → **Records**
3. **Delete** these (website only — old Squarespace):
   - All **A** records where Name is `lschurch.com` or `@` pointing to `198.185…` or `198.49…`
4. **Add** one record:
   - Type: **A**
   - Name: `@`
   - IPv4: `76.76.21.21`
   - Proxy: **Proxied** (orange cloud ON)
5. **Edit** the **www** record:
   - Type: **CNAME**
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy: **Proxied**
6. **Do not delete** **MX** records (email stays on Bluehost)

---

## Part B — Vercel (connect domain)

1. [vercel.com](https://vercel.com) → project **lsc-platform**
2. **Settings** → **Domains**
3. **Add** → `lschurch.com` → Continue
4. **Add** → `www.lschurch.com` → Continue
5. Wait until both show **Valid** (can take a few minutes after Part A)
6. Set **primary** domain to `lschurch.com` (redirect www → apex if Vercel asks)

---

## Part C — Test in browser

1. Open **https://lschurch.com** — should show the Lake Shore Church site (same as Vercel preview)
2. Open **https://www.lschurch.com** — should redirect or match

If you see an old Squarespace page, wait 15–30 minutes and try again (DNS cache).

---

## Later (not today)

- Resend: verify `lschurch.com` for church email sender
- Vercel env: `NEXT_PUBLIC_SITE_URL` = `https://lschurch.com`
- Prayer / OneSignal env vars (see [HELP_DASHBOARD_NAV.md](./HELP_DASHBOARD_NAV.md))

---

## Pastor teaching links (already on site)

No DNS needed. After next deploy, **About** page shows Pastor’s blog + podcast cards.

See [PASTOR_RSS_FEEDS.md](./PASTOR_RSS_FEEDS.md).
