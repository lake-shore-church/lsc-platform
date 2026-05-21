import * as WebBrowser from "expo-web-browser";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { homeImages } from "@repo/media";
import { useTheme } from "@/lib/ThemeContext";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "https://lsc-platform-kappa.vercel.app";

export function HomeHero() {
  const router = useRouter();
  const { colors, siteCopy } = useTheme();

  const h1 = siteCopy.tagline ?? "God raised Jesus from the dead!";
  const h2 = siteCopy.subTagline ?? "There is hope for all who follow him.";
  const body =
    siteCopy.heroBody ??
    "In a world of pain, death, and evil, there is hope in the Son of God.";

  return (
    <View style={styles.wrap}>
      <Image source={homeImages.hero} style={styles.image} contentFit="cover" />
      <View style={[styles.overlay, { backgroundColor: colors.heroOverlay }]} />
      <View style={styles.content}>
        <Text style={styles.h1}>{h1}</Text>
        <Text style={styles.h2}>{h2}</Text>
        <Text style={styles.body}>{body}</Text>
        <View style={styles.actions}>
          <Pressable
            style={[styles.btnPrimary, { backgroundColor: colors.accent }]}
            onPress={() => router.push("/(tabs)/sermons")}
          >
            <Text style={styles.btnPrimaryText}>Watch a sermon</Text>
          </Pressable>
          <Pressable
            style={styles.btnOutline}
            onPress={() => void WebBrowser.openBrowserAsync(`${APP_URL}/visit`)}
          >
            <Text style={styles.btnOutlineText}>Plan a visit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { minHeight: 340, justifyContent: "flex-end" },
  image: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject },
  content: { paddingHorizontal: 20, paddingBottom: 28, paddingTop: 48 },
  h1: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    textAlign: "center",
  },
  h2: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 28,
  },
  body: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  btnPrimary: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 140,
    alignItems: "center",
  },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  btnOutline: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    minWidth: 140,
    alignItems: "center",
  },
  btnOutlineText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
