import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { homeImages } from "@repo/media";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";

const CARDS = [
  { key: "worship", image: homeImages.worship, titleKey: "worship" as const },
  { key: "grow", image: homeImages.bible, titleKey: "grow" as const },
  { key: "serve", image: homeImages.serve, titleKey: "serve" as const },
];

export function MinistryCardsRow() {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.heading, { color: colors.textPrimary }]}>Worship · Grow · Serve</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {CARDS.map((card) => (
          <View
            key={card.key}
            style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}
          >
            <Image source={card.image} style={styles.image} contentFit="cover" />
            <View style={styles.body}>
              <Text style={[styles.title, { color: colors.primary }]}>
                {t(card.titleKey, "title")}
              </Text>
              <Text style={[styles.desc, { color: colors.textMuted }]} numberOfLines={3}>
                {t(card.titleKey, "body")}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 8, marginBottom: 8 },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  row: { paddingHorizontal: 12, gap: 12 },
  card: {
    width: 200,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: { width: "100%", height: 110 },
  body: { padding: 12 },
  title: { fontSize: 16, fontWeight: "700" },
  desc: { marginTop: 6, fontSize: 13, lineHeight: 18 },
});
