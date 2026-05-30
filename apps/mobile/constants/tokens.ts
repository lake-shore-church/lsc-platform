/**
 * @deprecated Use `useTheme()` from `@/lib/ThemeContext` for theme-aware colors.
 * Static tokens only match the default "bold" theme and do not update at runtime.
 */
export { THEME_PALETTES, DEFAULT_THEME_ID } from "./themes";

import { THEME_PALETTES, DEFAULT_THEME_ID } from "./themes";

/** @deprecated Use `useTheme().colors` instead. */
export const colors = {
  primary: THEME_PALETTES[DEFAULT_THEME_ID].primary,
  primaryDark: THEME_PALETTES[DEFAULT_THEME_ID].primaryDark,
  accent: THEME_PALETTES[DEFAULT_THEME_ID].accent,
  amber: THEME_PALETTES[DEFAULT_THEME_ID].amber,
  background: THEME_PALETTES[DEFAULT_THEME_ID].background,
  surface: THEME_PALETTES[DEFAULT_THEME_ID].surface,
  border: THEME_PALETTES[DEFAULT_THEME_ID].border,
  textPrimary: THEME_PALETTES[DEFAULT_THEME_ID].textPrimary,
  textMuted: THEME_PALETTES[DEFAULT_THEME_ID].textMuted,
  error: THEME_PALETTES[DEFAULT_THEME_ID].error,
  success: "#166534",
} as const;
