import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/i18n";

const TESTIMONIALS = [
  {
    quote:
      "Pastor Brian is a legend. A righteous man who truly spends time in prayer before stepping into the pulpit. Lake Shore Church is one place where you can experience heaven on earth.",
    name: "Sujatha Kannan",
    detail: "Member 2013–2020",
  },
  {
    quote: "A place where you can experience the presence of God.",
    name: "Anand Satyaseelan",
  },
  {
    quote: "Nice place of worship. Very good pastor and church members.",
    name: "Angel",
  },
] as const;

export function TestimonialsSection() {
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        {t("home", "testimonials_intro")}
      </Text>
      <Text style={[styles.ratings, { color: colors.textMuted }]}>{t("home", "ratings")}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {TESTIMONIALS.map((item) => (
          <View
            key={item.name}
            style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}
          >
            <Text style={{ color: colors.accent }}>★★★★★</Text>
            <Text style={[styles.quote, { color: colors.textPrimary }]}>&ldquo;{item.quote}&rdquo;</Text>
            <Text style={[styles.name, { color: colors.primary }]}>{item.name}</Text>
            {"detail" in item && item.detail ? (
              <Text style={[styles.detail, { color: colors.textMuted }]}>{item.detail}</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 24 },
  title: { fontSize: 20, fontWeight: "800", paddingHorizontal: 16 },
  ratings: { fontSize: 14, marginTop: 6, paddingHorizontal: 16, marginBottom: 12 },
  row: { paddingHorizontal: 12, gap: 12 },
  card: {
    width: 280,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  quote: { marginTop: 10, fontSize: 14, lineHeight: 21 },
  name: { marginTop: 12, fontWeight: "700", fontSize: 14 },
  detail: { marginTop: 2, fontSize: 12 },
});
