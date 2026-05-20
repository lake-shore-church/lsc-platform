/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/cms", "@repo/db"],
};

export default nextConfig;
