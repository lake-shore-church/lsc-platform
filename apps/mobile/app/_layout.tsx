import "../global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider as LscThemeProvider, useTheme } from "@/lib/ThemeContext";
import { initMobileI18n } from "@/lib/i18n";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    void initMobileI18n().then(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    if (loaded && i18nReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, i18nReady]);

  if (!loaded || !i18nReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LscThemeProvider>
          <RootLayoutNav />
        </LscThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  const navTheme = {
    ...(colorScheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.surface,
      card: colors.background,
      text: colors.textPrimary,
      border: colors.border,
    },
  };

  return (
    <NavThemeProvider value={navTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.surface },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
        <Stack.Screen name="auth/index" options={{ headerShown: false, title: "More" }} />
        <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
        <Stack.Screen name="sermon/[slug]" options={{ title: "Sermon", headerBackTitle: "Back" }} />
        <Stack.Screen name="visit" options={{ title: "Plan a visit" }} />
        <Stack.Screen name="contact" options={{ title: "Contact" }} />
        <Stack.Screen name="events" options={{ title: "Events", headerBackTitle: "Back" }} />
        <Stack.Screen name="event/[id]" options={{ title: "Event", headerBackTitle: "Back" }} />
        <Stack.Screen name="blog/[slug]" options={{ title: "Article", headerBackTitle: "Back" }} />
        <Stack.Screen
          name="presenter"
          options={{ headerShown: false, orientation: "landscape" }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </NavThemeProvider>
  );
}
