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

When **Active**, add website records (keep MX for email). See `docs/handover/CHURCH_ACCOUNTS.local.md` or [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md).

---

## OneSignal — find Audience (subscribers)

1. Go to **[onesignal.com](https://onesignal.com)** and sign in.
2. Open app **Lake Shore Church** (top left or dashboard).
3. Left sidebar → **Audience** (under “Audience” section; icon may look like people).
4. Tab **All Users** or **Subscriptions** — you should see count **1** after someone clicks **Allow** on the website.

**Test subscribe:** Chrome → https://lsc-platform-kappa.vercel.app → wait ~10 seconds → allow notifications.

---

## Vercel — fix prayer form (most common issue)

Prayer needs **`SUPABASE_SERVICE_ROLE_KEY`** — the **service_role** secret, **not** the anon key.

1. [Supabase](https://supabase.com/dashboard/project/zstnygokvxrrszvkfejs/settings/api) → **Project API keys** → **service_role** → **Reveal** → Copy.
2. Or copy from `apps/web/.env.local` line `SUPABASE_SERVICE_ROLE_KEY=...`
3. [Vercel](https://vercel.com) → **lsc-platform** → **Settings** → **Environment Variables**
4. Edit **`SUPABASE_SERVICE_ROLE_KEY`** — paste full key → **Production** + **Preview** → Save.
5. **Deployments** → latest → **⋯** → **Redeploy**.

**Test:** Prayer page → **Public** → at least 10 characters in message → Submit.

---

## Resend — see if email sent

[resend.com/emails](https://resend.com/emails) → **Logs** (not “Audience”).

Contact form success = check logs for “Contact form: …”
