import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DevotionalsSection } from "@/components/DevotionalsSection";
import { EventCard } from "@/components/EventCard";
import { FeaturedSeriesSection } from "@/components/FeaturedSeriesSection";
import { HomeFooterCta } from "@/components/HomeFooterCta";
import { HomeHero } from "@/components/HomeHero";
import { MinistryCardsRow } from "@/components/MinistryCardsRow";
import { NewHereSection } from "@/components/NewHereSection";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceInfoCards } from "@/components/ServiceInfoCards";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { nativeRoutes, eventsHref } from "@/lib/navigation";
import { useTheme } from "@/lib/ThemeContext";
import { fetchJson, type MobileBlogPost, type MobileEvent, type MobileSermon } from "@/lib/api";
import { t } from "@/lib/i18n";

type HomeData = {
  sermon: MobileSermon | null;
  events: MobileEvent[];
  posts: MobileBlogPost[];
};

export default function HomeScreen() {
  const router = useRouter();
  const { colors, siteCopy } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const { status: liveStatus } = useLiveStatus();

  useEffect(() => {
    fetchJson<HomeData>("/api/mobile/home")
      .then((res) =>
        setData({
          sermon: res.sermon ?? null,
          events: res.events ?? [],
          posts: res.posts ?? [],
        }),
      )
      .catch(() => setData({ sermon: null, events: [], posts: [] }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.surface }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <HomeHero />
        <ServiceInfoCards />

        {liveStatus?.isLive ? (
          <Pressable
            style={styles.liveBanner}
            onPress={() => router.push(nativeRoutes.sermonsLive)}
          >
            <View style={styles.liveDot} />
            <Text style={styles.liveBannerText}>LIVE NOW — Join Sunday Service</Text>
          </Pressable>
        ) : null}

        <FeaturedSeriesSection latestSermon={data?.sermon ?? null} />
        <NewHereSection />
        <MinistryCardsRow />

        <SectionHeader
          title={t("home", "upcoming_events")}
          actionLabel={t("home", "see_all_events")}
          onAction={() => router.push(eventsHref("home"))}
        />
        {data?.events?.length ? (
          data.events.map((event) => (
            <EventCard key={event.id} event={event} from="home" />
          ))
        ) : (
          <Text style={styles.empty}>No upcoming events.</Text>
        )}

        <TestimonialsSection />
        <DevotionalsSection posts={data?.posts ?? []} />
        <HomeFooterCta />

        <Text style={styles.tagline}>
          {siteCopy.heroCtaText ?? t("home", "hero_cta")}
        </Text>
      </ScrollView>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 32 },
    liveBanner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#dc2626",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" },
    liveBannerText: { color: "#fff", fontWeight: "800", fontSize: 14 },
    empty: { paddingHorizontal: 16, color: colors.textMuted, fontSize: 14 },
    tagline: {
      marginTop: 16,
      textAlign: "center",
      fontSize: 14,
      fontStyle: "italic",
      color: colors.textMuted,
      paddingHorizontal: 24,
    },
  });
}
