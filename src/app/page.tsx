import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EmptyInventory } from "@/components/EmptyInventory";
import { HeroVehicleSpotlight } from "@/components/HeroVehicleSpotlight";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getInventoryVehicles } from "@/lib/inventory";

export const revalidate = 300;

export default async function Home() {
  const vehicles = await getInventoryVehicles();
  const featured = vehicles.filter((vehicle) => vehicle.featured).slice(0, 6);
  const latest = [...vehicles]
    .sort((a, b) => (b.lastUpdate ?? "").localeCompare(a.lastUpdate ?? ""))
    .slice(0, 6);
  const heroVehicles = (featured.length ? featured : vehicles).slice(0, 5);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_top,#ffffff_0%,#f7f8fa_48%,#eef0f3_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {heroVehicles.length ? (
            <HeroVehicleSpotlight vehicles={heroVehicles} />
          ) : (
            <EmptyInventory />
          )}
        </div>
      </section>

      <section className="bg-mist py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Veículos em destaque"
              title="Selecionados para você"
              description="Os principais anúncios publicados no estoque da loja."
            />
            <Link
              href="/estoque"
              className="inline-flex items-center gap-2 text-sm font-black text-ink"
            >
              Ver todos
              <ArrowRight size={18} />
            </Link>
          </div>

          {featured.length ? (
            <VehicleGrid vehicles={featured} />
          ) : (
            <EmptyInventory title="Nenhum destaque encontrado" />
          )}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Últimos adicionados"
              title="Novidades no estoque"
              description="Atualização automática a cada 5 minutos com base no XML do Revenda Mais."
            />
            <Link
              href="/estoque"
              className="inline-flex items-center gap-2 text-sm font-black text-ink"
            >
              Explorar estoque
              <ArrowRight size={18} />
            </Link>
          </div>

          {latest.length ? <VehicleGrid vehicles={latest} /> : <EmptyInventory />}
        </div>
      </section>
    </>
  );
}
