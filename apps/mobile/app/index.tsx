import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "@/lib/ThemeContext";

export default function Index() {
  const router = useRouter();
  const { colors } = useTheme();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.surface }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
