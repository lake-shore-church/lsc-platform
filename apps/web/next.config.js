import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Monorepo + path with spaces — stop Turbopack inferring apps/web/app as root
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  transpilePackages: ["@repo/ui", "@repo/cms", "@repo/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.sanity.io",
      },
      {
        protocol: "https",
        hostname: "media.lschurch.com",
      },
    ],
  },
};

export default nextConfig;
