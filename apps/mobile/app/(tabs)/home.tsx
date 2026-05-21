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
import { fetchJson, type MobileEvent, type MobileSermon } from "@/lib/api";
import { t } from "@/lib/i18n";

type HomeData = {
  sermon: MobileSermon | null;
  events: MobileEvent[];
};

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<HomeData>("/api/mobile/home")
      .then(setData)
      .catch(() => setData({ sermon: null, events: [] }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1B4F8A" />
      </View>
    );
  }

  const sermon = data?.sermon;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.logo}>Lake Shore Church</Text>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Sunday Service · 10:00 AM</Text>
        <Text style={styles.bannerSub}>Merit School of Music · West Loop Chicago</Text>
        <Text style={styles.bannerSub}>(312) 464-1834</Text>
      </View>

      <Pressable style={[styles.button, styles.liveButton]}>
        <Text style={styles.buttonText}>Watch Live</Text>
      </Pressable>

      {sermon ? (
        <Pressable
          style={styles.card}
          onPress={() => router.push(`/sermon/${sermon.slug.current}`)}
        >
          <Text style={styles.cardLabel}>Latest sermon</Text>
          <Text style={styles.cardTitle}>{sermon.title}</Text>
          {sermon.scripture ? <Text style={styles.cardMeta}>{sermon.scripture}</Text> : null}
          {sermon.pastor?.name ? <Text style={styles.cardMeta}>{sermon.pastor.name}</Text> : null}
        </Pressable>
      ) : null}

      <Pressable
        style={styles.card}
        onPress={() => router.push("/(tabs)/sermons")}
      >
        <Text style={styles.cardLabel}>Featured series</Text>
        <Text style={styles.cardTitle}>The Sheer Goodness of Jesus</Text>
        <Text style={styles.cardMeta}>A series by Pastor Brian</Text>
      </Pressable>

      {data?.events?.map((event) => (
        <View key={event.id} style={styles.card}>
          <Text style={styles.cardLabel}>Upcoming</Text>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardMeta}>
            {new Date(event.starts_at).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </Text>
        </View>
      ))}

      <Pressable style={styles.button} onPress={() => router.push("/(tabs)/give")}>
        <Text style={styles.buttonText}>Give</Text>
      </Pressable>

      <Text style={styles.tagline}>{t("home", "tagline")}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { fontSize: 22, fontWeight: "700", color: "#1B4F8A", textAlign: "center" },
  banner: {
    marginTop: 16,
    backgroundColor: "#1B4F8A",
    borderRadius: 12,
    padding: 16,
  },
  bannerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  bannerSub: { color: "rgba(255,255,255,0.9)", marginTop: 4, fontSize: 14 },
  liveButton: { backgroundColor: "#c0392b", marginTop: 16 },
  button: {
    marginTop: 16,
    backgroundColor: "#1B4F8A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  card: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F7B6C",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardTitle: { marginTop: 6, fontSize: 17, fontWeight: "700", color: "#1B4F8A" },
  cardMeta: { marginTop: 4, fontSize: 14, color: "#64748b" },
  tagline: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 15,
    fontStyle: "italic",
    color: "#475569",
  },
});
