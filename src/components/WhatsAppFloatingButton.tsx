"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { getWhatsAppLink } from "@/lib/contact";

type WhatsAppFloatingButtonProps = {
  message?: string;
};

export function WhatsAppFloatingButton({
  message = "Olá, quero falar com a VMAFFEI Motors."
}: WhatsAppFloatingButtonProps) {
  const pathname = usePathname();
  const isVehiclePage = pathname.startsWith("/veiculo/");

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 z-50 h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-soft transition hover:scale-105 hover:brightness-95 ${isVehiclePage ? "hidden sm:flex" : "flex"}`}
    >
      <MessageCircle size={26} />
    </a>
  );
}
