import { SlidersHorizontal } from "lucide-react";

import { EmptyInventory } from "@/components/EmptyInventory";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { formatCurrency } from "@/lib/format";
import { getInventoryVehicles } from "@/lib/inventory";
import type { Vehicle } from "@/types/vehicle";

export const revalidate = 300;

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

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
    transmission: single(params.transmission)
  };

  const vehicles = await getInventoryVehicles();
  const filteredVehicles = vehicles.filter((vehicle) => matchesFilters(vehicle, filters));

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
            description="Todos os anúncios publicados no Revenda Mais aparecem aqui automaticamente."
          />
          <p className="text-sm font-semibold text-graphite">
            {filteredVehicles.length} de {vehicles.length} veículo(s)
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded border border-line bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2 text-lg font-black text-ink">
              <SlidersHorizontal size={20} />
              Filtros
            </div>

            <form className="grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Busca
                <input
                  name="q"
                  defaultValue={filters.q}
                  placeholder="Marca, modelo ou versão"
                  className="h-11 px-3"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Marca
                <select name="brand" defaultValue={filters.brand} className="h-11 px-3">
                  <option value="">Todas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Modelo
                <select name="model" defaultValue={filters.model} className="h-11 px-3">
                  <option value="">Todos</option>
                  {models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Ano
                <select name="year" defaultValue={filters.year} className="h-11 px-3">
                  <option value="">Todos</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-2 text-sm font-bold text-ink">
                  Preço mín.
                  <input
                    name="minPrice"
                    type="number"
                    defaultValue={filters.minPrice}
                    placeholder="0"
                    className="h-11 px-3"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-ink">
                  Preço máx.
                  <input
                    name="maxPrice"
                    type="number"
                    defaultValue={filters.maxPrice}
                    placeholder="150000"
                    className="h-11 px-3"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Km máximo
                <input
                  name="maxKm"
                  type="number"
                  defaultValue={filters.maxKm}
                  placeholder="80000"
                  className="h-11 px-3"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Combustível
                <select name="fuel" defaultValue={filters.fuel} className="h-11 px-3">
                  <option value="">Todos</option>
                  {fuels.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Câmbio
                <select
                  name="transmission"
                  defaultValue={filters.transmission}
                  className="h-11 px-3"
                >
                  <option value="">Todos</option>
                  {transmissions.map((transmission) => (
                    <option key={transmission} value={transmission}>
                      {transmission}
                    </option>
                  ))}
                </select>
              </label>

              <button className="rounded bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-graphite">
                Aplicar filtros
              </button>
              <a
                href="/estoque"
                className="text-center text-sm font-bold text-graphite transition hover:text-ink"
              >
                Limpar filtros
              </a>
            </form>
          </aside>

          <div>
            {vehicles.length === 0 ? (
              <EmptyInventory />
            ) : filteredVehicles.length ? (
              <>
                <div className="mb-5 rounded border border-line bg-white px-4 py-3 text-sm text-graphite shadow-sm">
                  Valores de {formatCurrency(0)} até o limite informado nos filtros.
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
