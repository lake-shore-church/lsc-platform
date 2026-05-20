import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const ZEFFY_URL = "https://www.zeffy.com/";

const FUNDS = [
  {
    emoji: "🏛",
    title: "General Fund",
    body: "Support weekly ministry and operations",
  },
  {
    emoji: "🏗",
    title: "Building Fund",
    body: "Help us establish our church home",
  },
  {
    emoji: "🌍",
    title: "Missions Fund",
    body: "Reach the world with the gospel",
  },
] as const;

export default function GiveScreen() {
  const [showWebView, setShowWebView] = useState(false);

  if (showWebView) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable style={styles.closeBar} onPress={() => setShowWebView(false)}>
          <Text style={styles.closeText}>← Back</Text>
        </Pressable>
        <WebView source={{ uri: ZEFFY_URL }} style={{ flex: 1 }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Give to Lake Shore Church</Text>
      <Text style={styles.subtitle}>Support our ministry in the West Loop</Text>
      {FUNDS.map((fund) => (
        <View key={fund.title} style={styles.card}>
          <Text style={styles.emoji}>{fund.emoji}</Text>
          <Text style={styles.cardTitle}>{fund.title}</Text>
          <Text style={styles.cardBody}>{fund.body}</Text>
        </View>
      ))}
      <Pressable style={styles.button} onPress={() => setShowWebView(true)}>
        <Text style={styles.buttonText}>Give Now</Text>
      </Pressable>
      <Text style={styles.note}>
        Lake Shore Church uses Zeffy — 100% of your gift goes directly to the church. No
        platform fees.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700", color: "#1B4F8A" },
  subtitle: { marginTop: 6, fontSize: 15, color: "#64748b" },
  card: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  emoji: { fontSize: 28 },
  cardTitle: { marginTop: 8, fontSize: 17, fontWeight: "700", color: "#1B4F8A" },
  cardBody: { marginTop: 4, fontSize: 14, color: "#64748b" },
  button: {
    marginTop: 24,
    backgroundColor: "#0F7B6C",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  note: { marginTop: 16, fontSize: 13, color: "#64748b", lineHeight: 20 },
  closeBar: { padding: 12, backgroundColor: "#1B4F8A" },
  closeText: { color: "#fff", fontWeight: "600" },
});
