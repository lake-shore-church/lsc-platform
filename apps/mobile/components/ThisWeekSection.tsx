import type { MobileThisWeek } from "@/lib/api";
import * as Linking from "expo-linking";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "https://lsc-platform-kappa.vercel.app";

export function ThisWeekSection({ thisWeek }: { thisWeek: MobileThisWeek }) {
  const { colors } = useTheme();
  const zoomUrl = thisWeek.zoom_link ?? `${APP_URL.replace(/\/$/, "")}/join`;

  return (
    <View style={styles.wrap}>
      <Text style={[styles.heading, { color: colors.primary }]}>
        {t("home", "upcoming_sermon")}
      </Text>
      <View style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.primary }]}>{thisWeek.sermon_title}</Text>
        {thisWeek.sermon_scripture ? (
          <Text style={[styles.meta, { color: colors.textMuted }]}>{thisWeek.sermon_scripture}</Text>
        ) : null}
        {thisWeek.sunday_date_label ? (
          <Text style={[styles.meta, { color: colors.accent }]}>{thisWeek.sunday_date_label}</Text>
        ) : null}
        <Text style={[styles.venue, { color: colors.textPrimary }]}>
          {thisWeek.venue_name}
          {thisWeek.venue_room ? ` · ${thisWeek.venue_room}` : ""}
        </Text>
        {thisWeek.zoom_link ? (
          <Pressable onPress={() => void Linking.openURL(zoomUrl)}>
            <Text style={[styles.link, { color: colors.primary }]}>{t("home", "join_zoom")} →</Text>
          </Pressable>
        ) : null}
      </View>

      {thisWeek.wednesday_topic ? (
        <View
          style={[
            styles.card,
            styles.cardSpaced,
            { backgroundColor: colors.background, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.accent }]}>{t("home", "wednesday_prayer")}</Text>
          <Text style={[styles.title, { color: colors.primary }]}>{thisWeek.wednesday_topic}</Text>
          {thisWeek.wednesday_time ? (
            <Text style={[styles.meta, { color: colors.textMuted }]}>{thisWeek.wednesday_time}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  card: { borderRadius: 12, borderWidth: 1, padding: 16 },
  cardSpaced: { marginTop: 12 },
  label: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  title: { marginTop: 4, fontSize: 18, fontWeight: "700" },
  meta: { marginTop: 6, fontSize: 14 },
  venue: { marginTop: 8, fontSize: 14, lineHeight: 20 },
  link: { marginTop: 12, fontSize: 15, fontWeight: "600" },
});
