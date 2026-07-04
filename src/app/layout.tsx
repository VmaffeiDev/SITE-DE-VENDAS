import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NativeBridge } from "@/components/NativeBridge";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import "./globals.css";

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
    siteName: "Consultor de Vendas Victor Maffei",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "VMAFFEI Motors — Veículos selecionados"
      }
    ]
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
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        <NativeBridge />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
