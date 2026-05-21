/** Mirrors web `data-theme` light palettes from packages/ui/web/tokens/themes.css */
export type ThemeId = "bold" | "warm" | "advent" | "easter";

export type ThemePalette = {
  id: ThemeId;
  label: string;
  primary: string;
  primaryDark: string;
  accent: string;
  background: string;
  surface: string;
  border: string;
  textPrimary: string;
  textMuted: string;
  heroOverlay: string;
  amber: string;
  error: string;
};

export const THEME_PALETTES: Record<ThemeId, ThemePalette> = {
  bold: {
    id: "bold",
    label: "Bold",
    primary: "#1B4F8A",
    primaryDark: "#163D6E",
    accent: "#0F7B6C",
    background: "#FFFFFF",
    surface: "#F4F4F8",
    border: "#D8D8E8",
    textPrimary: "#1A1A2E",
    textMuted: "#6B6B80",
    heroOverlay: "rgba(26, 26, 46, 0.72)",
    amber: "#B45309",
    error: "#991B1B",
  },
  warm: {
    id: "warm",
    label: "Warm",
    primary: "#2D4A22",
    primaryDark: "#243B1B",
    accent: "#C8860A",
    background: "#FDFAF5",
    surface: "#F5EFE4",
    border: "#DDD0B8",
    textPrimary: "#1C1208",
    textMuted: "#7A6540",
    heroOverlay: "rgba(20, 30, 15, 0.55)",
    amber: "#C8860A",
    error: "#991B1B",
  },
  advent: {
    id: "advent",
    label: "Advent",
    primary: "#6B1A1A",
    primaryDark: "#551515",
    accent: "#C4922A",
    background: "#FDFBF7",
    surface: "#F9F2E8",
    border: "#E8D4A8",
    textPrimary: "#1A0A00",
    textMuted: "#8B5E3C",
    heroOverlay: "rgba(30, 5, 5, 0.65)",
    amber: "#C4922A",
    error: "#991B1B",
  },
  easter: {
    id: "easter",
    label: "Easter",
    primary: "#2E4A7A",
    primaryDark: "#243C62",
    accent: "#7A9E4A",
    background: "#F8FBF8",
    surface: "#EEF4EE",
    border: "#C8D8C8",
    textPrimary: "#1A2818",
    textMuted: "#5A6A58",
    heroOverlay: "rgba(20, 40, 25, 0.55)",
    amber: "#7A9E4A",
    error: "#991B1B",
  },
};

export const DEFAULT_THEME_ID: ThemeId = "bold";

export function resolveThemeId(value?: string | null): ThemeId {
  if (value && value in THEME_PALETTES) return value as ThemeId;
  if (value === "default") return "bold";
  return DEFAULT_THEME_ID;
}
