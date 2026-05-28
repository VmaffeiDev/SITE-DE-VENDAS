import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CarFront,
  FileCheck2,
  Handshake,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";

import { EmptyInventory } from "@/components/EmptyInventory";
import { HeroVehicleSpotlight } from "@/components/HeroVehicleSpotlight";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getWhatsAppLink } from "@/lib/contact";
import { getInventoryVehicles } from "@/lib/inventory";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "VMAFFEI Motors | Veículos selecionados e consignação",
  description:
    "Estoque de veículos sincronizado automaticamente, atendimento por WhatsApp, financiamento e consignação com suporte da VMAFFEI Motors."
};

const quickActions = [
  {
    title: "Ver estoque",
    description: "Compare modelos, anos, quilometragem e valores disponíveis.",
    href: "/estoque",
    icon: CarFront
  },
  {
    title: "Simular financiamento",
    description: "Receba atendimento para entender entrada e parcelas.",
    href: getWhatsAppLink("Olá, quero simular financiamento de um veículo."),
    external: true,
    icon: Banknote
  },
  {
    title: "Consignar meu carro",
    description: "Venda com a estrutura da loja cuidando da negociação.",
    href: "/consignar",
    icon: Handshake
  },
  {
    title: "Falar com consultor",
    description: "Tire dúvidas e receba indicação conforme seu perfil.",
    href: getWhatsAppLink("Olá, quero ajuda para escolher um veículo."),
    external: true,
    icon: MessageCircle
  }
];

const trustItems = [
  {
    title: "Procedência conferida",
    description: "Anúncios com dados técnicos, fotos reais e atendimento direto.",
    icon: ShieldCheck
  },
  {
    title: "Negociação acompanhada",
    description: "A loja orienta do primeiro contato até a entrega do veículo.",
    icon: BadgeCheck
  },
  {
    title: "Documentação orientada",
    description: "Suporte para deixar compra, venda ou consignação mais simples.",
    icon: FileCheck2
  }
];

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

      <section className="border-b border-line bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const content = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white">
                    <Icon size={21} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-black text-ink">{action.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-graphite">
                      {action.description}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto shrink-0 text-graphite transition group-hover:text-ink"
                    size={18}
                  />
                </>
              );

              return action.external ? (
                <a
                  key={action.title}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {content}
                </Link>
              );
            })}
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

      <section className="border-y border-line bg-ink py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/70">
              <Sparkles size={15} />
              Compra com confiança
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Atendimento premium, conversa simples e negociação transparente.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              A VMAFFEI Motors atende quem já sabe o que quer e também quem precisa
              de ajuda para escolher, financiar, trocar ou consignar o veículo.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
                  <Icon size={24} className="text-white" />
                  <h3 className="mt-4 font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.description}</p>
                </div>
              );
            })}
          </div>
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
