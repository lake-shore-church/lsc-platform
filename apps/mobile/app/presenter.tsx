import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import type { ThemePalette } from "@/constants/themes";
import { useAuth } from "@/lib/AuthContext";
import { fetchJson, type MobileSermon } from "@/lib/api";
import { bindVolumeSlideControl } from "@/lib/volumeManager";
import {
  endPresentation,
  startPresentation,
  subscribePresentation,
  updatePresentationSlide,
} from "@/lib/presentation";
import { useTheme } from "@/lib/ThemeContext";

const HIDE_MS = 3000;

function youtubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ? `https://www.youtube.com/embed/${match[1]}?autoplay=0` : null;
}

function isStaffRole(role: string | null | undefined): boolean {
  return role === "staff" || role === "admin";
}

export default function PresenterScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const { profile, role, isLoading: authLoading, user } = useAuth();

  const [sermon, setSermon] = useState<MobileSermon | null>(null);
  const [pickList, setPickList] = useState<MobileSermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncingRemote = useRef(false);

  const slides = sermon?.slideUrls?.length
    ? sermon.slideUrls
    : sermon?.imageUrl
      ? [sermon.imageUrl]
      : [];

  const bumpControls = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), HIDE_MS);
  }, []);

  const publishSlide = useCallback(
    async (index: number) => {
      if (!user?.id || !sermon) return;
      setSlideIndex(index);
      try {
        await updatePresentationSlide(index, user.id);
      } catch {
        /* offline — local slide still updates */
      }
    },
    [sermon, user?.id],
  );

  const changeSlide = useCallback(
    (delta: number) => {
      if (!slides.length) return;
      const next = Math.max(0, Math.min(slides.length - 1, slideIndex + delta));
      if (next === slideIndex) return;
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      void publishSlide(next);
      bumpControls();
    },
    [slideIndex, slides.length, publishSlide, bumpControls],
  );

  useEffect(() => {
    void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    bumpControls();
    return () => {
      void ScreenOrientation.unlockAsync();
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [bumpControls]);

  useEffect(() => {
    if (!isStaffRole(role)) return;
    Promise.all([
      slug
        ? fetchJson<{ sermon: MobileSermon }>(`/api/mobile/sermons/${slug}`).catch(
            () => null,
          )
        : Promise.resolve(null),
      fetchJson<{ sermons: MobileSermon[] }>("/api/mobile/sermons").catch(() => ({
        sermons: [],
      })),
    ])
      .then(([detail, all]) => {
        const list = all.sermons ?? [];
        setPickList(list);
        if (detail?.sermon) setSermon(detail.sermon);
        else if (slug) {
          const found = list.find((s) => s.slug.current === slug);
          if (found) setSermon(found);
        } else if (list[0]) setSermon(list[0]);
      })
      .finally(() => setLoading(false));
  }, [slug, role]);

  useEffect(() => {
    if (!user?.id || !sermon || !slides.length) return;
    void startPresentation({
      sermonId: sermon.slug.current,
      totalSlides: slides.length,
      userId: user.id,
    }).catch(() => {});

    return () => {
      void endPresentation(user.id).catch(() => {});
    };
  }, [sermon?._id, slides.length, user?.id]);

  useEffect(() => {
    const channel = subscribePresentation((row) => {
      if (row.sermon_id && sermon && row.sermon_id !== sermon.slug.current) return;
      if (typeof row.current_slide === "number") {
        syncingRemote.current = true;
        setSlideIndex(row.current_slide);
        syncingRemote.current = false;
      }
    });
    return () => {
      void channel.unsubscribe();
    };
  }, [sermon?.slug.current]);

  useEffect(() => {
    let unbind = () => {};
    void bindVolumeSlideControl((delta) => changeSlide(delta)).then((cleanup) => {
      unbind = cleanup;
    });
    return () => {
      unbind();
    };
  }, [changeSlide]);

  const changeSlideRef = useRef(changeSlide);
  changeSlideRef.current = changeSlide;
  const bumpControlsRef = useRef(bumpControls);
  bumpControlsRef.current = bumpControls;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (_, g) => {
          bumpControlsRef.current();
          if (g.dx > 40) changeSlideRef.current(-1);
          else if (g.dx < -40) changeSlideRef.current(1);
        },
      }),
    [],
  );

  if (authLoading || loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!isStaffRole(role)) {
    return (
      <View style={styles.centered}>
        <Text style={styles.deniedTitle}>Staff only</Text>
        <Text style={styles.deniedSub}>Presenter Mode requires a staff or admin account.</Text>
        <Pressable style={styles.deniedBtn} onPress={() => router.replace("/auth")}>
          <Text style={styles.deniedBtnText}>Sign in</Text>
        </Pressable>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  if (!sermon || !slides.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.deniedTitle}>No slides</Text>
        <Text style={styles.deniedSub}>
          Add presentation slides in Sanity Studio for this sermon, or pick another message.
        </Text>
        <ScrollView style={styles.pickList}>
          {pickList.map((s) => (
            <Pressable
              key={s._id}
              style={styles.pickRow}
              onPress={() => {
                setSermon(s);
                setSlideIndex(0);
              }}
            >
              <Text style={styles.pickTitle}>{s.title}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Exit</Text>
        </Pressable>
      </View>
    );
  }

  const embed = youtubeEmbedUrl(sermon.videoUrl);
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.root} {...panResponder.panHandlers}>
      <StatusBar hidden />
      <Pressable style={StyleSheet.absoluteFill} onPress={bumpControls}>
        <Image
          source={{ uri: slides[slideIndex] }}
          style={{ width, height }}
          contentFit="contain"
        />
      </Pressable>

      {showControls ? (
        <>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <Ionicons name="close" size={28} color="#fff" />
            </Pressable>
            <View style={styles.topCenter}>
              <Text style={styles.sermonTitle} numberOfLines={1}>
                {sermon.title}
              </Text>
              <Text style={styles.slideCounter}>
                Slide {slideIndex + 1} / {slides.length}
              </Text>
            </View>
            {embed ? (
              <Pressable onPress={() => setVideoOpen(true)} hitSlop={12}>
                <Ionicons name="logo-youtube" size={28} color="#fff" />
              </Pressable>
            ) : (
              <View style={{ width: 28 }} />
            )}
          </View>

          <View style={styles.navRow}>
            <Pressable style={styles.navBtn} onPress={() => changeSlide(-1)}>
              <Ionicons name="chevron-back" size={32} color="#fff" />
            </Pressable>
            <Pressable style={styles.navBtn} onPress={() => changeSlide(1)}>
              <Ionicons name="chevron-forward" size={32} color="#fff" />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbStrip}
            contentContainerStyle={styles.thumbContent}
          >
            {slides.map((uri, i) => (
              <Pressable
                key={`${uri}-${i}`}
                onPress={() => {
                  void Haptics.selectionAsync();
                  void publishSlide(i);
                  bumpControls();
                }}
                style={[styles.thumb, i === slideIndex && styles.thumbActive]}
              >
                <Image source={{ uri }} style={styles.thumbImage} contentFit="cover" />
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : null}

      <Modal visible={videoOpen} animationType="slide" supportedOrientations={["landscape"]}>
        <View style={styles.videoModal}>
          <Pressable style={styles.videoClose} onPress={() => setVideoOpen(false)}>
            <Text style={styles.videoCloseText}>Close video</Text>
          </Pressable>
          {embed ? (
            <WebView
              source={{ uri: embed }}
              style={styles.videoWeb}
              allowsFullscreenVideo
              javaScriptEnabled
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  centered: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  deniedTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  deniedSub: { color: "rgba(255,255,255,0.75)", textAlign: "center", marginTop: 8 },
  deniedBtn: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  deniedBtnText: { color: "#fff", fontWeight: "700" },
  backLink: { color: "rgba(255,255,255,0.8)", marginTop: 16 },
  pickList: { maxHeight: 200, marginTop: 16, width: "100%" },
  pickRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
  },
  pickTitle: { color: "#fff", fontSize: 15 },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  topCenter: { flex: 1, marginHorizontal: 12 },
  sermonTitle: { color: "#fff", fontWeight: "700", fontSize: 15 },
  slideCounter: { color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2 },
  navRow: {
    position: "absolute",
    top: "42%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  navBtn: {
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 999,
    padding: 8,
  },
  thumbStrip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 88,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  thumbContent: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  thumb: {
    width: 100,
    height: 56,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
    marginRight: 8,
  },
  thumbActive: { borderColor: colors.amber },
  thumbImage: { width: "100%", height: "100%" },
  videoModal: { flex: 1, backgroundColor: "#000" },
  videoClose: { padding: 16, paddingTop: 48 },
  videoCloseText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  videoWeb: { flex: 1 },
});
}
