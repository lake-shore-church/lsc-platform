import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EventCard } from "@/components/EventCard";
import type { ThemePalette } from "@/constants/themes";
import { fetchJson, type MobileEvent } from "@/lib/api";
import { backLabelFrom } from "@/lib/navigation";
import { t } from "@/lib/i18n";
import { useThemedStyles } from "@/lib/useThemedStyles";
import { useTheme } from "@/lib/ThemeContext";

export default function EventsScreen() {
  const { from } = useLocalSearchParams<{ from?: string }>();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const backTitle = backLabelFrom(from);
  const [events, setEvents] = useState<MobileEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [ministry, setMinistry] = useState("");

  useEffect(() => {
    fetchJson<{ events: MobileEvent[] }>("/api/mobile/events")
      .then((res) => setEvents(res.events ?? []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const ministries = useMemo(
    () =>
      [...new Set(events.map((e) => e.ministry_area).filter(Boolean))] as string[],
    [events],
  );

  const filtered = useMemo(() => {
    if (!ministry) return events;
    return events.filter((e) => e.ministry_area === ministry);
  }, [events, ministry]);

  const cardFrom = from === "more" ? ("more" as const) : ("events" as const);

  return (
    <>
      <Stack.Screen options={{ title: t("events", "page_title"), headerBackTitle: backTitle }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.lead}>{t("events", "page_desc")}</Text>

        {ministries.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
            <Pressable
              style={[styles.chip, !ministry && styles.chipActive]}
              onPress={() => setMinistry("")}
            >
              <Text style={[styles.chipText, !ministry && styles.chipTextActive]}>
                {t("events", "all_ministries")}
              </Text>
            </Pressable>
            {ministries.map((m) => (
              <Pressable
                key={m}
                style={[styles.chip, ministry === m && styles.chipActive]}
                onPress={() => setMinistry(m)}
              >
                <Text style={[styles.chipText, ministry === m && styles.chipTextActive]}>
                  {m}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : null}

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 24 }} />
        ) : filtered.length ? (
          filtered.map((event) => (
            <EventCard key={event.id} event={event} from={cardFrom} />
          ))
        ) : (
          <Text style={styles.empty}>{t("events", "no_events")}</Text>
        )}
      </ScrollView>
    </>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    content: { paddingTop: 12, paddingBottom: 32 },
    lead: {
      paddingHorizontal: 16,
      fontSize: 15,
      lineHeight: 22,
      color: colors.textMuted,
      marginBottom: 12,
    },
    chips: { marginBottom: 8, paddingHorizontal: 12 },
    chip: {
      marginHorizontal: 4,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    chipText: { fontSize: 13, fontWeight: "600", color: colors.textMuted },
    chipTextActive: { color: "#fff" },
    empty: { paddingHorizontal: 16, color: colors.textMuted, fontSize: 15 },
  });
}
