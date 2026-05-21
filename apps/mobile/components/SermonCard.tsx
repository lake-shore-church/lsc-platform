import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { MobileSermon } from "@/lib/api";
import { colors } from "@/constants/tokens";

type Props = {
  sermon: MobileSermon;
  onPress: () => void;
  compact?: boolean;
};

export function SermonCard({ sermon, onPress, compact }: Props) {
  const date = sermon.publishedAt
    ? new Date(sermon.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Pressable
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
    >
      <View style={[styles.thumb, compact && styles.thumbCompact]}>
        {sermon.imageUrl ? (
          <Image source={{ uri: sermon.imageUrl }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>LSC</Text>
          </View>
        )}
      </View>
      <View style={styles.body}>
        {sermon.series?.title ? (
          <Text style={styles.badge} numberOfLines={1}>
            {sermon.series.title}
          </Text>
        ) : null}
        <Text style={styles.title} numberOfLines={compact ? 2 : 3}>
          {sermon.title}
        </Text>
        {sermon.scripture ? (
          <Text style={styles.meta} numberOfLines={1}>
            {sermon.scripture}
          </Text>
        ) : null}
        {sermon.pastor?.name ? (
          <Text style={styles.meta} numberOfLines={1}>
            {sermon.pastor.name}
          </Text>
        ) : null}
        {date && !compact ? <Text style={styles.date}>{date}</Text> : null}
      </View>
      {sermon.videoUrl ? (
        <View style={styles.playWrap}>
          <Text style={styles.play}>▶</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  cardCompact: { marginHorizontal: 0, width: 180 },
  thumb: { width: 112, height: 72, backgroundColor: `${colors.primary}22` },
  thumbCompact: { width: 180, height: 101 },
  image: { width: "100%", height: "100%" },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.primary}18`,
  },
  placeholderText: { fontWeight: "700", color: colors.primary, fontSize: 14 },
  body: { flex: 1, padding: 12 },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
    backgroundColor: `${colors.primary}14`,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 6,
  },
  title: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
  meta: { marginTop: 3, fontSize: 13, color: colors.textMuted },
  date: { marginTop: 4, fontSize: 12, color: colors.textMuted },
  playWrap: { paddingRight: 12 },
  play: { fontSize: 18, color: colors.primary },
});
