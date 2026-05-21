/** Cookie name used by next-intl middleware (must match routing.localeCookie). */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_STORAGE_KEY = "lsc-lang";

/** Persist locale for middleware + client; survives navigation and subpages. */
export function setLocalePreference(locale: string): void {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${maxAge};SameSite=Lax`;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* private browsing */
  }
}
