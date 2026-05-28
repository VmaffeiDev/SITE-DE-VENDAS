import { ArrowRight, CarFront, Search, ShieldCheck, Sparkles } from "lucide-react";
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
      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-white" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:min-h-[650px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-graphite shadow-sm ring-1 ring-line">
              <Sparkles size={16} />
              Estoque sincronizado
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Encontre seu próximo carro na VMAFFEI Motors
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
              Veículos publicados no Revenda Mais entram automaticamente no site,
              com fotos, opcionais, ficha técnica e atendimento direto pelo WhatsApp.
            </p>

            <form
              action="/estoque"
              className="mt-8 grid gap-3 rounded-lg border border-line bg-white p-3 shadow-premium sm:grid-cols-[1fr_auto]"
            >
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite"
                  size={20}
                />
                <span className="sr-only">Buscar veículo</span>
                <input
                  name="q"
                  placeholder="Buscar por marca, modelo ou versão"
                  className="h-12 border-0 pl-12 pr-4"
                />
              </label>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded bg-ink px-6 text-sm font-black text-white shadow-sm transition hover:bg-graphite">
                Buscar estoque
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 grid gap-3 text-sm font-semibold text-graphite sm:grid-cols-3">
              <span className="inline-flex items-center gap-2 rounded border border-line bg-white px-3 py-3 shadow-sm">
                <ShieldCheck size={18} />
                Procedência
              </span>
              <span className="inline-flex items-center gap-2 rounded border border-line bg-white px-3 py-3 shadow-sm">
                <CarFront size={18} />
                Fotos reais
              </span>
              <span className="inline-flex items-center gap-2 rounded border border-line bg-white px-3 py-3 shadow-sm">
                <Search size={18} />
                Busca rápida
              </span>
            </div>

            <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-black text-ink">{vehicles.length}</p>
                <p className="mt-1 text-sm font-semibold text-graphite">
                  veículos no estoque
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-ink">5 min</p>
                <p className="mt-1 text-sm font-semibold text-graphite">
                  atualização automática
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-ink">100%</p>
                <p className="mt-1 text-sm font-semibold text-graphite">
                  atendimento consultivo
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pl-4">
            {heroVehicles.length ? <HeroVehicleSpotlight vehicles={heroVehicles} /> : (
              <EmptyInventory />
            )}
          </div>
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
