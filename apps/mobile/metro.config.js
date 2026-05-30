const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;

// expo-router: app routes live in apps/mobile/app (not monorepo root).
process.env.EXPO_ROUTER_APP_ROOT = path.resolve(projectRoot, "app");
process.env.EXPO_ROUTER_IMPORT_MODE = "sync";

// SDK 52+ — Expo auto-configures monorepo Metro; only add NativeWind here.
const config = getDefaultConfig(projectRoot);

module.exports = withNativeWind(config, { input: "./global.css" });
