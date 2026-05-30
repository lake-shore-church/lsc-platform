import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { nativeRoutes } from "@/lib/navigation";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";

export function HomeFooterCta() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.primary }]}>
      <Text style={styles.title}>{t("home", "ready_next_step")}</Text>
      <Text style={styles.sub}>{t("home", "join_this_sunday")}</Text>
      <View style={styles.actions}>
        <Pressable
          style={[styles.btnPrimary, { backgroundColor: colors.accent }]}
          onPress={() => router.push(nativeRoutes.visit)}
        >
          <Text style={styles.btnPrimaryText}>{t("home", "plan_visit")}</Text>
        </Pressable>
        <Pressable
          style={styles.btnOutline}
          onPress={() => router.push(nativeRoutes.contact)}
        >
          <Text style={styles.btnOutlineText}>{t("home", "contact_us")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, paddingVertical: 28, alignItems: "center" },
  title: { color: "#fff", fontSize: 22, fontWeight: "800", textAlign: "center" },
  sub: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
    maxWidth: 320,
  },
  actions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 18 },
  btnPrimary: { borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  btnOutline: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  btnOutlineText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
