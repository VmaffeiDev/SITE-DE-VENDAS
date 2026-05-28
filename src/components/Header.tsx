import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/BrandMark";
import { getWhatsAppLink } from "@/lib/contact";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/estoque", label: "Estoque" },
  { href: "/consignar", label: "Consignar" },
  { href: "/admin/consignados", label: "Admin" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/92 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0">
          <BrandMark className="max-w-[245px] sm:max-w-none" />
        </Link>

        <nav className="hidden items-center rounded-lg border border-line bg-mist/70 p-1 text-sm font-bold text-graphite md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-4 py-2 transition hover:bg-white hover:text-ink hover:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={getWhatsAppLink(
            "Olá, quero falar com o consultor Victor Maffei da Squ4ttro Motors."
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-whatsapp px-4 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-95"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 text-sm font-bold text-graphite md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded px-3 py-2 transition hover:bg-mist hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
