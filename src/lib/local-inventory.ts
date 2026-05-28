import { prisma } from "@/lib/prisma";
import type { Vehicle } from "@/types/vehicle";

function parseStringArray(value: string | null | undefined) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object" && "src" in item) {
          return String((item as { src: unknown }).src);
        }

        return "";
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function mapVehicle(record: {
  id: string;
  title: string;
  brand: string;
  model: string;
  version: string | null;
  year: number | null;
  mileage: number | null;
  price: number | null;
  fuel: string | null;
  transmission: string | null;
  color: string | null;
  description: string | null;
  images: string;
  features: string;
  createdAt: Date;
}): Vehicle {
  return {
    id: record.id,
    title: record.title,
    brand: record.brand,
    model: record.model,
    version: record.version ?? "",
    year: record.year ? String(record.year) : "",
    fabricationYear: record.year,
    modelYear: record.year,
    mileage: record.mileage,
    price: record.price,
    fuel: record.fuel ?? "",
    transmission: record.transmission ?? "",
    color: record.color ?? "",
    description: record.description ?? "",
    images: parseStringArray(record.images),
    features: parseStringArray(record.features),
    featured: true,
    lastUpdate: record.createdAt.toISOString(),
    source: "consignment"
  };
}

export async function getLocalVehicles(): Promise<Vehicle[]> {
  try {
    const records = await prisma.vehicle.findMany({
      orderBy: { createdAt: "desc" }
    });

    return records.map(mapVehicle);
  } catch (error) {
    console.warn("Nao foi possivel carregar veiculos locais:", error);
    return [];
  }
}

export async function getLocalVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const record = await prisma.vehicle.findUnique({
      where: { id }
    });

    return record ? mapVehicle(record) : null;
  } catch (error) {
    console.warn("Nao foi possivel carregar veiculo local:", error);
    return null;
  }
}
