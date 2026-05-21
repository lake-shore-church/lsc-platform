import { Pressable, StyleSheet, Text, View } from "react-native";
import { THEME_PALETTES, type ThemeId } from "@/constants/themes";
import { useTheme } from "@/lib/ThemeContext";

const ORDER: ThemeId[] = ["bold", "warm", "advent", "easter"];

export function ThemePicker() {
  const { themeId, setThemeId, cmsThemeId, colors } = useTheme();

  return (
    <View style={[styles.wrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Appearance</Text>
      <Text style={[styles.sub, { color: colors.textMuted }]}>
        Same themes as the website. Church default: {THEME_PALETTES[cmsThemeId].label}.
      </Text>
      <View style={styles.row}>
        {ORDER.map((id) => {
          const active = themeId === id;
          const palette = THEME_PALETTES[id];
          return (
            <Pressable
              key={id}
              onPress={() => setThemeId(id)}
              style={[
                styles.chip,
                { borderColor: palette.primary, backgroundColor: palette.surface },
                active && { backgroundColor: palette.primary },
              ]}
            >
              <Text style={[styles.chipText, { color: active ? "#fff" : palette.primary }]}>
                {palette.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: { fontSize: 16, fontWeight: "700" },
  sub: { marginTop: 4, fontSize: 13, lineHeight: 18 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 2,
  },
  chipText: { fontWeight: "700", fontSize: 13 },
});
