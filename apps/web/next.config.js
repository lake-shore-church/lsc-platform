/** @type {import('next').NextConfig} */
const nextConfig = {
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
