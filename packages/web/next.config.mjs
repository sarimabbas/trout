/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@trout/shared"],
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
