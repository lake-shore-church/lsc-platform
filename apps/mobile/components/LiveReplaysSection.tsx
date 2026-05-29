import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/tokens";
import type { MobileSermon } from "@/lib/api";

type Props = {
  replays: MobileSermon[];
  days?: number;
};

export function LiveReplaysSection({ replays, days = 31 }: Props) {
  const router = useRouter();

  if (!replays.length) return null;

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Recent services ({days} days)</Text>
      <Text style={styles.note}>
        Streamed from our server — not saved on your phone unless you tap Download on a
        message.
      </Text>
      {replays.map((s) => (
        <Pressable
          key={s._id}
          style={styles.row}
          onPress={() => router.push(`/sermon/${s.slug.current}`)}
        >
          <Text style={styles.title}>{s.title}</Text>
          {s.publishedAt ? (
            <Text style={styles.date}>
              {new Date(s.publishedAt).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 28, paddingHorizontal: 16, paddingBottom: 24 },
  heading: { fontSize: 18, fontWeight: "700", color: colors.primary },
  note: { marginTop: 6, fontSize: 13, lineHeight: 18, color: colors.textMuted },
  row: {
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  title: { fontSize: 15, fontWeight: "600", color: colors.textPrimary },
  date: { marginTop: 4, fontSize: 13, color: colors.textMuted },
});
