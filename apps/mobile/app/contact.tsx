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

const CHURCH_EMAIL = "hello@lschurch.com";

export default function ContactScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <>
      <Stack.Screen options={{ title: t("contact", "page_title"), headerBackTitle: "Back" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.lead}>{t("contact", "page_desc")}</Text>

        <View style={styles.card}>
          <Pressable style={styles.row} onPress={() => void Linking.openURL(`tel:${CHURCH.phoneTel}`)}>
            <Ionicons name="call-outline" size={22} color={colors.primary} />
            <View style={styles.rowBody}>
              <Text style={styles.label}>{t("contact", "phone")}</Text>
              <Text style={styles.value}>{CHURCH.phone}</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.row}
            onPress={() => void Linking.openURL(`mailto:${CHURCH_EMAIL}`)}
          >
            <Ionicons name="mail-outline" size={22} color={colors.primary} />
            <View style={styles.rowBody}>
              <Text style={styles.label}>{t("contact", "email")}</Text>
              <Text style={styles.value}>{CHURCH_EMAIL}</Text>
            </View>
          </Pressable>
          <Pressable style={styles.row} onPress={() => void Linking.openURL(CHURCH.mapsUrl)}>
            <Ionicons name="location-outline" size={22} color={colors.primary} />
            <View style={styles.rowBody}>
              <Text style={styles.label}>{t("contact", "address")}</Text>
              <Text style={styles.value}>{CHURCH.addressLine}</Text>
            </View>
          </Pressable>
        </View>

        <Pressable style={styles.outlineBtn} onPress={() => router.push(nativeRoutes.prayer)}>
          <Text style={styles.outlineBtnText}>{t("footer", "link_prayer")}</Text>
        </Pressable>
        <Pressable style={styles.primaryBtn} onPress={() => router.push(nativeRoutes.visit)}>
          <Text style={styles.primaryBtnText}>{t("footer", "link_visit")}</Text>
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
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 16,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowBody: { flex: 1 },
    label: { fontSize: 12, fontWeight: "700", color: colors.textMuted, textTransform: "uppercase" },
    value: { marginTop: 4, fontSize: 15, lineHeight: 22, color: colors.textPrimary },
    outlineBtn: {
      marginTop: 20,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: "center",
    },
    outlineBtnText: { color: colors.primary, fontWeight: "700", fontSize: 16 },
    primaryBtn: {
      marginTop: 12,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: "center",
    },
    primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  });
}
