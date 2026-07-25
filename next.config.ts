import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s3.carro57.com.br" },
      { protocol: "https", hostname: "**.carro57.com.br" },
      { protocol: "https", hostname: "**.revendamais.com.br" },
      { protocol: "http", hostname: "app.revendamais.com.br" }
    ]
  }
};

export default nextConfig;
