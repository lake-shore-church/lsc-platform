# Help — find things in Cloudflare & OneSignal

Plain clicks for stewards (no jargon).

---

## Cloudflare — is `lschurch.com` Active?

1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com)** and sign in.
2. On the home page you see a list of sites. Click **`lschurch.com`**.
3. Look at the top of the main area:
   - **Active** (green) = nameservers are working. You can add DNS for Vercel.
   - **Pending** / “Complete the instructions” / “Waiting for nameservers” = still propagating. Wait and check again later.
4. **DNS records:** left sidebar → **DNS** → **Records**.

When **Active** (you have this now), add website records (keep MX for email):

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `76.76.21.21` | Proxied (orange) |
| CNAME | `www` | `cname.vercel-dns.com` | Proxied |

Remove old **Squarespace** A records on `lschurch.com` and change `www` away from `ext-cust.squarespace.com`.

Then [Vercel](https://vercel.com) → **lsc-platform** → **Settings** → **Domains** → add `lschurch.com` and `www.lschurch.com`.

See [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md).

---

## OneSignal — find Audience (subscribers)

1. Go to **[onesignal.com](https://onesignal.com)** and sign in.
2. Open app **Lake Shore Church** (top left or dashboard).
3. Left sidebar → **Audience** → **Subscriptions** (or **Users**).
   - **Not** the **Segments** list — segments are filters/groups; they show **0** until someone subscribes.
4. After a successful web subscribe you should see **Push subs: 1** on **Total Subscriptions** and a row under **Subscriptions**.

**OneSignal web settings (once):**

1. **Settings → Platforms → Web** → Site URL must include your live site, e.g.  
   `https://lsc-platform-kappa.vercel.app` (add `https://lschurch.com` when DNS is live).
2. Typical Site / HTTPS is fine for Vercel.

**Test subscribe:**

1. Confirm **`NEXT_PUBLIC_ONESIGNAL_APP_ID`** is on Vercel (see above) and site was **redeployed**.
2. Chrome → https://lsc-platform-kappa.vercel.app (use **Chrome**, not Safari first time).
3. Wait **10–20 seconds** on the page (slide prompt is delayed).
4. If no popup: click the **lock icon** left of the address bar → **Site settings** → **Notifications** → **Allow**.
5. Or Chrome menu → **Settings** → **Privacy and security** → **Site settings** → find `lsc-platform-kappa.vercel.app` → Notifications → Allow.
6. Refresh the page once.

Then check **Audience** again.

---

## Vercel — find or add environment variables

If you **cannot find** a variable, it may not exist yet — use **Add New**.

1. [vercel.com](https://vercel.com) → project **lsc-platform**
2. Top tabs → **Settings** (not Deployments)
3. Left sidebar → **Environment Variables**
4. Use the **Search** box: type `SUPABASE` or `ONESIGNAL`

### Add prayer fix — `SUPABASE_SERVICE_ROLE_KEY`

| Field | Value |
|-------|--------|
| Key | `SUPABASE_SERVICE_ROLE_KEY` |
| Value | From Supabase → [API keys](https://supabase.com/dashboard/project/zstnygokvxrrszvkfejs/settings/api) → **service_role** → Reveal **OR** copy from `apps/web/.env.local` line 10 |
| Environments | **Production** + **Preview** |

**Not** the `anon` / `public` key.

### Add push prompt — `NEXT_PUBLIC_ONESIGNAL_APP_ID`

Without this, **no notification popup** appears on the website.

| Field | Value |
|-------|--------|
| Key | `NEXT_PUBLIC_ONESIGNAL_APP_ID` |
| Value | `a1c03b58-9d26-4388-8d34-11d3c882bd8f` |
| Environments | **Production** + **Preview** |

Also confirm: `ONESIGNAL_REST_API_KEY`, `CRON_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.

### Redeploy (required)

**Deployments** → click top deployment → **⋯** → **Redeploy** → wait **Ready**.

**Test prayer:** `/prayer` → **Public** → 10+ words → Submit.  
**Test push:** Chrome → homepage → wait 10–20 sec → Allow (see OneSignal section below).

---

## Resend — see if email sent

[resend.com/emails](https://resend.com/emails) → **Logs** (not “Audience”).

Contact form success = check logs for “Contact form: …”
