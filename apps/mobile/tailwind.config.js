const baseConfig = require("@repo/config/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
};
