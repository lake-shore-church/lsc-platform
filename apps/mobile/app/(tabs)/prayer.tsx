import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchJson, type MobilePrayer } from "@/lib/api";
import type { ThemePalette } from "@/constants/themes";
import { useTheme } from "@/lib/ThemeContext";

const SUCCESS = "#166534";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";
const MAX_CHARS = 500;

function statusLabel(status?: string): string {
  switch (status) {
    case "prayed":
      return "Prayed ✓";
    case "in_progress":
      return "Being prayed for";
    default:
      return "New";
  }
}

export default function PrayerScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [prayers, setPrayers] = useState<MobilePrayer[]>([]);
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadPrayers = () => {
    fetchJson<{ prayers: MobilePrayer[] }>("/api/prayers")
      .then((res) => setPrayers(res.prayers))
      .catch(() => setPrayers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPrayers();
  }, []);

  async function handleSubmit() {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${APP_URL}/api/prayer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          isPrivate,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      if (res.ok) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setSubmitted(true);
        setContent("");
        setName("");
        setEmail("");
        if (!isPrivate) loadPrayers();
      }
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setIsPrivate(false);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.formCard}>
        {submitted ? (
          <View style={styles.success}>
            <Ionicons name="checkmark-circle" size={56} color={SUCCESS} />
            <Text style={styles.successTitle}>Your prayer has been received</Text>
            <Text style={styles.successSub}>Our team will pray for you</Text>
            <Pressable style={styles.linkBtn} onPress={resetForm}>
              <Text style={styles.linkBtnText}>Submit another</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.formTitle}>Share a prayer request</Text>
            <TextInput
              style={styles.textarea}
              multiline
              placeholder="Share what's on your heart…"
              value={content}
              onChangeText={(t) => setContent(t.slice(0, MAX_CHARS))}
              placeholderTextColor={colors.textMuted}
              maxLength={MAX_CHARS}
            />
            <Text style={styles.counter}>
              {content.length}/{MAX_CHARS}
            </Text>

            <Text style={styles.privacyLabel}>Who can see this?</Text>
            <View style={styles.privacyRow}>
              <Pressable
                style={[styles.privacyBtn, !isPrivate && styles.privacyBtnActive]}
                onPress={() => setIsPrivate(false)}
              >
                <Text style={[styles.privacyText, !isPrivate && styles.privacyTextActive]}>
                  Public
                </Text>
              </Pressable>
              <Pressable
                style={[styles.privacyBtn, isPrivate && styles.privacyBtnActive]}
                onPress={() => setIsPrivate(true)}
              >
                <Text style={[styles.privacyText, isPrivate && styles.privacyTextActive]}>
                  Private
                </Text>
              </Pressable>
            </View>
            <Text style={styles.privacyHint}>
              {isPrivate
                ? "Only church staff will see this request."
                : "May appear on the community prayer wall."}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Your name (optional)"
              value={name}
              onChangeText={setName}
              placeholderTextColor={colors.textMuted}
            />
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              placeholder="Email for confirmation (optional)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textMuted}
            />

            <Pressable
              style={[styles.button, submitting && styles.buttonDisabled]}
              onPress={() => void handleSubmit()}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Submit prayer request</Text>
              )}
            </Pressable>
          </>
        )}
      </View>

      <Text style={styles.wallTitle}>Community prayers</Text>
      {loading ? <ActivityIndicator color={colors.primary} style={{ marginTop: 12 }} /> : null}
      {prayers.map((p) => {
        const prayed = prayedIds.has(p.id);
        return (
          <View key={p.id} style={styles.prayerCard}>
            <Text style={styles.prayerText} numberOfLines={4}>
              {p.content}
            </Text>
            <View style={styles.prayerFooter}>
              <View>
                <Text style={styles.prayerDate}>
                  {new Date(p.created_at).toLocaleDateString()}
                </Text>
                <Text style={styles.statusBadge}>{statusLabel(p.status)}</Text>
              </View>
              <Pressable
                style={[styles.prayBtn, prayed && styles.prayBtnDone]}
                onPress={() => {
                  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setPrayedIds((prev) => new Set(prev).add(p.id));
                }}
              >
                <Text style={[styles.prayBtnText, prayed && styles.prayBtnTextDone]}>
                  {prayed ? "Praying ✓" : "Pray 🙏"}
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  content: { padding: 16, paddingBottom: 40 },
  formCard: {
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formTitle: { fontSize: 18, fontWeight: "700", color: colors.textPrimary, marginBottom: 12 },
  textarea: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
    color: colors.textPrimary,
  },
  counter: { textAlign: "right", fontSize: 11, color: colors.textMuted, marginTop: 4 },
  privacyLabel: { marginTop: 14, fontSize: 13, color: colors.textMuted },
  privacyRow: { flexDirection: "row", gap: 10, marginTop: 8 },
  privacyBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  privacyBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  privacyText: { fontWeight: "600", color: colors.textMuted },
  privacyTextActive: { color: "#fff" },
  privacyHint: { fontSize: 11, color: colors.textMuted, marginTop: 6 },
  input: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  button: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  success: { alignItems: "center", paddingVertical: 20 },
  successTitle: { marginTop: 12, fontSize: 18, fontWeight: "700", color: colors.textPrimary },
  successSub: { marginTop: 6, fontSize: 14, color: colors.textMuted },
  linkBtn: { marginTop: 16 },
  linkBtnText: { color: colors.primary, fontWeight: "700", fontSize: 15 },
  wallTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  prayerCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  prayerText: { fontSize: 14, lineHeight: 21, color: colors.textPrimary },
  prayerFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  prayerDate: { fontSize: 11, color: colors.textMuted },
  statusBadge: { fontSize: 11, color: colors.primary, fontWeight: "600", marginTop: 2 },
  prayBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: `${colors.primary}14`,
  },
  prayBtnDone: { backgroundColor: `${SUCCESS}18` },
  prayBtnText: { color: colors.primary, fontWeight: "700", fontSize: 13 },
  prayBtnTextDone: { color: SUCCESS },
});
}
