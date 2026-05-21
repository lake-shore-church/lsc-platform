import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { type Href, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { EventCard } from "@/components/EventCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ThemePicker } from "@/components/ThemePicker";
import { CHURCH } from "@/constants/church";
import { useTheme } from "@/lib/ThemeContext";
import { fetchJson, type MobileBlogPost, type MobileEvent } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { getI18n, localeOptions, setMobileLocale, t } from "@/lib/i18n";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

type HomePayload = {
  events: MobileEvent[];
  posts: MobileBlogPost[];
  book?: { title?: string; externalUrl?: string } | null;
};

function initials(name?: string | null, email?: string | null): string {
  const base = name?.trim() || email?.trim() || "?";
  const parts = base.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return base.slice(0, 2).toUpperCase();
}

export default function MoreScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { profile, signOut } = useAuth();
  const [events, setEvents] = useState<MobileEvent[]>([]);
  const [posts, setPosts] = useState<MobileBlogPost[]>([]);
  const [book, setBook] = useState<HomePayload["book"]>(null);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocaleTick] = useState(0);

  useEffect(() => {
    fetchJson<HomePayload>("/api/mobile/home")
      .then((res) => {
        setEvents(res.events ?? []);
        setPosts(res.posts ?? []);
        setBook(res.book ?? null);
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
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {initials(profile.full_name, profile.email)}
            </Text>
          </View>
          <View style={styles.memberBody}>
            <Text style={styles.memberName}>{profile.full_name ?? profile.email}</Text>
            <Text style={styles.memberEmail}>{profile.email}</Text>
            <Text style={styles.roleBadge}>{profile.role}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.signInCard}>
          <Text style={styles.signInText}>
            Sign in for giving history, private prayers, and more.
          </Text>
          <Pressable style={styles.signInBtn} onPress={() => router.push("/auth")}>
            <Text style={styles.signInBtnText}>Sign in</Text>
          </Pressable>
        </View>
      )}

      <ThemePicker />

      <SectionHeader title="Upcoming events" />
      {loading ? <ActivityIndicator color={colors.primary} /> : null}
      {events.length ? (
        events.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            showRsvp
            onRsvp={() => setWebUrl(`${APP_URL}/events`)}
          />
        ))
      ) : (
        <Text style={styles.empty}>No upcoming events.</Text>
      )}

      <SectionHeader title="From Pastor Brian" />
      {posts.map((p) => (
        <Pressable
          key={p._id}
          style={styles.postCard}
          onPress={() => setWebUrl(`${APP_URL}/blog/${p.slug.current}`)}
        >
          <Text style={styles.postTitle} numberOfLines={2}>
            {p.title}
          </Text>
          {p.excerpt ? (
            <Text style={styles.postExcerpt} numberOfLines={2}>
              {p.excerpt}
            </Text>
          ) : null}
          <Text style={styles.readMore}>Read more →</Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.bookCard}
        onPress={() =>
          void WebBrowser.openBrowserAsync(book?.externalUrl ?? CHURCH.bookUrl)
        }
      >
        <Ionicons name="book" size={32} color={colors.amber} />
        <View style={styles.bookBody}>
          <Text style={styles.bookTitle}>{book?.title ?? "Know"}</Text>
          <Text style={styles.bookSub}>by Craig Brian Larson</Text>
          <Text style={styles.bookLink}>Get on Amazon →</Text>
        </View>
      </Pressable>

      {profile && (profile.role === "staff" || profile.role === "admin") ? (
        <Pressable
          style={styles.presenterCard}
          onPress={() => router.push("/presenter" as Href)}
        >
          <Ionicons name="tv-outline" size={28} color={colors.primary} />
          <View style={styles.presenterBody}>
            <Text style={styles.presenterTitle}>Presenter Mode</Text>
            <Text style={styles.presenterSub}>Control slides on the projector</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
        </Pressable>
      ) : null}

      <SectionHeader title="About" />
      <View style={styles.aboutCard}>
        <Pressable style={styles.aboutRow} onPress={() => Linking.openURL(CHURCH.mapsUrl)}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.aboutText}>{CHURCH.address}</Text>
        </Pressable>
        <Pressable
          style={styles.aboutRow}
          onPress={() => Linking.openURL(`tel:${CHURCH.phoneTel}`)}
        >
          <Ionicons name="call-outline" size={18} color={colors.primary} />
          <Text style={styles.aboutText}>{CHURCH.phone}</Text>
        </Pressable>
        <View style={styles.aboutRow}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={styles.aboutText}>Every Sunday at 10:00 AM</Text>
        </View>
      </View>

      <View style={styles.socialRow}>
        <Pressable onPress={() => void WebBrowser.openBrowserAsync(CHURCH.facebook)}>
          <Ionicons name="logo-facebook" size={32} color="#1877F2" />
        </Pressable>
        <Pressable onPress={() => void WebBrowser.openBrowserAsync(CHURCH.youtube)}>
          <Ionicons name="logo-youtube" size={32} color="#FF0000" />
        </Pressable>
      </View>

      <Text style={styles.langTitle}>{t("language", "title_multilingual")}</Text>
      <View style={styles.langCard}>
        {localeOptions.map((opt, i) => (
          <Pressable
            key={opt.code}
            style={[styles.langRow, i < localeOptions.length - 1 && styles.langBorder]}
            onPress={() => {
              void setMobileLocale(opt.code).then(() => setLocaleTick((n) => n + 1));
            }}
          >
            <Text style={styles.langText}>
              {opt.flag} {opt.label}
            </Text>
            {getI18n().locale === opt.code ? (
              <Ionicons name="checkmark" size={20} color={colors.primary} />
            ) : null}
          </Pressable>
        ))}
      </View>

      {profile ? (
        <Pressable style={styles.signOut} onPress={() => void signOut()}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      ) : null}

      <Text style={styles.version}>
        {CHURCH.name} · v1.0.0{"\n"}Assemblies of God · West Loop Chicago
      </Text>
    </ScrollView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  content: { paddingBottom: 32 },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  memberBody: { flex: 1, marginLeft: 12 },
  memberName: { color: "#fff", fontSize: 17, fontWeight: "700" },
  memberEmail: { color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 2 },
  roleBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
  signInCard: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  signInText: { fontSize: 14, color: colors.textMuted, marginBottom: 12 },
  signInBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  signInBtnText: { color: "#fff", fontWeight: "700" },
  empty: { paddingHorizontal: 16, color: colors.textMuted, fontSize: 14 },
  postCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  postTitle: { fontSize: 16, fontWeight: "600", color: colors.textPrimary },
  postExcerpt: { marginTop: 6, fontSize: 13, color: colors.textMuted },
  readMore: { marginTop: 8, fontSize: 13, fontWeight: "600", color: colors.primary },
  presenterCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presenterBody: { flex: 1, marginLeft: 12 },
  presenterTitle: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  presenterSub: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 12,
    padding: 14,
  },
  bookBody: { flex: 1, marginLeft: 12 },
  bookTitle: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  bookSub: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  bookLink: { fontSize: 13, fontWeight: "600", color: colors.amber, marginTop: 6 },
  aboutCard: {
    marginHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aboutRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12, gap: 8 },
  aboutText: { flex: 1, fontSize: 14, color: colors.textMuted, lineHeight: 20 },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langTitle: {
    marginTop: 20,
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  langCard: {
    marginHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  langBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  langText: { fontSize: 16, color: colors.textPrimary },
  signOut: {
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  signOutText: { color: colors.error, fontWeight: "700" },
  version: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 16,
  },
  closeBar: { padding: 12, backgroundColor: colors.primary },
  closeText: { color: "#fff", fontWeight: "600" },
  });
}
