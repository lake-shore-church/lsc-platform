import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableProps,
} from "react-native";
import { colors } from "@/constants/tokens";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  label,
  variant = "primary",
  loading,
  disabled,
  className,
  ...props
}: PressableProps & {
  label: string;
  variant?: Variant;
  loading?: boolean;
  className?: string;
}) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      className={`min-h-[44px] items-center justify-center rounded-lg px-4 ${
        isPrimary ? "bg-primary" : isSecondary ? "border border-primary bg-white" : ""
      } ${disabled || loading ? "opacity-50" : ""} ${className ?? ""}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : colors.primary} />
      ) : (
        <Text
          className={`text-base font-semibold ${
            isPrimary ? "text-white" : isSecondary ? "text-primary" : "text-primary"
          }`}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
