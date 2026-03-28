import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withIntlPlugin = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.aceternity.com",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withIntlPlugin(nextConfig);
