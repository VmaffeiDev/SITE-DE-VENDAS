const BASE_URL = "https://consultordevendasvictormaffei.com";

export type Vehicle = {
  id: string;
  title: string;
  brand: string;
  model: string;
  version: string;
  year: string;
  fabricationYear?: number | null;
  modelYear?: number | null;
  mileage: number | null;
  price: number | null;
  fuel: string;
  transmission: string;
  color: string;
  description: string;
  images: string[];
  features: string[];
  featured?: boolean;
  lastUpdate?: string;
  source: "revendamais" | "consignment";
};

export async function fetchVehicles(): Promise<Vehicle[]> {
  const res = await fetch(`${BASE_URL}/api/vehicles`, {
    headers: { Accept: "application/json" }
  });
  if (!res.ok) throw new Error("Erro ao carregar estoque");
  return res.json();
}

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  const res = await fetch(`${BASE_URL}/api/vehicles/${id}`, {
    headers: { Accept: "application/json" }
  });
  if (!res.ok) throw new Error("Veículo não encontrado");
  return res.json();
}

const WHATSAPP_NUMBER = "5541999866482";

export function getWhatsAppLink(message: string): string {
  const capped = message.length > 1000 ? message.slice(0, 999) + "…" : message;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(capped)}`;
}

export function formatCurrency(value: number | null): string {
  if (value == null) return "Consulte";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatMileage(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("pt-BR").format(value) + " km";
}
