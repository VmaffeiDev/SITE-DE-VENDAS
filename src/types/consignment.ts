export const CONSIGNMENT_STATUSES = [
  "pendente_avaliacao",
  "aprovado",
  "recusado",
  "anunciado",
  "vendido"
] as const;

export type ConsignmentStatus = (typeof CONSIGNMENT_STATUSES)[number];

export type ConsignmentImage = {
  src: string;
  label: string;
  fileName: string;
};

export type ConsignmentLeadView = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  brand: string;
  model: string;
  version?: string | null;
  year?: number | null;
  mileage?: number | null;
  plate?: string | null;
  color?: string | null;
  askingPrice?: number | null;
  notes?: string | null;
  images: ConsignmentImage[];
  status: ConsignmentStatus;
  createdAt: Date;
};
