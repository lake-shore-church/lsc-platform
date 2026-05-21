/** Shared Tailwind theme — web (PostCSS) and mobile (NativeWind). */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1B4F8A",
        "primary-dark": "#163D6E",
        "primary-light": "#2563A8",
        accent: "#0F7B6C",
        amber: "#B45309",
        background: "#FFFFFF",
        surface: "#F9FAFB",
        "surface-2": "#F3F4F6",
        "text-primary": "#111827",
        "text-secondary": "#374151",
        "text-muted": "#6B7280",
        border: "#E5E7EB",
        success: "#166534",
        error: "#991B1B",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      fontSize: {
        xs: ["11px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "20px" }],
        base: ["15px", { lineHeight: "24px" }],
        lg: ["17px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "32px" }],
        "2xl": ["26px", { lineHeight: "36px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
      },
    },
  },
};
