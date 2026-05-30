import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { homeImages } from "@repo/media";
import { nativeRoutes } from "@/lib/navigation";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";

export function NewHereSection() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>{t("home", "new_here")}</Text>
      <Text style={[styles.body, { color: colors.textMuted }]}>{t("home", "welcome_body")}</Text>
      <Pressable
        style={[styles.btn, { backgroundColor: colors.primary }]}
        onPress={() => router.push(nativeRoutes.visit)}
      >
        <Text style={styles.btnText}>{t("home", "plan_visit_btn")}</Text>
      </Pressable>
      <View style={styles.imageWrap}>
        <Image source={homeImages.community} style={styles.image} contentFit="cover" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingVertical: 24 },
  title: { fontSize: 22, fontWeight: "800" },
  body: { marginTop: 12, fontSize: 15, lineHeight: 22 },
  btn: {
    marginTop: 16,
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  imageWrap: {
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden",
    aspectRatio: 4 / 3,
  },
  image: { width: "100%", height: "100%" },
});
