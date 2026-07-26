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
  const [tick, setTick] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (vehicles.length <= 1 || isHovered) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % vehicles.length);
    }, rotationDelay);

    return () => window.clearInterval(timer);
  }, [vehicles.length, tick, isHovered]);

  if (!vehicles.length) {
    return null;
  }

  const activeVehicle = vehicles[activeIndex] ?? vehicles[0];
  const image = activeVehicle.images[0];

  const goToPrevious = () => {
    setTick((t) => t + 1);
    setActiveIndex((current) =>
      current === 0 ? vehicles.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setTick((t) => t + 1);
    setActiveIndex((current) => (current + 1) % vehicles.length);
  };

  return (
    <section
      className="group mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/70 bg-white text-white shadow-premium"
      aria-label="Veículo em destaque"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-stretch">
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          {image ? (
            <Image
              key={image}
              src={image}
              alt={activeVehicle.title}
              fill
              priority
              unoptimized={image.startsWith("/uploads/")}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-mist text-ink">
              <Sparkles size={44} />
            </div>
          )}

          {vehicles.length > 1 ? (
            <div className="absolute right-4 top-4 flex gap-2">
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

        <div className="flex flex-col justify-between gap-6 border-t border-line bg-white p-5 text-ink sm:p-7 lg:border-l lg:border-t-0">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded bg-mist px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-graphite">
              <Sparkles size={15} />
              Destaque
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
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

          <div className="grid gap-4">
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
      </div>

      {vehicles.length > 1 ? (
        <div className="flex items-center gap-2 border-t border-line bg-white px-5 py-3 sm:px-7" role="group" aria-label="Navegação de destaques">
          {vehicles.map((vehicle, index) => (
            <button
              key={`${vehicle.source}-${vehicle.id}`}
              type="button"
              aria-label={`Destaque ${index + 1}: ${vehicle.title}`}
              aria-pressed={index === activeIndex}
              onClick={() => { setTick((t) => t + 1); setActiveIndex(index); }}
              className="group flex-1 py-2"
            >
              <span className={`block h-1.5 rounded-full transition ${
                index === activeIndex ? "bg-ink" : "bg-line group-hover:bg-graphite/30"
              }`} />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
