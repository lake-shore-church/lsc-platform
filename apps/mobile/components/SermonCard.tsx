import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { MobileSermon } from "@/lib/api";
import { useTheme } from "@/lib/ThemeContext";

type Props = {
  sermon: MobileSermon;
  onPress: () => void;
  compact?: boolean;
};

export function SermonCard({ sermon, onPress, compact }: Props) {
  const { colors } = useTheme();
  const date = sermon.publishedAt
    ? new Date(sermon.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Pressable
      style={[
        styles.card,
        compact && styles.cardCompact,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.thumb,
          compact && styles.thumbCompact,
          { backgroundColor: `${colors.primary}22` },
        ]}
      >
        {sermon.imageUrl ? (
          <Image source={{ uri: sermon.imageUrl }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: `${colors.primary}18` }]}>
            <Text style={[styles.placeholderText, { color: colors.primary }]}>LSC</Text>
          </View>
        )}
      </View>
      <View style={styles.body}>
        {sermon.series?.title ? (
          <Text
            style={[styles.badge, { color: colors.primary, backgroundColor: `${colors.primary}14` }]}
            numberOfLines={1}
          >
            {sermon.series.title}
          </Text>
        ) : null}
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={compact ? 2 : 3}>
          {sermon.title}
        </Text>
        {sermon.scripture ? (
          <Text style={[styles.meta, { color: colors.textMuted }]} numberOfLines={1}>
            {sermon.scripture}
          </Text>
        ) : null}
        {sermon.pastor?.name ? (
          <Text style={[styles.meta, { color: colors.textMuted }]} numberOfLines={1}>
            {sermon.pastor.name}
          </Text>
        ) : null}
        {date && !compact ? (
          <Text style={[styles.date, { color: colors.textMuted }]}>{date}</Text>
        ) : null}
      </View>
      {sermon.videoUrl ? (
        <View style={styles.playWrap}>
          <Text style={[styles.play, { color: colors.primary }]}>▶</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardCompact: { marginHorizontal: 0, width: 180 },
  thumb: { width: 112, height: 72 },
  thumbCompact: { width: 180, height: 101 },
  image: { width: "100%", height: "100%" },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: { fontWeight: "700", fontSize: 14 },
  body: { flex: 1, padding: 12 },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 6,
  },
  title: { fontSize: 15, fontWeight: "700" },
  meta: { marginTop: 3, fontSize: 13 },
  date: { marginTop: 4, fontSize: 12 },
  playWrap: { paddingRight: 12 },
  play: { fontSize: 18 },
});
