import { ArrowRight, CalendarDays, Gauge, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency, formatMileage, formatYear } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const image = vehicle.images[0];

  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
      <Link href={`/veiculo/${vehicle.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          {image ? (
            <Image
              src={image}
              alt={vehicle.title}
              fill
              quality={92}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-graphite">
              <Sparkles size={34} />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent opacity-80" />
          <span className="absolute left-3 top-3 rounded bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-ink shadow-soft">
            Disponível
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="line-clamp-2 min-h-[3.25rem] text-lg font-black leading-snug text-ink">
              {vehicle.title}
            </h3>
            <p className="mt-1 text-sm text-graphite">
              {vehicle.brand} {vehicle.model}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-graphite">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={17} />
              {formatYear(vehicle.year)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Gauge size={17} />
              {formatMileage(vehicle.mileage)}
            </span>
          </div>

          <div className="flex items-end justify-between gap-3 border-t border-line pt-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-graphite">
                Preço
              </p>
              <p className="mt-1 text-2xl font-black text-ink">
                {formatCurrency(vehicle.price)}
              </p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-mist text-ink transition group-hover:bg-ink group-hover:text-white">
              <ArrowRight size={18} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
