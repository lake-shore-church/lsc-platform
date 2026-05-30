import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { HlsVideoPlayer } from "@/components/HlsVideoPlayer";
import { LiveReplaysSection } from "@/components/LiveReplaysSection";
import type { ThemePalette } from "@/constants/themes";
import { sermonHref, nativeRoutes } from "@/lib/navigation";
import { recentLiveReplays } from "@/lib/liveReplays";
import { countdownParts, type LiveStatus } from "@/lib/live";
import type { MobileSermon } from "@/lib/api";
import { useTheme } from "@/lib/ThemeContext";
import { pickVideoSource } from "@/lib/video";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
  status: LiveStatus | null;
  loading: boolean;
  latestSermon: MobileSermon | null;
  sermons: MobileSermon[];
};

type LiveStyles = ReturnType<typeof createStyles>;

export function LiveTabContent({ status, loading, latestSermon, sermons }: Props) {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [prayer, setPrayer] = useState("");
  const [sending, setSending] = useState(false);

  const replays = recentLiveReplays(sermons, 31);

  if (loading && !status) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const videoHeight = (SCREEN_WIDTH - 32) * (9 / 16);
  const inhouseLive =
    status?.isLive &&
    status.streamMode === "inhouse" &&
    Boolean(status.playbackUrl);
  const youtubeLive =
    status?.isLive &&
    !inhouseLive &&
    Boolean(status.embedUrl) &&
    (status.streamMode === "youtube" || pickVideoSource(status.embedUrl) === "youtube");

  if (inhouseLive && status?.playbackUrl) {
    return (
      <View style={styles.liveWrap}>
        <LiveNowHeader styles={styles} />
        <HlsVideoPlayer uri={status.playbackUrl} height={videoHeight} />
        <LiveMeta status={status} styles={styles} />
        <PrayerDuringService
          prayer={prayer}
          setPrayer={setPrayer}
          sending={sending}
          setSending={setSending}
          styles={styles}
          colors={colors}
        />
        <Text style={styles.inhouseNote}>
          Watching on Lake Shore Church — same experience as the old Subsplash app.
        </Text>
        <LiveReplaysSection replays={replays} />
      </View>
    );
  }

  if (youtubeLive && status?.embedUrl) {
    return (
      <View style={styles.liveWrap}>
        <LiveNowHeader styles={styles} />
        <View style={[styles.player, { height: videoHeight }]}>
          <WebView
            source={{ uri: status.embedUrl }}
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            style={styles.webview}
          />
        </View>
        <LiveMeta status={status} styles={styles} />
        <PrayerDuringService
          prayer={prayer}
          setPrayer={setPrayer}
          sending={sending}
          setSending={setSending}
          styles={styles}
          colors={colors}
        />
        <Text style={styles.inhouseNote}>
          Watching on Lake Shore Church — live video plays here in the app.
        </Text>
        <LiveReplaysSection replays={replays} />
      </View>
    );
  }

  const nextAt = status?.nextServiceAt ?? new Date().toISOString();
  const { days, hours, minutes } = countdownParts(nextAt);

  return (
    <View style={styles.offlineWrap}>
      <Text style={styles.countdownTitle}>Next service</Text>
      <Text style={styles.countdown}>
        {days}d {hours}h {minutes}m
      </Text>
      <Text style={styles.countdownSub}>Sunday 10:00 AM CT</Text>

      <Pressable
        style={styles.secondaryBtn}
        onPress={() => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          Alert.alert(
            "Reminders",
            "Enable push notifications when TestFlight is available, or contact us from the More tab.",
          );
        }}
      >
        <Text style={styles.secondaryBtnText}>Set reminder</Text>
      </Pressable>

      <Pressable
        style={styles.primaryBtn}
        onPress={() => {
          if (latestSermon) {
            router.push(sermonHref(latestSermon.slug.current, "sermons"));
          } else {
            router.push(nativeRoutes.sermons);
          }
        }}
      >
        <Text style={styles.primaryBtnText}>Watch last Sunday</Text>
      </Pressable>

      <LiveReplaysSection replays={replays} />
    </View>
  );
}

