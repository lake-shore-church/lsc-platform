import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchJson, type MobileSermon } from "@/lib/api";

const SERIES_ORDER = ["The Sheer Goodness of Jesus", "Sunday Sermons"];

export default function SermonsScreen() {
  const router = useRouter();
  const [sermons, setSermons] = useState<MobileSermon[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<{ sermons: MobileSermon[] }>("/api/mobile/sermons")
      .then((res) => setSermons(res.sermons))
      .catch(() => setSermons([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sermons;
    return sermons.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.scripture?.toLowerCase().includes(q) ?? false),
    );
  }, [sermons, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, MobileSermon[]>();
    for (const sermon of filtered) {
      const key = sermon.series?.title ?? "Sunday Sermons";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(sermon);
    }
    return SERIES_ORDER.filter((name) => map.has(name)).map((name) => ({
      name,
      items: map.get(name) ?? [],
    }));
  }, [filtered]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1B4F8A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by title or scripture"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
        placeholderTextColor="#94a3b8"
      />
      <ScrollView contentContainerStyle={styles.list}>
        {grouped.map((group) => (
          <View key={group.name} style={styles.group}>
            <Text style={styles.groupTitle}>{group.name}</Text>
            {group.items.map((sermon) => (
              <Pressable
                key={sermon._id}
                style={styles.row}
                onPress={() => router.push(`/sermon/${sermon.slug.current}`)}
              >
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle}>{sermon.title}</Text>
                  {sermon.scripture ? (
                    <Text style={styles.rowMeta}>{sermon.scripture}</Text>
                  ) : null}
                  {sermon.publishedAt ? (
                    <Text style={styles.rowMeta}>
                      {new Date(sermon.publishedAt).toLocaleDateString()}
                    </Text>
                  ) : null}
                </View>
                <Text style={styles.play}>▶</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  search: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  group: { marginBottom: 20 },
  groupTitle: { fontSize: 18, fontWeight: "700", color: "#1B4F8A", marginBottom: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  rowBody: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  rowMeta: { fontSize: 13, color: "#64748b", marginTop: 2 },
  play: { fontSize: 18, color: "#1B4F8A", marginLeft: 8 },
});
