import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { getWhatsAppLink } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
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
