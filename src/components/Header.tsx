import { Car, MessageCircle } from "lucide-react";
import Link from "next/link";

import { getWhatsAppLink } from "@/lib/contact";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/estoque", label: "Estoque" },
  { href: "/consignar", label: "Consignar" },
  { href: "/admin/consignados", label: "Admin" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-ink text-white">
            <Car size={22} strokeWidth={2.3} />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black tracking-wide text-ink">
              VMAFFEI
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-graphite">
              Motors
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-graphite md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={getWhatsAppLink("Olá, quero falar com a VMAFFEI Motors.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded bg-whatsapp px-4 py-2 text-sm font-extrabold text-white shadow-soft transition hover:brightness-95"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 text-sm font-semibold text-graphite md:hidden">
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
