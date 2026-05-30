import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { EventCard } from "@/components/EventCard";
import type { ThemePalette } from "@/constants/themes";
import { fetchJson, type MobileEvent } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useThemedStyles } from "@/lib/useThemedStyles";
import { useTheme } from "@/lib/ThemeContext";

export default function EventsScreen() {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [events, setEvents] = useState<MobileEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<{ events: MobileEvent[] }>("/api/mobile/events")
      .then((res) => setEvents(res.events ?? []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: t("footer", "link_events"), headerBackTitle: "Home" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 24 }} />
        ) : events.length ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
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
    empty: { paddingHorizontal: 16, color: colors.textMuted, fontSize: 15 },
  });
}
