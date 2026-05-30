const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

process.env.EXPO_ROUTER_APP_ROOT = path.resolve(projectRoot, "app");
process.env.EXPO_ROUTER_IMPORT_MODE = "sync";

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];
// One React copy — root hoists 19.2 (web) while mobile needs 19.1.
config.resolver.disableHierarchicalLookup = true;

const singletons = [
  "react",
  "react-native",
  "react-dom",
  "expo",
  "expo-router",
  "expo-modules-core",
  "expo-constants",
  "@expo/metro-runtime",
];

config.resolver.extraNodeModules = {
  "@repo/media": path.resolve(monorepoRoot, "packages/media"),
  ...Object.fromEntries(
    singletons.map((name) => [
      name,
      path.resolve(projectRoot, "node_modules", name),
    ]),
  ),
};

const shimsPath = path.resolve(projectRoot, "shims.js");
const priorRunBeforeMain =
  config.serializer?.getModulesRunBeforeMainModule ?? (() => []);

config.serializer = {
  ...config.serializer,
  getModulesRunBeforeMainModule: () => [
    shimsPath,
    ...priorRunBeforeMain(),
  ],
};

module.exports = withNativeWind(config, { input: "./global.css" });
