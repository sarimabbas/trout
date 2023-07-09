/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@trout.run/shared"],
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
