import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "@/constants/tokens";
import { WebView } from "react-native-webview";
import { fetchJson, type MobileSermon } from "@/lib/api";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

function youtubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (!match?.[1]) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

export default function SermonDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [sermon, setSermon] = useState<MobileSermon | null>(null);
  const [related, setRelated] = useState<MobileSermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      fetchJson<{ sermon: MobileSermon }>(`/api/mobile/sermons/${slug}`).catch(() => null),
      fetchJson<{ sermons: MobileSermon[] }>("/api/mobile/sermons"),
    ])
      .then(([detail, all]) => {
        if (detail?.sermon) setSermon(detail.sermon);
        else {
          const found = all.sermons.find((s) => s.slug.current === slug);
          setSermon(found ?? null);
        }
        const seriesSlug = detail?.sermon?.series?.slug?.current;
        const rel = all.sermons
          .filter((s) => s.slug.current !== slug && s.series?.slug?.current === seriesSlug)
          .slice(0, 3);
        setRelated(rel);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleShare() {
    if (!sermon) return;
    await Share.share({
      message: `${sermon.title} — ${APP_URL}/sermons/${sermon.slug.current}`,
    });
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1B4F8A" />
      </View>
    );
  }

  if (!sermon) {
    return (
      <View style={styles.centered}>
        <Text>Sermon not found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const embed = youtubeEmbedUrl(sermon.videoUrl);
  const videoHeight = Math.round((Dimensions.get("window").width * 9) / 16);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {embed ? (
        <View style={[styles.videoWrap, { height: videoHeight }]}>
          <WebView
            source={{ uri: embed }}
            style={styles.video}
            allowsFullscreenVideo
            javaScriptEnabled
          />
        </View>
      ) : null}

      <Text style={styles.title}>{sermon.title}</Text>
      {sermon.pastor?.name || sermon.publishedAt ? (
        <Text style={styles.meta}>
          {[sermon.pastor?.name, sermon.publishedAt && new Date(sermon.publishedAt).toLocaleDateString()]
            .filter(Boolean)
            .join(" · ")}
        </Text>
      ) : null}
      {sermon.scripture ? (
        <View style={styles.scriptureChip}>
          <Text style={styles.scriptureText}>{sermon.scripture}</Text>
        </View>
      ) : null}

      {sermon.summary ? <Text style={styles.summary}>{sermon.summary}</Text> : null}

      <View style={styles.audioPlaceholder}>
        <Text style={styles.audioText}>Audio player — ready when files are on R2</Text>
      </View>

      <Pressable style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareText}>Share</Text>
      </Pressable>

      {related.length > 0 ? (
        <>
          <Text style={styles.relatedHeading}>More in this series</Text>
          {related.map((s) => (
            <Pressable
              key={s._id}
              style={styles.relatedRow}
              onPress={() => router.push(`/sermon/${s.slug.current}`)}
            >
              <Text style={styles.relatedTitle}>{s.title}</Text>
            </Pressable>
          ))}
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  content: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: colors.primary, marginTop: 12 },
  meta: { marginTop: 6, fontSize: 14, color: colors.textMuted },
  scriptureChip: {
    alignSelf: "flex-start",
    marginTop: 10,
    backgroundColor: `${colors.primary}14`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  scriptureText: { color: colors.primary, fontWeight: "600", fontSize: 13 },
  videoWrap: { marginHorizontal: -16, overflow: "hidden", backgroundColor: "#000" },
  video: { flex: 1 },
  summary: { marginTop: 16, fontSize: 15, lineHeight: 22, color: colors.textPrimary },
  audioPlaceholder: {
    marginTop: 16,
    padding: 14,
    backgroundColor: colors.border,
    borderRadius: 10,
  },
  audioText: { color: colors.textMuted, fontSize: 13, textAlign: "center" },
  shareButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  shareText: { color: "#fff", fontWeight: "700" },
  relatedHeading: { marginTop: 24, fontSize: 17, fontWeight: "700", color: colors.primary },
  relatedRow: {
    marginTop: 8,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  relatedTitle: { fontSize: 15, color: colors.textPrimary },
  link: { marginTop: 12, color: colors.primary, fontWeight: "600" },
});
