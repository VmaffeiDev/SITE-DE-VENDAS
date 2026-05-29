import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/BrandMark";
import { getWhatsAppLink } from "@/lib/contact";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/estoque", label: "Estoque" },
  { href: "/consignar", label: "Consignar" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/92 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0">
          <BrandMark className="max-w-[calc(100vw-6.5rem)] sm:max-w-none" />
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-whatsapp px-0 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-95 sm:w-auto sm:px-4"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">WhatsApp</span>
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
      <div
        className="h-1 bg-[linear-gradient(90deg,#009c3b_0%,#009c3b_42%,#ffdf00_42%,#ffdf00_58%,#002776_58%,#002776_100%)]"
        aria-hidden
      />
    </header>
  );
}
