import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Fuel,
  Gauge,
  MessageCircle,
  Palette,
  Settings,
  Tag
} from "lucide-react";

import { formatCurrency, formatLabel, formatMileage, formatYear } from "@/lib/format";
import { getInventoryVehicleById } from "@/lib/inventory";
import { getWhatsAppLink } from "@/lib/contact";

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

  return {
    title: `${vehicle.title} à venda | VMAFFEI Motors`,
    description:
      vehicle.description ||
      `${vehicle.title} com fotos, ficha técnica e atendimento direto pela VMAFFEI Motors.`,
    openGraph: {
      title: `${vehicle.title} à venda | VMAFFEI Motors`,
      description:
        vehicle.description ||
        `${formatYear(vehicle.year)} · ${formatMileage(vehicle.mileage)} · ${formatCurrency(vehicle.price)}`,
      images: vehicle.images[0] ? [vehicle.images[0]] : []
    }
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getInventoryVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const mainImage = vehicle.images[0];
  const interestMessage = `Olá, tenho interesse no veículo ${vehicle.title} (${vehicle.id}).`;

  const specs = [
    { label: "Ano", value: formatYear(vehicle.year), icon: CalendarDays },
    { label: "Quilometragem", value: formatMileage(vehicle.mileage), icon: Gauge },
    { label: "Preço", value: formatCurrency(vehicle.price), icon: Tag },
    { label: "Combustível", value: formatLabel(vehicle.fuel), icon: Fuel },
    { label: "Câmbio", value: formatLabel(vehicle.transmission), icon: Settings },
    { label: "Cor", value: formatLabel(vehicle.color), icon: Palette }
  ];

  return (
    <section className="bg-mist py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded border border-line bg-white shadow-sm">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={vehicle.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-graphite">
                  Foto indisponível
                </div>
              )}
            </div>

            {vehicle.images.length > 1 ? (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {vehicle.images.slice(1, 11).map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-white"
                  >
                    <Image
                      src={image}
                      alt={`${vehicle.title} foto ${index + 2}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded border border-line bg-white p-5 shadow-sm lg:p-7">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">
              Veículo à venda
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              {vehicle.title}
            </h1>
            <p className="mt-3 text-3xl font-black text-ink">
              {formatCurrency(vehicle.price)}
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
                href={getWhatsAppLink(
                  `Olá, quero agendar um test drive do veículo ${vehicle.title}.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-ink px-5 py-3 text-sm font-black text-ink transition hover:bg-mist"
              >
                Agendar test drive
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
      </div>
    </section>
  );
}
