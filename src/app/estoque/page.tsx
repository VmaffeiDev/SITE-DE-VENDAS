import type { Metadata } from "next";
import { ArrowDownUp, MessageCircle } from "lucide-react";

import { EmptyInventory } from "@/components/EmptyInventory";
import { EstoqueFilters } from "@/components/EstoqueFilters";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getWhatsAppLink } from "@/lib/contact";
import { getInventoryVehicles } from "@/lib/inventory";
import { single } from "@/lib/params";
import type { Vehicle } from "@/types/vehicle";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Estoque de veículos | VMAFFEI Motors",
  description:
    "Consulte veículos disponíveis na VMAFFEI Motors com filtros por marca, modelo, ano, preço, km, combustível e câmbio.",
  alternates: {
    canonical: "/estoque"
  }
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
}

function vehicleYear(vehicle: Vehicle) {
  return (
    vehicle.modelYear?.toString() ||
    vehicle.fabricationYear?.toString() ||
    vehicle.year.split("/").pop() ||
    ""
  );
}

function numericYear(vehicle: Vehicle) {
  return Number(vehicle.modelYear || vehicle.fabricationYear || vehicleYear(vehicle)) || 0;
}

function sortVehicles(vehicles: Vehicle[], sort: string) {
  return [...vehicles].sort((a, b) => {
    if (sort === "price_asc") {
      return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
    }

    if (sort === "price_desc") {
      return (b.price ?? 0) - (a.price ?? 0);
    }

    if (sort === "km_asc") {
      return (a.mileage ?? Number.MAX_SAFE_INTEGER) - (b.mileage ?? Number.MAX_SAFE_INTEGER);
    }

    if (sort === "year_desc") {
      return numericYear(b) - numericYear(a);
    }

    return (b.lastUpdate ?? "").localeCompare(a.lastUpdate ?? "");
  });
}

function matchesFilters(vehicle: Vehicle, filters: Record<string, string>) {
  const haystack = [
    vehicle.title,
    vehicle.brand,
    vehicle.model,
    vehicle.version,
    vehicle.fuel,
    vehicle.transmission,
    vehicle.color
  ]
    .join(" ")
    .toLocaleLowerCase("pt-BR");

  const q = filters.q.toLocaleLowerCase("pt-BR").trim();

  if (q && !haystack.includes(q)) {
    return false;
  }

  if (filters.brand && vehicle.brand !== filters.brand) {
    return false;
  }

  if (filters.model && vehicle.model !== filters.model) {
    return false;
  }

  if (filters.year && vehicleYear(vehicle) !== filters.year) {
    return false;
  }

  if (filters.fuel && vehicle.fuel !== filters.fuel) {
    return false;
  }

  if (filters.transmission && vehicle.transmission !== filters.transmission) {
    return false;
  }

  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);
  const maxKm = Number(filters.maxKm);

  if (Number.isFinite(minPrice) && minPrice > 0 && (vehicle.price ?? 0) < minPrice) {
    return false;
  }

  if (Number.isFinite(maxPrice) && maxPrice > 0 && (vehicle.price ?? 0) > maxPrice) {
    return false;
  }

  if (Number.isFinite(maxKm) && maxKm > 0 && (vehicle.mileage ?? 0) > maxKm) {
    return false;
  }

  return true;
}

export default async function EstoquePage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = {
    q: single(params.q),
    brand: single(params.brand),
    model: single(params.model),
    year: single(params.year),
    minPrice: single(params.minPrice),
    maxPrice: single(params.maxPrice),
    maxKm: single(params.maxKm),
    fuel: single(params.fuel),
    transmission: single(params.transmission),
    sort: single(params.sort) || "latest"
  };

  const vehicles = await getInventoryVehicles();
  const filteredVehicles = sortVehicles(
    vehicles.filter((vehicle) => matchesFilters(vehicle, filters)),
    filters.sort
  );

  const brands = unique(vehicles.map((vehicle) => vehicle.brand));
  const models = unique(
    vehicles
      .filter((vehicle) => !filters.brand || vehicle.brand === filters.brand)
      .map((vehicle) => vehicle.model)
  );
  const years = unique(vehicles.map(vehicleYear)).sort((a, b) => Number(b) - Number(a));
  const fuels = unique(vehicles.map((vehicle) => vehicle.fuel));
  const transmissions = unique(vehicles.map((vehicle) => vehicle.transmission));

  return (
    <section className="bg-mist py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Estoque"
            title="Veículos disponíveis"
            description="Filtre por marca, ano, valor e quilometragem. Se preferir, fale com a loja para receber indicação personalizada."
          />
          <a
            href={getWhatsAppLink("Olá, quero ajuda para encontrar um veículo no estoque.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-sm font-black text-white shadow-soft transition hover:brightness-95"
          >
            <MessageCircle size={18} />
            Ajuda pelo WhatsApp
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <EstoqueFilters
            key={JSON.stringify(filters)}
            brands={brands}
            models={models}
            years={years}
            fuels={fuels}
            transmissions={transmissions}
            defaultValues={filters}
          />

          <div>
            {vehicles.length === 0 ? (
              <EmptyInventory />
            ) : filteredVehicles.length ? (
              <>
                <div className="mb-5 grid gap-3 rounded-lg border border-line bg-white p-4 text-sm text-graphite shadow-sm sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-black text-ink" aria-live="polite" aria-atomic="true">
                      {filteredVehicles.length} de {vehicles.length} veículo(s) encontrado(s)
                    </p>
                    <p className="mt-1">
                      Confirme disponibilidade e condições diretamente com a loja.
                    </p>
                  </div>
                  <p className="inline-flex items-center gap-2 rounded bg-mist px-3 py-2 font-bold text-ink">
                    <ArrowDownUp size={16} />
                    {filters.sort === "price_asc"
                      ? "Menor preço"
                      : filters.sort === "price_desc"
                        ? "Maior preço"
                        : filters.sort === "km_asc"
                          ? "Menor km"
                          : filters.sort === "year_desc"
                            ? "Ano mais novo"
                            : "Mais recentes"}
                  </p>
                </div>
                <VehicleGrid vehicles={filteredVehicles} />
              </>
            ) : (
              <EmptyInventory
                title="Nenhum veículo encontrado"
                description="Ajuste os filtros ou fale com a loja para receber ajuda na busca."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
