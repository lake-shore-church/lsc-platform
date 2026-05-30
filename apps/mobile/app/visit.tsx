import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { ThemePalette } from "@/constants/themes";
import { CHURCH } from "@/constants/church";
import { nativeRoutes } from "@/lib/navigation";
import { t } from "@/lib/i18n";
import { useThemedStyles } from "@/lib/useThemedStyles";
import { useTheme } from "@/lib/ThemeContext";

export default function VisitScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <>
      <Stack.Screen options={{ title: t("visit", "page_title"), headerBackTitle: "Home" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.lead}>{t("visit", "page_desc")}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("visit", "service_times")}</Text>
          <Text style={styles.body}>{CHURCH.serviceTime}</Text>
          <Text style={[styles.body, styles.muted]}>{t("home", "doors_open")}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("visit", "location")}</Text>
          <Text style={styles.body}>{CHURCH.address}</Text>
          <Pressable onPress={() => void Linking.openURL(CHURCH.mapsUrl)}>
            <Text style={styles.link}>{t("home", "get_directions")}</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("visit", "what_to_expect")}</Text>
          {[1, 2, 3, 4].map((n) => (
            <Text key={n} style={styles.bullet}>
              • {t("visit", `expect_${n}` as "expect_1")}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("visit", "parking")}</Text>
          <Text style={styles.body}>{t("visit", "parking_desc")}</Text>
        </View>

        <Pressable style={styles.primaryBtn} onPress={() => router.push(nativeRoutes.contact)}>
          <Text style={styles.primaryBtnText}>{t("visit", "ask_question")}</Text>
        </Pressable>
        <Pressable onPress={() => void Linking.openURL(`tel:${CHURCH.phoneTel}`)}>
          <Text style={styles.phone}>
            {t("visit", "call").replace("{phone}", CHURCH.servicePhone)}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    content: { padding: 16, paddingBottom: 40 },
    lead: { fontSize: 16, lineHeight: 24, color: colors.textPrimary, marginBottom: 16 },
    card: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: { fontSize: 17, fontWeight: "700", color: colors.primary, marginBottom: 8 },
    body: { fontSize: 15, lineHeight: 22, color: colors.textPrimary },
    muted: { marginTop: 4, color: colors.textMuted, fontSize: 14 },
    bullet: { fontSize: 15, lineHeight: 22, color: colors.textPrimary, marginTop: 6 },
    link: { marginTop: 10, fontSize: 15, fontWeight: "600", color: colors.primary },
    primaryBtn: {
      marginTop: 8,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: "center",
    },
    primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    phone: {
      marginTop: 16,
      textAlign: "center",
      fontSize: 15,
      fontWeight: "600",
      color: colors.primary,
    },
  });
}
