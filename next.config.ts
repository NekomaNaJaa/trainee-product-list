import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com", pathname: "/img/**" },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;