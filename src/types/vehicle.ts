export type VehicleSource = "revendamais" | "consignment";

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
  source: VehicleSource;
};
