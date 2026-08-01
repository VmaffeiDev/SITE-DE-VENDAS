import type { NextConfig } from "next";

// O XML do Revenda Mais serve as fotos por vários hosts/CDNs. Qualquer host fora
// desta lista faz o otimizador do Next responder 400 e a foto do anúncio não
// aparece, por isso os domínios do feed entram com curinga de subdomínio.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "carro57.com.br" },
      { protocol: "https", hostname: "**.carro57.com.br" },
      { protocol: "http", hostname: "**.carro57.com.br" },
      { protocol: "https", hostname: "revendamais.com.br" },
      { protocol: "https", hostname: "**.revendamais.com.br" },
      { protocol: "http", hostname: "**.revendamais.com.br" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.cloudfront.net" }
    ]
  }
};

export default nextConfig;
