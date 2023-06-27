/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@trout/xata"],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