function LiveNowHeader({ styles }: { styles: LiveStyles }) {
  return (
    <View style={styles.liveBadge}>
      <View style={styles.pulseDot} />
      <Text style={styles.liveBadgeText}>LIVE NOW</Text>
    </View>
  );
}

function LiveMeta({ status, styles }: { status: LiveStatus; styles: LiveStyles }) {
  return (
    <>
      <Text style={styles.watching}>Watching: Sunday Service</Text>
      <Text style={styles.meta}>{status.serviceLabel}</Text>
      <Text style={styles.meta}>{status.locationLabel}</Text>
    </>
  );
}

function PrayerDuringService({
  prayer,
  setPrayer,
  sending,
  setSending,
  styles,
  colors,
}: {
  prayer: string;
  setPrayer: (v: string) => void;
  sending: boolean;
  setSending: (v: boolean) => void;
  styles: LiveStyles;
  colors: ThemePalette;
}) {
  async function sendPrayer() {
    const content = prayer.trim();
    if (content.length < 10) {
      Alert.alert("Prayer", "Please share at least a few words.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${APP_URL}/api/prayer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, is_private: false }),
      });
      if (!res.ok) throw new Error("Failed");
      setPrayer("");
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Thank you", "We're praying with you.");
    } catch {
      Alert.alert("Error", "Could not send prayer. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Text style={styles.prayerLabel}>Submit prayer during service</Text>
      <TextInput
        value={prayer}
        onChangeText={setPrayer}
        placeholder="Share your prayer request…"
        multiline
        numberOfLines={2}
        style={styles.prayerInput}
        placeholderTextColor={colors.textMuted}
      />
      <Pressable
        style={[styles.prayerBtn, sending && styles.disabled]}
        onPress={() => void sendPrayer()}
        disabled={sending}
      >
        <Text style={styles.prayerBtnText}>Send Prayer 🙏</Text>
      </Pressable>
    </>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    centered: { padding: 40, alignItems: "center" },
    liveWrap: { padding: 16, paddingBottom: 32 },
    liveBadge: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: "#dc2626",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      marginBottom: 12,
      gap: 6,
    },
    pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#fff",
    },
    liveBadgeText: { color: "#fff", fontWeight: "800", fontSize: 12 },
    player: {
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "#000",
    },
    webview: { flex: 1 },
    watching: { marginTop: 14, fontSize: 16, fontWeight: "700", color: colors.textPrimary },
    meta: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
    inhouseNote: {
      marginTop: 12,
      fontSize: 13,
      color: colors.textMuted,
      lineHeight: 18,
    },
    prayerLabel: { marginTop: 20, fontWeight: "600", color: colors.textPrimary },
    prayerInput: {
      marginTop: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 12,
      minHeight: 72,
      textAlignVertical: "top",
      color: colors.textPrimary,
      backgroundColor: colors.background,
    },
    prayerBtn: {
      marginTop: 10,
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
    },
    prayerBtnText: { color: "#fff", fontWeight: "700" },
    disabled: { opacity: 0.6 },
    offlineWrap: { padding: 24, alignItems: "center" },
    countdownTitle: { fontSize: 18, fontWeight: "700", color: colors.textPrimary },
    countdown: {
      fontSize: 36,
      fontWeight: "800",
      color: colors.primary,
      marginTop: 12,
    },
    countdownSub: { marginTop: 8, color: colors.textMuted },
    primaryBtn: {
      marginTop: 20,
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 10,
    },
    primaryBtnText: { color: "#fff", fontWeight: "700" },
    secondaryBtn: {
      marginTop: 24,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 10,
    },
    secondaryBtnText: { color: colors.primary, fontWeight: "600" },
  });
}
