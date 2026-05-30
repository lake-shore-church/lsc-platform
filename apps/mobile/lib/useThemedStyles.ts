import { useMemo } from "react";
import type { ThemePalette } from "@/constants/themes";
import { useTheme } from "@/lib/ThemeContext";

/** Build StyleSheet styles from the active theme palette (updates when user picks a theme). */
export function useThemedStyles<T>(create: (colors: ThemePalette) => T): T {
  const { colors } = useTheme();
  return useMemo(() => create(colors), [colors, create]);
}
