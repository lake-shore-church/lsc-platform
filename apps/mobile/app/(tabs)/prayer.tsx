import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchJson, type MobilePrayer } from "@/lib/api";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function PrayerScreen() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [prayers, setPrayers] = useState<MobilePrayer[]>([]);
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
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setContent("");
        if (!isPrivate) loadPrayers();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Share your prayer request</Text>
      <TextInput
        style={styles.textarea}
        multiline
        placeholder="Share your prayer request"
        value={content}
        onChangeText={setContent}
        placeholderTextColor="#94a3b8"
      />
      <TextInput
        style={styles.input}
        placeholder="Your name (optional)"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#94a3b8"
      />
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Private request</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} />
      </View>
      <Pressable
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>{submitting ? "Sending…" : "Submit"}</Text>
      </Pressable>
      {submitted ? (
        <Text style={styles.success}>
          Your prayer has been received ✓ We will pray for you.
        </Text>
      ) : null}

      <Text style={[styles.heading, { marginTop: 32 }]}>Community prayer wall</Text>
      {loading ? <ActivityIndicator color="#1B4F8A" /> : null}
      {prayers.map((p) => (
        <View key={p.id} style={styles.prayerCard}>
          <Text style={styles.prayerText}>{p.content}</Text>
          <Text style={styles.prayerDate}>
            {new Date(p.created_at).toLocaleDateString()}
          </Text>
          <Pressable style={styles.prayButton}>
            <Text style={styles.prayButtonText}>Pray</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 18, fontWeight: "700", color: "#1B4F8A", marginBottom: 12 },
  textarea: {
    minHeight: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    textAlignVertical: "top",
  },
  input: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  toggleLabel: { fontSize: 15, color: "#334155" },
  button: {
    marginTop: 16,
    backgroundColor: "#1B4F8A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  success: { marginTop: 12, color: "#0F7B6C", fontSize: 15 },
  prayerCard: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  prayerText: { fontSize: 15, color: "#0f172a", lineHeight: 22 },
  prayerDate: { marginTop: 8, fontSize: 12, color: "#94a3b8" },
  prayButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#e0f2fe",
  },
  prayButtonText: { color: "#1B4F8A", fontWeight: "600" },
});
