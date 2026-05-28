const fallbackWhatsAppNumber = "554130102019";

export const whatsAppNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
  fallbackWhatsAppNumber;

export function getWhatsAppLink(message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
}
