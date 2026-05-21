import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SermonCard } from "@/components/SermonCard";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";
import type { MobileSermon } from "@/lib/api";

type Props = {
  latestSermon: MobileSermon | null;
};

export function FeaturedSeriesSection({ latestSermon }: Props) {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.primary }]}>
      <Text style={styles.label}>{t("home", "current_series")}</Text>
      <Text style={styles.title}>{t("home", "series_title")}</Text>
      <Text style={styles.by}>{t("home", "series_by")}</Text>
      <Text style={styles.desc}>{t("home", "series_desc")}</Text>
      <Pressable
        style={[styles.seriesBtn, { backgroundColor: colors.accent }]}
        onPress={() => router.push("/(tabs)/sermons")}
      >
        <Text style={styles.seriesBtnText}>{t("home", "watch_series")}</Text>
      </Pressable>

      {latestSermon ? (
        <View style={styles.latestWrap}>
          <Text style={styles.latestLabel}>{t("home", "latest_message")}</Text>
          <SermonCard
            sermon={latestSermon}
            compact
            onPress={() => router.push(`/sermon/${latestSermon.slug.current}`)}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingVertical: 24 },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 8 },
  by: { color: "rgba(255,255,255,0.9)", fontSize: 16, marginTop: 4 },
  desc: { color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 21, marginTop: 12 },
  seriesBtn: {
    marginTop: 16,
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  seriesBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  latestWrap: { marginTop: 20 },
  latestLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 0,
  },
});
