import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ThemePalette } from "@/constants/themes";
import { completeAuthFromUrl } from "@/lib/completeAuthFromUrl";
import { getAuthCallbackUrl } from "@/lib/getAuthCallbackUrl";
import { useThemedStyles } from "@/lib/useThemedStyles";

export default function AuthCallbackScreen() {
  const router = useRouter();
  const styles = useThemedStyles(createStyles);
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    async function handleUrl(url: string | null) {
      if (!url) {
        setMessage("No sign-in link received. Request a new magic link from More → Sign in.");
        return;
      }

      const { error } = await completeAuthFromUrl(url);

      if (error) {
        setMessage(error.message);
        setTimeout(() => router.replace("/auth"), 4000);
        return;
      }

      if (Platform.OS === "web" && typeof window !== "undefined") {
        window.history.replaceState({}, "", `${window.location.origin}/auth/callback`);
      }

      router.replace("/(tabs)/home");
    }

    void getAuthCallbackUrl().then(handleUrl);

    const sub = Linking.addEventListener("url", ({ url }) => {
      void handleUrl(url);
    });

    return () => sub.remove();
  }, [router]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.primary },
    center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
    text: { color: "#fff", marginTop: 16, fontSize: 16, textAlign: "center" },
  });
}
