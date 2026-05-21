import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMobileSupabase } from "@/lib/supabase";
import { t } from "@/lib/i18n";

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMagicLink() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      const redirectTo = Linking.createURL("auth/callback");
      const { error: signInError } = await getMobileSupabase().auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo: redirectTo },
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.hero}>
          <Text style={styles.churchName}>Lake Shore Church</Text>
          <Text style={styles.tagline}>{t("home", "tagline")}</Text>
          <Text style={styles.location}>West Loop · Chicago</Text>
        </View>

        <View style={styles.card}>
          {sent ? (
            <>
              <Text style={styles.cardTitle}>Check your email</Text>
              <Text style={styles.cardSub}>
                We sent a sign-in link to {email.trim()}. Open it on this device to continue.
              </Text>
              <Pressable style={styles.button} onPress={() => Linking.openURL("mailto:")}>
                <Text style={styles.buttonText}>Open email app</Text>
              </Pressable>
              <Pressable style={styles.ghost} onPress={() => setSent(false)}>
                <Text style={styles.ghostText}>Use a different email</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>Sign in to your account</Text>
              <Text style={styles.cardSub}>
                Enter your email for a magic link. No password needed.
              </Text>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => void sendMagicLink()}
              />
              <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={() => void sendMagicLink()}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send magic link</Text>
                )}
              </Pressable>
            </>
          )}

          <Pressable style={styles.ghost} onPress={() => router.back()}>
            <Text style={styles.ghostText}>Continue without signing in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#1B4F8A" },
  flex: { flex: 1 },
  hero: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  churchName: { color: "#fff", fontSize: 28, fontWeight: "700", textAlign: "center" },
  tagline: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 8, textAlign: "center" },
  location: { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 4 },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
  },
  cardTitle: { fontSize: 22, fontWeight: "700", color: "#111827" },
  cardSub: { marginTop: 8, fontSize: 14, color: "#6B7280", lineHeight: 20 },
  error: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    color: "#991B1B",
    fontSize: 14,
  },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#111827",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#1B4F8A",
    borderRadius: 10,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  ghost: { marginTop: 20, alignItems: "center" },
  ghostText: { color: "#1B4F8A", fontWeight: "600", fontSize: 15 },
});
