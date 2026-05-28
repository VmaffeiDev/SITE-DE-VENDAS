import { MessageCircle, RefreshCw } from "lucide-react";

import { getWhatsAppLink } from "@/lib/contact";

type EmptyInventoryProps = {
  title?: string;
  description?: string;
};

export function EmptyInventory({
  title = "Estoque indisponível no momento",
  description = "Não conseguimos carregar os veículos agora. Pode ser instabilidade no XML do Revenda Mais ou uma atualização em andamento."
}: EmptyInventoryProps) {
  return (
    <div className="rounded border border-line bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded bg-mist text-ink">
        <RefreshCw size={24} />
      </div>
      <h2 className="mt-5 text-2xl font-black text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-graphite">
        {description}
      </p>
      <a
        href={getWhatsAppLink("Olá, quero consultar o estoque da VMAFFEI Motors.")}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded bg-whatsapp px-5 py-3 text-sm font-black text-white transition hover:brightness-95"
      >
        <MessageCircle size={18} />
        Falar com a loja
      </a>
    </div>
  );
}
