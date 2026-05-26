import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CHURCH } from "@/constants/church";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";
import type { MobileThisWeek } from "@/lib/api";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "https://lsc-platform-kappa.vercel.app";

type Card = {
  icon: string;
  labelKey: string;
  lines: string[];
  onPress: () => void;
  linkKey: string;
};

export function ServiceInfoCards({ thisWeek }: { thisWeek?: MobileThisWeek | null }) {
  const { colors, siteCopy } = useTheme();
  const router = useRouter();

  const zoomUrl = siteCopy.zoomJoinRedirectUrl ?? `${APP_URL.replace(/\/$/, "")}/join`;

  const serviceLines = thisWeek
    ? [
        thisWeek.sunday_date_label ?? t("home", "every_sunday"),
        thisWeek.sunday_time,
        thisWeek.venue_name,
      ]
    : [t("home", "every_sunday"), "10:00 AM", t("home", "doors_open")];

  const cards: Card[] = [
    {
      icon: "📍",
      labelKey: "where_we_meet",
      lines: thisWeek
        ? [
            thisWeek.venue_name,
            thisWeek.venue_room ?? "38 S. Peoria St, 2nd floor",
            "Chicago, IL 60607",
          ]
        : ["Merit School of Music", "38 S. Peoria St, 2nd floor", "Chicago, IL 60607"],
      onPress: () => void Linking.openURL(CHURCH.mapsUrl),
      linkKey: "get_directions",
    },
    {
      icon: "🕙",
      labelKey: "service_time",
      lines: serviceLines,
      onPress: () => void Linking.openURL(`${APP_URL}/visit`),
      linkKey: "plan_visit",
    },
    {
      icon: "💻",
      labelKey: "join_zoom",
      lines: [
        t("home", "join_zoom_same_link"),
        siteCopy.zoomMeetingId ?? "830 7883 7399",
      ],
      onPress: () => void Linking.openURL(zoomUrl),
      linkKey: "join_zoom_cta",
    },
    {
      icon: "📺",
      labelKey: "watch_online",
      lines: [t("home", "miss_service"), t("home", "watch_archive")],
      onPress: () => router.push("/(tabs)/sermons"),
      linkKey: "watch_now",
    },
    {
      icon: "🙏",
      labelKey: "prayer_request",
      lines: [t("home", "submit_prayer_line1"), t("home", "submit_prayer_line2")],
      onPress: () => router.push("/(tabs)/prayer"),
      linkKey: "request_prayer",
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={[styles.wrap, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
    >
      {cards.map((card) => (
        <Pressable
          key={card.labelKey}
          onPress={card.onPress}
          style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}
        >
          <Text style={[styles.label, { color: colors.accent }]}>
            {card.icon} {t("home", card.labelKey).toUpperCase()}
          </Text>
          {card.lines.map((line) => (
            <Text key={line} style={[styles.line, { color: colors.textPrimary }]}>
              {line}
            </Text>
          ))}
          <Text style={[styles.link, { color: colors.primary }]}>{t("home", card.linkKey)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { borderBottomWidth: 1, paddingVertical: 12 },
  row: { paddingHorizontal: 12, gap: 10 },
  card: {
    width: 200,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  label: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  line: { marginTop: 6, fontSize: 14, lineHeight: 20 },
  link: { marginTop: 10, fontSize: 14, fontWeight: "600" },
});
