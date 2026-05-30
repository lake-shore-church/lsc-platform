import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
} from "react-native";
import { useThemedStyles } from "@/lib/useThemedStyles";
import { useTheme } from "@/lib/ThemeContext";
import type { ThemePalette } from "@/constants/themes";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  label,
  variant = "primary",
  loading,
  disabled,
  ...props
}: PressableProps & {
  label: string;
  variant?: Variant;
  loading?: boolean;
  className?: string;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      style={[
        styles.base,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        (disabled || loading) && styles.disabled,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : colors.primary} />
      ) : (
        <Text
          style={[
            styles.label,
            isPrimary && styles.labelPrimary,
            (isSecondary || variant === "ghost") && { color: colors.primary },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

function createStyles(colors: ThemePalette) {
  return StyleSheet.create({
    base: {
      minHeight: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingHorizontal: 16,
    },
    primary: { backgroundColor: colors.primary },
    secondary: {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.background,
    },
    disabled: { opacity: 0.5 },
    label: { fontSize: 16, fontWeight: "600" },
    labelPrimary: { color: "#fff" },
  });
}
