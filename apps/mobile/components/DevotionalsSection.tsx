import * as WebBrowser from "expo-web-browser";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CHURCH } from "@/constants/church";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";
import type { MobileBlogPost } from "@/lib/api";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "https://lsc-platform-kappa.vercel.app";

type Props = {
  posts: MobileBlogPost[];
};

export function DevotionalsSection({ posts }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>{t("home", "follow_daily")}</Text>
      <Text style={[styles.sub, { color: colors.textMuted }]}>{t("home", "pastor_daily")}</Text>

      <Pressable
        style={[styles.fbCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => void WebBrowser.openBrowserAsync(CHURCH.facebook)}
      >
        <Text style={[styles.fbTitle, { color: colors.primary }]}>{t("home", "subscribe_email")}</Text>
        <Text style={[styles.fbLink, { color: colors.primary }]}>{t("home", "facebook_followers")}</Text>
      </Pressable>

      {posts.length > 0 ? (
        <>
          <Text style={[styles.devoTitle, { color: colors.primary }]}>
            {t("home", "recent_devotionals")}
          </Text>
          {posts.map((post) => (
            <Pressable
              key={post._id}
              style={[styles.post, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => void WebBrowser.openBrowserAsync(`${APP_URL}/blog/${post.slug.current}`)}
            >
              <Text style={[styles.postTitle, { color: colors.textPrimary }]} numberOfLines={2}>
                {post.title}
              </Text>
              {post.publishedAt ? (
                <Text style={[styles.postDate, { color: colors.textMuted }]}>
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              ) : null}
            </Pressable>
          ))}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingVertical: 24 },
  title: { fontSize: 20, fontWeight: "800" },
  sub: { marginTop: 8, fontSize: 14, lineHeight: 21 },
  fbCard: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  fbTitle: { fontSize: 16, fontWeight: "700" },
  fbLink: { marginTop: 10, fontSize: 14, fontWeight: "600" },
  devoTitle: { marginTop: 20, fontSize: 18, fontWeight: "700" },
  post: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
  },
  postTitle: { fontSize: 15, fontWeight: "600" },
  postDate: { marginTop: 4, fontSize: 12 },
});
