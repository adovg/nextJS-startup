import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [new URL("https://placehold.co/600x400")],
  },
};

export default nextConfig;
