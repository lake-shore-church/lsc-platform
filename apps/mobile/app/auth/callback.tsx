import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { completeAuthFromUrl } from "@/lib/completeAuthFromUrl";
import { getAuthCallbackUrl } from "@/lib/getAuthCallbackUrl";

export default function AuthCallbackScreen() {
  const router = useRouter();
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#1B4F8A" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  text: { color: "#fff", marginTop: 16, fontSize: 16, textAlign: "center" },
});
