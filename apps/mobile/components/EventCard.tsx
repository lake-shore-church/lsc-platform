import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { ThemePalette } from "@/constants/themes";
import type { MobileEvent } from "@/lib/api";
import { useTheme } from "@/lib/ThemeContext";

type Props = {
  event: MobileEvent;
  onRsvp?: () => void;
  showRsvp?: boolean;
};

export function EventCard({ event, onRsvp, showRsvp }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const start = new Date(event.starts_at);
  const month = start.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = start.getDate().toString();
  const time = start.toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <View style={styles.card}>
      <View style={styles.dateBadge}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.meta}>
          {time}
          {event.location ? ` · ${event.location}` : ""}
        </Text>
      </View>
      {showRsvp && onRsvp ? (
        <Pressable onPress={onRsvp} hitSlop={8}>
          <Text style={styles.rsvp}>RSVP</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dateBadge: {
      width: 52,
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 8,
    },
    month: { color: "#fff", fontSize: 10, fontWeight: "700" },
    day: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 2 },
    body: { flex: 1, marginLeft: 12 },
    title: { fontSize: 15, fontWeight: "600", color: colors.textPrimary },
    meta: { marginTop: 4, fontSize: 13, color: colors.textMuted },
    rsvp: { fontSize: 14, fontWeight: "600", color: colors.primary, marginLeft: 8 },
  });
}
