import { MessageCircle } from "lucide-react";

import { getWhatsAppLink } from "@/lib/contact";

type WhatsAppFloatingButtonProps = {
  message?: string;
};

export function WhatsAppFloatingButton({
  message = "Olá, quero falar com a VMAFFEI Motors."
}: WhatsAppFloatingButtonProps) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-soft transition hover:scale-105 hover:brightness-95"
    >
      <MessageCircle size={26} />
    </a>
  );
}
