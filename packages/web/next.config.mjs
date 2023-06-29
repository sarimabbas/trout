import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@trout/xata"],
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
