import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Banknote,
  CalendarDays,
  Camera,
  CheckCircle2,
  FileCheck2,
  Fuel,
  Gauge,
  MessageCircle,
  Palette,
  Settings,
  Tag
} from "lucide-react";

import Link from "next/link";

import { formatCurrency, formatLabel, formatMileage, formatYear } from "@/lib/format";
import { getInventoryVehicleById, getInventoryVehicles } from "@/lib/inventory";
import { getWhatsAppLink } from "@/lib/contact";
import { VehicleGallery } from "@/components/VehicleGallery";
import { VehicleGrid } from "@/components/VehicleGrid";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getInventoryVehicleById(id);

  if (!vehicle) {
    return {
      title: "Veículo não encontrado | VMAFFEI Motors"
    };
  }

  const ogImage = vehicle.images[0]
    ? vehicle.images[0].startsWith("/")
      ? { url: vehicle.images[0], width: 1200, height: 900 }
      : vehicle.images[0]
    : undefined;

  return {
    title: `${vehicle.title} à venda | VMAFFEI Motors`,
    description:
      vehicle.description ||
      `${vehicle.title} com fotos, ficha técnica e atendimento direto pela VMAFFEI Motors.`,
    alternates: {
      canonical: `/veiculo/${id}`
    },
    openGraph: {
      title: `${vehicle.title} à venda | VMAFFEI Motors`,
      description:
        vehicle.description ||
        `${formatYear(vehicle.year)} · ${formatMileage(vehicle.mileage)} · ${formatCurrency(vehicle.price)}`,
      images: ogImage ? [ogImage] : []
    }
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { id } = await params;
  const [vehicle, allVehicles] = await Promise.all([
    getInventoryVehicleById(id),
    getInventoryVehicles()
  ]);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = allVehicles
    .filter((v) => v.id !== vehicle.id && v.brand === vehicle.brand)
    .slice(0, 4);

  const interestMessage = `Olá, tenho interesse no veículo ${vehicle.title} (${vehicle.id}).`;
  const testDriveMessage = `Olá, quero agendar um test drive do veículo ${vehicle.title}.`;
  const financeMessage = `Olá, quero simular financiamento do veículo ${vehicle.title}.`;

  const specs = [
    { label: "Ano", value: formatYear(vehicle.year), icon: CalendarDays },
    { label: "Quilometragem", value: formatMileage(vehicle.mileage), icon: Gauge },
    { label: "Preço", value: formatCurrency(vehicle.price), icon: Tag },
    { label: "Combustível", value: formatLabel(vehicle.fuel), icon: Fuel },
    { label: "Câmbio", value: formatLabel(vehicle.transmission), icon: Settings },
    { label: "Cor", value: formatLabel(vehicle.color), icon: Palette }
  ];

  const trustItems = [
    {
      label: "Fotos reais",
      value: vehicle.images.length ? `${vehicle.images.length} foto${vehicle.images.length !== 1 ? "s" : ""}` : "Fotos não disponíveis",
      icon: Camera
    },
    { label: "Atendimento direto", value: "WhatsApp da loja", icon: MessageCircle },
    { label: "Compra orientada", value: "Documentação e entrega", icon: FileCheck2 }
  ];

  const baseUrl = "https://consultordevendasvictormaffei.com";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Estoque", item: `${baseUrl}/estoque` },
      { "@type": "ListItem", position: 3, name: vehicle.title, item: `${baseUrl}/veiculo/${vehicle.id}` }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: vehicle.title,
    brand: vehicle.brand,
    model: vehicle.model,
    vehicleModelDate: vehicle.modelYear ?? undefined,
    mileageFromOdometer: vehicle.mileage
      ? {
          "@type": "QuantitativeValue",
          value: vehicle.mileage,
          unitCode: "KMT"
        }
      : undefined,
    color: vehicle.color || undefined,
    fuelType: vehicle.fuel || undefined,
    image: vehicle.images,
    description:
      vehicle.description ||
      `${vehicle.title} disponível na VMAFFEI Motors.`,
    offers: vehicle.price
      ? {
          "@type": "Offer",
          price: vehicle.price,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock"
        }
      : undefined
  };

  return (
    <section className="bg-mist pb-20 pt-8 sm:pb-12 sm:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Caminho" className="mb-5 flex items-center gap-2 text-sm text-graphite">
          <Link href="/" className="hover:text-ink">Início</Link>
          <span aria-hidden>/</span>
          <Link href="/estoque" className="hover:text-ink">Estoque</Link>
          <span aria-hidden>/</span>
          <span className="line-clamp-1 text-ink font-semibold">{vehicle.title}</span>
        </nav>
        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <VehicleGallery images={vehicle.images} title={vehicle.title} />

          <aside className="h-fit rounded-lg border border-line bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:p-7">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">
              Veículo à venda
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              {vehicle.title}
            </h1>
            <p className="mt-3 text-3xl font-black text-ink">
              {formatCurrency(vehicle.price)}
            </p>
            <p className="mt-2 text-sm font-semibold text-graphite">
              Código do anúncio: {vehicle.id}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {specs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="rounded bg-mist p-4">
                    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-graphite">
                      <Icon size={16} />
                      {spec.label}
                    </p>
                    <p className="mt-2 text-base font-black text-ink">{spec.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 grid gap-3">
              <a
                href={getWhatsAppLink(interestMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-graphite"
              >
                Tenho interesse
              </a>
              <a
                href={getWhatsAppLink(testDriveMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-ink px-5 py-3 text-sm font-black text-ink transition hover:bg-mist"
              >
                Agendar test drive
              </a>
              <a
                href={getWhatsAppLink(financeMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-line bg-mist px-5 py-3 text-sm font-black text-ink transition hover:bg-white"
              >
                <Banknote size={18} />
                Simular financiamento
              </a>
              <a
                href={getWhatsAppLink(interestMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded bg-whatsapp px-5 py-3 text-sm font-black text-white transition hover:brightness-95"
              >
                <MessageCircle size={18} />
                Falar no WhatsApp
              </a>
            </div>

            <div className="mt-7 grid gap-3 border-t border-line pt-5">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded bg-mist text-ink">
                      <Icon size={17} />
                    </span>
                    <span>
                      <span className="block font-black text-ink">{item.label}</span>
                      <span className="text-graphite">{item.value}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-ink">Descrição</h2>
            <p className="mt-4 whitespace-pre-line leading-7 text-graphite">
              {vehicle.description ||
                "Veículo disponível na VMAFFEI Motors. Fale com a loja para confirmar disponibilidade, condições e detalhes adicionais."}
            </p>
          </section>

          <section className="rounded border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-ink">Opcionais</h2>
            {vehicle.features.length ? (
              <ul className="mt-4 grid gap-3 text-sm text-graphite">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 text-ink" size={17} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-6 text-graphite">
                Opcionais não informados no anúncio.
              </p>
            )}
          </section>
        </div>

        <section className="mt-8 rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-graphite">
                <BadgeCheck size={16} />
                Próximo passo
              </p>
              <h2 className="mt-2 text-2xl font-black text-ink">
                Gostou desse veículo?
              </h2>
              <p className="mt-2 max-w-2xl leading-7 text-graphite">
                Fale com a equipe para confirmar disponibilidade, condições de
                negociação, troca e financiamento.
              </p>
            </div>
            <a
              href={getWhatsAppLink(interestMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-whatsapp px-6 py-4 text-sm font-black text-white transition hover:brightness-95"
            >
              <MessageCircle size={18} />
              Chamar no WhatsApp
            </a>
          </div>
        </section>
      </div>

      {relatedVehicles.length > 0 ? (
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-2xl font-black text-ink">
            Mais veículos {vehicle.brand}
          </h2>
          <VehicleGrid vehicles={relatedVehicles} />
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 shadow-premium backdrop-blur sm:hidden">
        <a
          href={getWhatsAppLink(interestMessage)}
          target="_blank"
          rel="noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded bg-whatsapp text-sm font-black text-white"
        >
          <MessageCircle size={18} />
          Tenho interesse
        </a>
      </div>
    </section>
  );
}
