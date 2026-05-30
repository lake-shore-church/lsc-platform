import { Stack, useLocalSearchParams, useRouter } from "expo-router";
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
import { WebView } from "react-native-webview";
import type { ThemePalette } from "@/constants/themes";
import { HlsVideoPlayer } from "@/components/HlsVideoPlayer";
import { downloadMediaToDevice } from "@/lib/downloadMedia";
import { fetchJson, type MobileSermon } from "@/lib/api";
import { useThemedStyles } from "@/lib/useThemedStyles";
import { useTheme } from "@/lib/ThemeContext";
import { backLabelFrom, sermonHref } from "@/lib/navigation";
import { pickVideoSource, youtubeEmbedUrl } from "@/lib/video";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function SermonDetailScreen() {
  const { slug, from } = useLocalSearchParams<{ slug: string; from?: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const backTitle = backLabelFrom(from);
  const [sermon, setSermon] = useState<MobileSermon | null>(null);
  const [related, setRelated] = useState<MobileSermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

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

  async function handleDownload() {
    if (!sermon?.videoUrl) return;
    setDownloading(true);
    try {
      const safe = sermon.slug.current.replace(/[^a-z0-9-]/gi, "-");
      await downloadMediaToDevice(sermon.videoUrl, `${safe}.mp4`);
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Sermon", headerBackTitle: backTitle }} />
        <View style={[styles.centered, { backgroundColor: colors.surface }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </>
    );
  }

  if (!sermon) {
    return (
      <>
        <Stack.Screen options={{ title: "Sermon", headerBackTitle: backTitle }} />
        <View style={[styles.centered, { backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.textPrimary }}>Sermon not found.</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.link}>Go back</Text>
          </Pressable>
        </View>
      </>
    );
  }

  const videoHeight = Math.round((Dimensions.get("window").width * 9) / 16);
  const source = pickVideoSource(sermon.videoUrl);
  const youtubeEmbed = youtubeEmbedUrl(sermon.videoUrl);

  return (
    <>
      <Stack.Screen
        options={{
          title: sermon.title,
          headerBackTitle: backTitle,
        }}
      />
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {source === "hls" && sermon.videoUrl ? (
        <HlsVideoPlayer uri={sermon.videoUrl} height={videoHeight} />
      ) : youtubeEmbed ? (
        <View style={[styles.videoWrap, { height: videoHeight }]}>
          <WebView
            source={{ uri: youtubeEmbed }}
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

      {sermon.audioUrl ? (
        <Text style={styles.audioNote}>Audio: open from website or podcast for now.</Text>
      ) : (
        <View style={styles.audioPlaceholder}>
          <Text style={styles.audioText}>Audio — available when uploaded to our media library</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
        {sermon.videoUrl ? (
          <Pressable
            style={[styles.downloadButton, downloading && styles.disabled]}
            onPress={() => void handleDownload()}
            disabled={downloading}
          >
            <Text style={styles.downloadText}>
              {downloading ? "Preparing…" : "Download video"}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {related.length > 0 ? (
        <>
          <Text style={styles.relatedHeading}>More in this series</Text>
          {related.map((s) => (
            <Pressable
              key={s._id}
              style={styles.relatedRow}
              onPress={() => router.push(sermonHref(s.slug.current, "sermons"))}
            >
              <Text style={styles.relatedTitle}>{s.title}</Text>
            </Pressable>
          ))}
        </>
      ) : null}
    </ScrollView>
    </>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
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
    audioNote: { marginTop: 16, fontSize: 13, color: colors.textMuted },
    actions: { marginTop: 16, gap: 10 },
    shareButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    shareText: { color: "#fff", fontWeight: "700" },
    downloadButton: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    downloadText: { color: colors.primary, fontWeight: "700" },
    disabled: { opacity: 0.6 },
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
}
