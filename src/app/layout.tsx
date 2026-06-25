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
  openGraph: {
    siteName: "Consultor de Vendas Victor Maffei",
    locale: "pt_BR",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <NativeBridge />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
