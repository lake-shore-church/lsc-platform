import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMobileSupabase } from "@/lib/supabase";

function parseAuthParams(url: string) {
  const parsed = Linking.parse(url);
  const q = parsed.queryParams ?? {};
  return {
    code: typeof q.code === "string" ? q.code : undefined,
    token_hash: typeof q.token_hash === "string" ? q.token_hash : undefined,
    type: typeof q.type === "string" ? q.type : undefined,
  };
}

export default function AuthCallbackScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    async function handleUrl(url: string | null) {
      if (!url) {
        setMessage("No sign-in link received.");
        return;
      }

      const { code, token_hash, type } = parseAuthParams(url);
      const supabase = getMobileSupabase();

      const { error } = code
        ? await supabase.auth.exchangeCodeForSession(code)
        : token_hash && type
          ? await supabase.auth.verifyOtp({
              token_hash,
              type: type as "email" | "magiclink",
            })
          : { error: new Error("Invalid auth link") };

      if (error) {
        setMessage(error.message);
        setTimeout(() => router.replace("/auth"), 2500);
        return;
      }

      router.replace("/(tabs)/home");
    }

    void Linking.getInitialURL().then(handleUrl);

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
