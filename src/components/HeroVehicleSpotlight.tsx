"use client";

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { formatCurrency, formatMileage, formatYear } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

type HeroVehicleSpotlightProps = {
  vehicles: Vehicle[];
};

const rotationDelay = 6000;

export function HeroVehicleSpotlight({ vehicles }: HeroVehicleSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (vehicles.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % vehicles.length);
    }, rotationDelay);

    return () => window.clearInterval(timer);
  }, [vehicles.length]);

  if (!vehicles.length) {
    return null;
  }

  const activeVehicle = vehicles[activeIndex] ?? vehicles[0];
  const image = activeVehicle.images[0];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? vehicles.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % vehicles.length);
  };

  return (
    <aside
      className="group overflow-hidden rounded-xl border border-white/70 bg-white text-white shadow-premium"
      aria-label="Veículo em destaque"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        {image ? (
          <Image
            key={image}
            src={image}
            alt={activeVehicle.title}
            fill
            priority
            unoptimized
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-mist text-ink">
            <Sparkles size={44} />
          </div>
        )}

        {vehicles.length > 1 ? (
          <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Veículo anterior"
              className="flex h-10 w-10 items-center justify-center rounded bg-white/92 text-ink shadow-soft transition hover:bg-white"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Próximo veículo"
              className="flex h-10 w-10 items-center justify-center rounded bg-white/92 text-ink shadow-soft transition hover:bg-white"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 bg-white p-5 text-ink sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded bg-mist px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-graphite">
            <Sparkles size={15} />
            Destaque
          </p>
          <h2 className="mt-4 max-w-4xl text-2xl font-black leading-tight tracking-tight sm:text-4xl">
            {activeVehicle.title}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-graphite">
            <span className="inline-flex items-center gap-2 rounded border border-line bg-white px-3 py-2">
              <CalendarDays size={16} />
              {formatYear(activeVehicle.year)}
            </span>
            <span className="inline-flex items-center gap-2 rounded border border-line bg-white px-3 py-2">
              <Gauge size={16} />
              {formatMileage(activeVehicle.mileage)}
            </span>
            {activeVehicle.fuel ? (
              <span className="inline-flex items-center gap-2 rounded border border-line bg-white px-3 py-2">
                <Fuel size={16} />
                {activeVehicle.fuel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[auto_auto] sm:items-end lg:grid-cols-1 lg:justify-items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-graphite">
              Valor anunciado
            </p>
            <p className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              {formatCurrency(activeVehicle.price)}
            </p>
          </div>
          <Link
            href={`/veiculo/${activeVehicle.id}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-ink px-6 text-sm font-black text-white transition hover:bg-graphite"
          >
            Ver detalhes
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {vehicles.length > 1 ? (
        <div className="flex items-center gap-2 border-t border-line bg-white px-5 pb-5 sm:px-7">
          {vehicles.map((vehicle, index) => (
            <button
              key={`${vehicle.source}-${vehicle.id}`}
              type="button"
              aria-label={`Mostrar destaque ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 flex-1 rounded-full transition ${
                index === activeIndex ? "bg-ink" : "bg-line hover:bg-graphite/30"
              }`}
            />
          ))}
        </div>
      ) : null}
    </aside>
  );
}
