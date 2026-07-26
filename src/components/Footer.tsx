import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Search,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/BrandMark";
import { MapEmbed } from "@/components/MapEmbed";
import { getWhatsAppLink } from "@/lib/contact";

const stores = [
  {
    name: "Loja Auto Shopping Curitiba",
    address: "BR-116, 7500 - Tarumã, Curitiba - PR, 82590-400",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=BR-116%2C%207500%20-%20Tarum%C3%A3%2C%20Curitiba%20-%20PR"
  },
  {
    name: "Loja Hauer",
    address: "Rua Anne Frank, 2096 - Hauer, Curitiba - PR",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua%20Anne%20Frank%2C%202096%20-%20Hauer%2C%20Curitiba%20-%20PR"
  }
];

const mapEmbedUrl =
  "https://maps.google.com/maps?hl=pt-BR&q=BR-116%2C%207500%20-%20Tarum%C3%A3%2C%20Curitiba%20-%20PR&z=15&output=embed";

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
            <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded bg-ink px-6 text-sm font-black text-white transition hover:bg-graphite">
              Buscar
              <ArrowRight size={18} aria-hidden />
            </button>
          </form>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#141414]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/50">
              Nossas lojas
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Atendimento presencial em Curitiba
            </h2>
            <div className="mt-6 grid gap-3">
              {stores.map((store) => (
                <div
                  key={store.name}
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
                >
                  <p className="flex items-center gap-2 font-black text-white">
                    <MapPin size={18} />
                    {store.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {store.address}
                  </p>
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-black text-whatsapp"
                  >
                    <Navigation size={16} />
                    Abrir rota no Maps
                  </a>
                </div>
              ))}
            </div>
          </div>

          <MapEmbed
            title="Mapa da loja Auto Shopping Curitiba"
            embedUrl={mapEmbedUrl}
            mapsUrl={stores[0].mapsUrl}
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <BrandMark invert />
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
            href="mailto:atendimento@consultordevendasvictormaffei.com"
            className="flex items-center gap-2 break-all transition hover:text-white"
          >
            <Mail size={18} className="shrink-0" />
            atendimento@consultordevendasvictormaffei.com
          </a>
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
        </div>
      </div>
    </footer>
  );
}
