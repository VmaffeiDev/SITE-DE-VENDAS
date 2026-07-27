import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NativeBridge } from "@/components/NativeBridge";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VMAFFEI Motors | Veículos selecionados",
  description:
    "Estoque de veículos da VMAFFEI Motors sincronizado automaticamente pelo Revenda Mais.",
  metadataBase: new URL("https://consultordevendasvictormaffei.com"),
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    siteName: "VMAFFEI Motors",
    locale: "pt_BR",
    type: "website"
  }
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "VMAFFEI Motors",
  url: "https://consultordevendasvictormaffei.com",
  telephone: "+554199866482",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR"
  },
  sameAs: [`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5541999866482"}`]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        <NativeBridge />
        {children}
      </body>
    </html>
  );
}
