import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "@/lib/ThemeContext";
import { fetchJson } from "@/lib/api";

type GiveConfig = {
  zeffyEmbedUrl: string | null;
  paypalGivingEnabled: boolean;
  paypalGivingUrl: string | null;
  churchTaxId: string | null;
};

const FUNDS = [
  { icon: "heart-outline" as const, title: "Tithe / Offering", body: "General giving" },
  { icon: "earth-outline" as const, title: "Missions", body: "Outreach and missions" },
  { icon: "construct-outline" as const, title: "Building Fund", body: "Church building" },
  { icon: "hand-left-outline" as const, title: "Mercy Fund", body: "Helping those in need" },
  { icon: "ellipsis-horizontal-outline" as const, title: "Other", body: "Miscellaneous giving" },
] as const;

export default function GiveScreen() {
  const { colors } = useTheme();
  const [config, setConfig] = useState<GiveConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [showZeffy, setShowZeffy] = useState(false);

  useEffect(() => {
    fetchJson<GiveConfig>("/api/mobile/config")
      .then(setConfig)
      .catch(() =>
        setConfig({
          zeffyEmbedUrl: null,
          paypalGivingEnabled: true,
          paypalGivingUrl: null,
          churchTaxId: null,
        }),
      )
      .finally(() => setLoading(false));
  }, []);

  const zeffyUrl = config?.zeffyEmbedUrl?.trim();

  if (showZeffy && zeffyUrl) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable
          style={[styles.closeBar, { backgroundColor: colors.primary }]}
          onPress={() => setShowZeffy(false)}
        >
          <Text style={styles.closeText}>← Back</Text>
        </Pressable>
        <WebView source={{ uri: zeffyUrl }} style={{ flex: 1 }} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.surface }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const ein = config?.churchTaxId?.trim();

  function onGiveNow() {
    if (zeffyUrl) {
      setShowZeffy(true);
      return;
    }
    if (config?.paypalGivingEnabled) {
      void WebBrowser.openBrowserAsync(
        config.paypalGivingUrl?.trim() || "https://www.paypal.com/us/webapps/mpp/givingfund",
      );
      return;
    }
    Alert.alert(
      "Online giving",
      "Online giving is not configured yet. Contact the church office for other ways to give.",
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <Text style={styles.heroTitle}>Give to Lake Shore Church</Text>
        <Text style={styles.heroSub}>Support our ministry in the West Loop</Text>
        <Text style={styles.heroNote}>100% of your gift goes to the church</Text>
      </View>

      {FUNDS.map((fund) => (
        <View
          key={fund.title}
          style={[styles.fundCard, { backgroundColor: colors.background, borderColor: colors.border }]}
        >
          <View style={styles.fundRow}>
            <Ionicons name={fund.icon} size={28} color={colors.primary} />
            <View style={styles.fundBody}>
              <Text style={[styles.fundTitle, { color: colors.textPrimary }]}>{fund.title}</Text>
              <Text style={[styles.fundText, { color: colors.textMuted }]}>{fund.body}</Text>
            </View>
          </View>
        </View>
      ))}

      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onGiveNow}
      >
        <Text style={styles.buttonText}>
          {zeffyUrl ? "Give now (Zeffy) →" : "Give via PayPal →"}
        </Text>
      </Pressable>

      {config?.paypalGivingEnabled && zeffyUrl ? (
        <Pressable
          style={[styles.paypalBtn, { borderColor: colors.primary }]}
          onPress={() =>
            void WebBrowser.openBrowserAsync(
              config.paypalGivingUrl?.trim() ||
                "https://www.paypal.com/us/webapps/mpp/givingfund",
            )
          }
        >
          <Text style={[styles.paypalText, { color: colors.primary }]}>Give via PayPal Giving Fund</Text>
        </Pressable>
      ) : null}

      <View style={[styles.trustBadge, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <Text style={[styles.trustTitle, { color: colors.primary }]}>
          Registered 501(c)(3) nonprofit
        </Text>
        <Text style={[styles.trustBody, { color: colors.textMuted }]}>
          Your donation is tax-deductible to the full extent permitted by law.
          {ein ? ` EIN: ${ein}` : " EIN will be listed once confirmed."}
        </Text>
      </View>

      <View style={styles.feeRow}>
        <Ionicons name="shield-checkmark-outline" size={16} color={colors.textMuted} />
        <Text style={[styles.feeText, { color: colors.textMuted }]}>
          {zeffyUrl ? "Zeffy · 0% platform fees" : "PayPal Giving Fund"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  hero: { marginHorizontal: 16, marginTop: 16, borderRadius: 14, padding: 20 },
  heroTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  heroSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 6 },
  heroNote: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 8 },
  fundCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  fundRow: { flexDirection: "row", alignItems: "center" },
  fundBody: { flex: 1, marginLeft: 12 },
  fundTitle: { fontSize: 16, fontWeight: "700" },
  fundText: { marginTop: 4, fontSize: 13 },
  button: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  paypalBtn: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 14,
    alignItems: "center",
  },
  paypalText: { fontWeight: "700", fontSize: 15 },
  trustBadge: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  trustTitle: { fontSize: 14, fontWeight: "700" },
  trustBody: { marginTop: 6, fontSize: 13, lineHeight: 19 },
  feeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    marginBottom: 32,
    gap: 6,
  },
  feeText: { fontSize: 12 },
  closeBar: { padding: 12 },
  closeText: { color: "#fff", fontWeight: "600" },
});
