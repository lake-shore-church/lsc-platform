import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { ThemePalette } from "@/constants/themes";
import { fetchJson, type MobileBlogPostDetail } from "@/lib/api";
import { backLabelFrom } from "@/lib/navigation";
import { useThemedStyles } from "@/lib/useThemedStyles";
import { useTheme } from "@/lib/ThemeContext";

export default function BlogPostScreen() {
  const { slug, from } = useLocalSearchParams<{ slug: string; from?: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const backTitle = backLabelFrom(from);
  const [post, setPost] = useState<MobileBlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchJson<{ post: MobileBlogPostDetail }>(`/api/mobile/blog/${slug}`)
      .then((res) => setPost(res.post))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Article", headerBackTitle: backTitle }} />
        <View style={[styles.centered, { backgroundColor: colors.surface }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Stack.Screen options={{ title: "Article", headerBackTitle: backTitle }} />
        <View style={[styles.centered, { backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.textPrimary }}>Article not found.</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.link}>Go back</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: post.title, headerBackTitle: backTitle }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {post.publishedAt ? (
          <Text style={styles.date}>
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        ) : null}
        {post.authorName ? <Text style={styles.author}>By {post.authorName}</Text> : null}
        {post.excerpt ? <Text style={styles.excerpt}>{post.excerpt}</Text> : null}
        {post.body ? (
          <Text style={styles.body}>{post.body}</Text>
        ) : (
          <Text style={styles.muted}>Full article text is not available in the app yet.</Text>
        )}
      </ScrollView>
    </>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    content: { padding: 16, paddingBottom: 40 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    date: { fontSize: 13, color: colors.textMuted },
    author: { marginTop: 6, fontSize: 14, color: colors.textMuted },
    excerpt: {
      marginTop: 12,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    body: { marginTop: 16, fontSize: 16, lineHeight: 26, color: colors.textPrimary },
    muted: { marginTop: 16, fontSize: 14, color: colors.textMuted },
    link: { marginTop: 12, color: colors.primary, fontWeight: "600" },
  });
}
