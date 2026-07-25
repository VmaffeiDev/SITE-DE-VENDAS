const fallbackWhatsAppNumber = "5541999866482";

export const whatsAppNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
  fallbackWhatsAppNumber;

const MAX_MESSAGE_LENGTH = 1000;

export function getWhatsAppLink(message: string) {
  const capped =
    message.length > MAX_MESSAGE_LENGTH
      ? message.slice(0, MAX_MESSAGE_LENGTH - 1) + "…"
      : message;
  const encodedMessage = encodeURIComponent(capped);
  return `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
}
