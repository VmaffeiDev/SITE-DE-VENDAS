import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.carro57.com.br"
      }
    ]
  }
};

export default nextConfig;
