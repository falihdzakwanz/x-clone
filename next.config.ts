import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://links.papareact.com/drg")],
  },
};

export default nextConfig;
