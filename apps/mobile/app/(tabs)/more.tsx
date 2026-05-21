import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { fetchJson, type MobileBlogPost, type MobileEvent } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { getI18n, localeOptions, setMobileLocale, t } from "@/lib/i18n";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";
const FACEBOOK = "https://www.facebook.com/lschurchchicago";
const BOOK_URL = "https://www.amazon.com/s?k=Craig+Brian+Larson+Know";
const ADDRESS = "Merit School of Music, 38 S. Peoria St, Chicago IL 60607";

export default function MoreScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuth();
  const [events, setEvents] = useState<MobileEvent[]>([]);
  const [posts, setPosts] = useState<MobileBlogPost[]>([]);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocaleTick] = useState(0);

  useEffect(() => {
    fetchJson<{ events: MobileEvent[]; posts: MobileBlogPost[] }>("/api/mobile/home")
      .then((res) => {
        setEvents(res.events ?? []);
        setPosts(res.posts ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (webUrl) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable style={styles.closeBar} onPress={() => setWebUrl(null)}>
          <Text style={styles.closeText}>← Back</Text>
        </Pressable>
        <WebView source={{ uri: webUrl }} style={{ flex: 1 }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {profile ? (
        <View style={styles.memberCard}>
          <Text style={styles.memberName}>{profile.full_name ?? profile.email}</Text>
          <Text style={styles.memberMeta}>{profile.email}</Text>
          <Text style={styles.memberRole}>{profile.role}</Text>
          <Pressable style={styles.signOutBtn} onPress={() => void signOut()}>
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in</Text>
          <Text style={styles.cardMeta}>
            Access giving history, private prayers, and member features.
          </Text>
          <Pressable style={styles.smallButton} onPress={() => router.push("/auth")}>
            <Text style={styles.smallButtonText}>Sign in with email</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.section}>{t("language", "title_multilingual")}</Text>
      {localeOptions.map((opt) => (
        <Pressable
          key={opt.code}
          style={styles.langRow}
          onPress={() => {
            void setMobileLocale(opt.code).then(() => setLocaleTick((n) => n + 1));
          }}
        >
          <Text style={styles.langText}>
            {opt.flag} {opt.label}
            {getI18n().locale === opt.code ? " ✓" : ""}
          </Text>
        </Pressable>
      ))}

      <Text style={styles.section}>Events</Text>
      {loading ? <ActivityIndicator color="#1B4F8A" /> : null}
      {events.map((e) => (
        <View key={e.id} style={styles.card}>
          <Text style={styles.cardTitle}>{e.title}</Text>
          <Text style={styles.cardMeta}>
            {new Date(e.starts_at).toLocaleString()}
          </Text>
          <Pressable style={styles.smallButton}>
            <Text style={styles.smallButtonText}>RSVP</Text>
          </Pressable>
        </View>
      ))}

      <Text style={styles.section}>Blog</Text>
      {posts.map((p) => (
        <Pressable
          key={p._id}
          style={styles.card}
          onPress={() => setWebUrl(`${APP_URL}/blog/${p.slug.current}`)}
        >
          <Text style={styles.cardTitle}>{p.title}</Text>
        </Pressable>
      ))}

      <Text style={styles.section}>Resources</Text>
      <Pressable style={styles.card} onPress={() => setWebUrl(BOOK_URL)}>
        <Text style={styles.cardTitle}>Know — Gaining Wisdom from God</Text>
        <Text style={styles.cardMeta}>Pastor Brian&apos;s book on Amazon</Text>
      </Pressable>

      <Text style={styles.section}>Facebook</Text>
      <Pressable style={styles.card} onPress={() => Linking.openURL(FACEBOOK)}>
        <Text style={styles.cardTitle}>Follow Pastor Brian</Text>
        <Text style={styles.cardMeta}>Daily scriptures and updates</Text>
      </Pressable>

      <Text style={styles.section}>About</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lake Shore Church — West Loop</Text>
        <Text style={styles.cardMeta}>{ADDRESS}</Text>
        <Text style={styles.cardMeta}>(312) 464-1834</Text>
        <Text style={styles.cardMeta}>Sundays 10:00 AM</Text>
        <Pressable
          style={styles.smallButton}
          onPress={() =>
            Linking.openURL(
              "https://maps.google.com/?q=Merit+School+of+Music+38+S+Peoria+St+Chicago",
            )
          }
        >
          <Text style={styles.smallButtonText}>Get Directions</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20, paddingBottom: 40 },
  section: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B4F8A",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#0f172a" },
  cardMeta: { marginTop: 4, fontSize: 13, color: "#64748b" },
  smallButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#1B4F8A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  smallButtonText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  closeBar: { padding: 12, backgroundColor: "#1B4F8A" },
  closeText: { color: "#fff", fontWeight: "600" },
  langRow: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  langText: { fontSize: 16, color: "#1B4F8A", fontWeight: "600" },
  memberCard: {
    backgroundColor: "#1B4F8A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  memberName: { color: "#fff", fontSize: 18, fontWeight: "700" },
  memberMeta: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 4 },
  memberRole: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  signOutBtn: { marginTop: 12, alignSelf: "flex-start" },
  signOutText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
