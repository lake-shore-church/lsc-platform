import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { colors } from "@/constants/tokens";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

const FUNDS = [
  {
    icon: "business-outline" as const,
    color: colors.primary,
    title: "General Fund",
    body: "Support weekly ministry and operations",
  },
  {
    icon: "construct-outline" as const,
    color: colors.accent,
    title: "Building Fund",
    body: "Establishing our church home",
  },
  {
    icon: "earth-outline" as const,
    color: colors.amber,
    title: "Missions Fund",
    body: "Reaching the world with the gospel",
  },
] as const;

export default function GiveScreen() {
  const [selected, setSelected] = useState(0);
  const [showWebView, setShowWebView] = useState(false);
  const giveUrl = `${APP_URL.replace(/\/$/, "")}/give`;

  if (showWebView) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable style={styles.closeBar} onPress={() => setShowWebView(false)}>
          <Text style={styles.closeText}>← Back</Text>
        </Pressable>
        <WebView source={{ uri: giveUrl }} style={{ flex: 1 }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Give to Lake Shore Church</Text>
        <Text style={styles.heroSub}>Support our ministry in the West Loop</Text>
        <Text style={styles.heroNote}>100% of your gift goes to the church</Text>
      </View>

      {FUNDS.map((fund, index) => {
        const isSelected = selected === index;
        return (
          <Pressable
            key={fund.title}
            style={[styles.fundCard, isSelected && styles.fundCardSelected]}
            onPress={() => setSelected(index)}
          >
            <View style={styles.fundRow}>
              <Ionicons name={fund.icon} size={28} color={fund.color} />
              <View style={styles.fundBody}>
                <Text style={styles.fundTitle}>{fund.title}</Text>
                <Text style={styles.fundText}>{fund.body}</Text>
              </View>
              {isSelected ? (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              ) : null}
            </View>
          </Pressable>
        );
      })}

      <Pressable style={styles.button} onPress={() => setShowWebView(true)}>
        <Text style={styles.buttonText}>Give now →</Text>
      </Pressable>

      <View style={styles.feeRow}>
        <Ionicons name="shield-checkmark-outline" size={16} color={colors.textMuted} />
        <Text style={styles.feeText}>Zeffy · 0% platform fees</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  content: { paddingBottom: 40 },
  hero: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 20,
  },
  heroTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  heroSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 6 },
  heroNote: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 8 },
  fundCard: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fundCardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}08`,
  },
  fundRow: { flexDirection: "row", alignItems: "center" },
  fundBody: { flex: 1, marginLeft: 12 },
  fundTitle: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  fundText: { marginTop: 4, fontSize: 13, color: colors.textMuted },
  button: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  feeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    gap: 6,
  },
  feeText: { fontSize: 12, color: colors.textMuted },
  closeBar: { padding: 12, backgroundColor: colors.primary },
  closeText: { color: "#fff", fontWeight: "600" },
});
