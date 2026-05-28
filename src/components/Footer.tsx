import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

import { getWhatsAppLink } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="border-b border-white/10 bg-white text-ink">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">
              Busca rápida
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Encontre o veículo ideal
            </h2>
          </div>

          <form
            action="/estoque"
            className="grid gap-3 rounded-lg border border-line bg-mist p-3 shadow-soft sm:grid-cols-[1fr_auto]"
          >
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite"
                size={20}
              />
              <span className="sr-only">Buscar veículo</span>
              <input
                name="q"
                placeholder="Buscar por marca, modelo ou versão"
                className="h-12 border-0 pl-12 pr-4"
              />
            </label>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded bg-ink px-6 text-sm font-black text-white transition hover:bg-graphite">
              Buscar
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-black">VMAFFEI Motors</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Veículos selecionados, atendimento consultivo e negociação segura do
            primeiro contato até a entrega.
          </p>
        </div>

        <div className="space-y-3 text-sm text-white/75">
          <p className="flex items-center gap-2 font-semibold text-white">
            <ShieldCheck size={18} />
            Compra e venda com transparência
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={18} />
            Atendimento presencial e digital
          </p>
          <p className="font-semibold text-white">41 99986-6482</p>
          <a
            href={getWhatsAppLink("Olá, quero atendimento da VMAFFEI Motors.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-whatsapp"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </a>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/75">
          <Link href="/estoque" className="transition hover:text-white">
            Ver estoque
          </Link>
          <Link href="/consignar" className="transition hover:text-white">
            Consignar meu veículo
          </Link>
          <Link href="/admin/consignados" className="transition hover:text-white">
            Painel de consignados
          </Link>
        </div>
      </div>
    </footer>
  );
}
