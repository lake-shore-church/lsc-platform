import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LiveTabContent } from "@/components/LiveTabContent";
import { SermonCard } from "@/components/SermonCard";
import { colors } from "@/constants/tokens";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { fetchJson, type MobileSermon } from "@/lib/api";

type TabId = "live" | "archive";

export default function SermonsScreen() {
  const router = useRouter();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<TabId>("archive");
  const [sermons, setSermons] = useState<MobileSermon[]>([]);
  const [query, setQuery] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { status: liveStatus, loading: liveLoading } = useLiveStatus();

  useEffect(() => {
    if (tab === "live") setActiveTab("live");
  }, [tab]);

  useEffect(() => {
    fetchJson<{ sermons: MobileSermon[] }>("/api/mobile/sermons")
      .then((res) => setSermons(res.sermons))
      .catch(() => setSermons([]))
      .finally(() => setLoading(false));
  }, []);

  const seriesOptions = useMemo(() => {
    const names = new Set<string>();
    for (const s of sermons) {
      if (s.series?.title) names.add(s.series.title);
    }
    return ["All", ...Array.from(names).sort()];
  }, [sermons]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sermons.filter((s) => {
      const matchesSeries =
        seriesFilter === "All" || s.series?.title === seriesFilter;
      if (!matchesSeries) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        (s.scripture?.toLowerCase().includes(q) ?? false) ||
        (s.pastor?.name?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [sermons, query, seriesFilter]);

  const latestSermon = sermons[0] ?? null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sermons</Text>
        <View style={styles.tabRow}>
          <Pressable
            style={[styles.tab, activeTab === "live" && styles.tabActive]}
            onPress={() => setActiveTab("live")}
          >
            <Text style={[styles.tabText, activeTab === "live" && styles.tabTextActive]}>
              Live
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "archive" && styles.tabActive]}
            onPress={() => setActiveTab("archive")}
          >
            <Text style={[styles.tabText, activeTab === "archive" && styles.tabTextActive]}>
              Archive
            </Text>
          </Pressable>
        </View>
      </View>

      {activeTab === "live" ? (
        <ScrollView>
          <LiveTabContent
            status={liveStatus}
            loading={liveLoading}
            latestSermon={latestSermon}
          />
        </ScrollView>
      ) : loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.archiveTools}>
            <View style={styles.searchWrap}>
              <Ionicons name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
              <TextInput
                placeholder="Search sermons…"
                value={query}
                onChangeText={setQuery}
                style={styles.search}
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
              {seriesOptions.map((name) => {
                const active = seriesFilter === name;
                return (
                  <Pressable
                    key={name}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setSeriesFilter(name)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{name}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.empty}>No sermons match your search.</Text>
            }
            renderItem={({ item }) => (
              <SermonCard
                sermon={item}
                onPress={() => router.push(`/sermon/${item.slug.current}`)}
              />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tabRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontWeight: "700", color: colors.textMuted },
  tabTextActive: { color: "#fff" },
  archiveTools: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 6 },
  search: { flex: 1, paddingVertical: 10, fontSize: 16, color: colors.textPrimary },
  chips: { marginTop: 10, paddingHorizontal: 12 },
  chip: {
    marginHorizontal: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, fontWeight: "600", color: colors.textMuted },
  chipTextActive: { color: "#fff" },
  list: { paddingTop: 8, paddingBottom: 24 },
  empty: { textAlign: "center", color: colors.textMuted, marginTop: 24, paddingHorizontal: 20 },
});
