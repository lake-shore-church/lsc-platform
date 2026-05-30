import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { ThemePalette } from "@/constants/themes";
import { fetchJson, type MobileEvent } from "@/lib/api";
import { backLabelFrom } from "@/lib/navigation";
import { submitEventRsvp } from "@/lib/rsvp";
import { getI18n, t } from "@/lib/i18n";
import { useThemedStyles } from "@/lib/useThemedStyles";
import { useTheme } from "@/lib/ThemeContext";

function formatEventWhen(startsAt: string, endsAt?: string | null): string {
  const start = new Date(startsAt);
  const startText = start.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  if (!endsAt) return startText;
  const end = new Date(endsAt);
  const endText = end.toLocaleString(undefined, { hour: "numeric", minute: "2-digit" });
  return `${startText} – ${endText}`;
}

export default function EventDetailScreen() {
  const { id, from } = useLocalSearchParams<{ id: string; from?: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const backTitle = backLabelFrom(from);
  const [event, setEvent] = useState<MobileEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchJson<{ event: MobileEvent }>(`/api/mobile/events/${id}`)
      .then((res) => setEvent(res.event))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function onRsvp() {
    if (!event) return;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName || !trimmedEmail) {
      Alert.alert(t("events", "rsvp"), "Name and email are required.");
      return;
    }
    setSubmitting(true);
    try {
      await submitEventRsvp({
        event_id: event.id,
        name: trimmedName,
        email: trimmedEmail,
      });
      setConfirmed(true);
    } catch (err) {
      Alert.alert(
        t("events", "rsvp"),
        err instanceof Error ? err.message : "Unable to complete RSVP.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t("events", "page_title"), headerBackTitle: backTitle }} />
        <View style={[styles.centered, { backgroundColor: colors.surface }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Stack.Screen options={{ title: t("events", "page_title"), headerBackTitle: backTitle }} />
        <View style={[styles.centered, { backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.textPrimary }}>Event not found.</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.link}>Go back</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: event.title, headerBackTitle: backTitle }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.when}>{formatEventWhen(event.starts_at, event.ends_at)}</Text>
        {event.location ? <Text style={styles.meta}>{event.location}</Text> : null}
        {event.ministry_area ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{event.ministry_area}</Text>
          </View>
        ) : null}
        {event.description ? <Text style={styles.body}>{event.description}</Text> : null}

        <View style={styles.rsvpCard}>
          <Text style={styles.rsvpTitle}>
            {getI18n().t("events.rsvp_title", { title: event.title })}
          </Text>
          {confirmed ? (
            <Text style={styles.confirmed}>{t("events", "confirmed")}</Text>
          ) : (
            <>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t("events", "name")}
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                autoComplete="name"
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t("events", "email")}
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <Pressable
                style={[styles.button, submitting && styles.buttonDisabled]}
                onPress={() => void onRsvp()}
                disabled={submitting}
              >
                <Text style={styles.buttonText}>
                  {submitting ? "…" : t("events", "confirm")}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    content: { padding: 16, paddingBottom: 40 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    when: { fontSize: 15, lineHeight: 22, color: colors.textPrimary, fontWeight: "600" },
    meta: { marginTop: 8, fontSize: 14, color: colors.textMuted },
    chip: {
      alignSelf: "flex-start",
      marginTop: 12,
      backgroundColor: `${colors.primary}14`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
    },
    chipText: { color: colors.primary, fontWeight: "600", fontSize: 13 },
    body: { marginTop: 16, fontSize: 16, lineHeight: 24, color: colors.textPrimary },
    rsvpCard: {
      marginTop: 24,
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
    },
    rsvpTitle: { fontSize: 17, fontWeight: "700", color: colors.primary },
    input: {
      marginTop: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.textPrimary,
      backgroundColor: colors.surface,
    },
    button: {
      marginTop: 12,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: "center",
    },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    confirmed: { marginTop: 12, fontSize: 15, fontWeight: "600", color: colors.primary },
    link: { marginTop: 12, color: colors.primary, fontWeight: "600" },
  });
}
