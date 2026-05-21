import { Ionicons } from "@expo/vector-icons";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { EventCard } from "@/components/EventCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SermonCard } from "@/components/SermonCard";
import { CHURCH } from "@/constants/church";
import { colors } from "@/constants/tokens";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { fetchJson, type MobileEvent, type MobileSermon } from "@/lib/api";
import { t } from "@/lib/i18n";

type HomeData = {
  sermon: MobileSermon | null;
  events: MobileEvent[];
};

const QUICK_ACTIONS = [
  { icon: "play-circle-outline" as const, label: "Sermons", href: "/(tabs)/sermons" },
  { icon: "hand-left-outline" as const, label: "Prayer", href: "/(tabs)/prayer" },
  { icon: "heart-outline" as const, label: "Give", href: "/(tabs)/give" },
  { icon: "location-outline" as const, label: "Visit", maps: true },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const { status: liveStatus } = useLiveStatus();

  useEffect(() => {
    fetchJson<HomeData>("/api/mobile/home")
      .then(setData)
      .catch(() => setData({ sermon: null, events: [] }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const sermon = data?.sermon;

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Text style={styles.headerTitle}>{CHURCH.name}</Text>
        <Ionicons name="notifications-outline" size={22} color={colors.primary} />
      </SafeAreaView>

      <Pressable style={styles.strip} onPress={() => Linking.openURL(CHURCH.mapsUrl)}>
        <Text style={styles.stripTitle}>{CHURCH.serviceTime}</Text>
        <Text style={styles.stripSub}>{CHURCH.addressLine}</Text>
        <Text style={styles.stripLink}>Get directions →</Text>
      </Pressable>

      {liveStatus?.isLive ? (
        <Pressable
          style={styles.liveBanner}
          onPress={() => router.push("/(tabs)/sermons?tab=live")}
        >
          <View style={styles.liveDot} />
          <Text style={styles.liveBannerText}>LIVE NOW — Join Sunday Service</Text>
        </Pressable>
      ) : null}

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <SectionHeader
          title="Latest Message"
          actionLabel="View all →"
          onAction={() => router.push("/(tabs)/sermons")}
        />
        {sermon ? (
          <SermonCard
            sermon={sermon}
            onPress={() => router.push(`/sermon/${sermon.slug.current}`)}
          />
        ) : (
          <Text style={styles.empty}>No sermons published yet.</Text>
        )}

        <View style={styles.seriesCard}>
          <Text style={styles.seriesLabel}>Current series</Text>
          <Text style={styles.seriesTitle}>{CHURCH.featuredSeries.title}</Text>
          <Text style={styles.seriesSub}>{CHURCH.featuredSeries.subtitle}</Text>
          <Pressable
            style={styles.seriesBtn}
            onPress={() => router.push("/(tabs)/sermons")}
          >
            <Text style={styles.seriesBtnText}>Watch series →</Text>
          </Pressable>
        </View>

        <SectionHeader title="This week" />
        {data?.events?.length ? (
          data.events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <Text style={styles.empty}>No upcoming events.</Text>
        )}

        <View style={styles.quickRow}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.label}
              style={styles.quickItem}
              onPress={() => {
                if ("maps" in action && action.maps) {
                  void Linking.openURL(CHURCH.mapsUrl);
                } else if ("href" in action) {
                  router.push(action.href);
                }
              }}
            >
              <Ionicons name={action.icon} size={28} color={colors.primary} />
              <Text style={styles.quickLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.tagline}>{t("home", "tagline")}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: colors.primary },
  strip: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stripTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  stripSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 2 },
  stripLink: { color: "rgba(255,255,255,0.9)", fontSize: 12, marginTop: 6, fontWeight: "600" },
  liveBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  liveBannerText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  empty: { paddingHorizontal: 16, color: colors.textMuted, fontSize: 14 },
  seriesCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 18,
  },
  seriesLabel: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  seriesTitle: { color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 6 },
  seriesSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 4 },
  seriesBtn: {
    marginTop: 14,
    alignSelf: "flex-start",
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  seriesBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  quickItem: { alignItems: "center", minWidth: 64 },
  quickLabel: { marginTop: 6, fontSize: 11, fontWeight: "600", color: colors.primary },
  tagline: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    color: colors.textMuted,
    paddingHorizontal: 24,
  },
});
