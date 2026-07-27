import { AnimateIn } from "@/components/AnimateIn";
import { VehicleCard } from "@/components/VehicleCard";
import type { Vehicle } from "@/types/vehicle";

type VehicleGridProps = {
  vehicles: Vehicle[];
};

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle, index) => (
        <AnimateIn key={`${vehicle.source}-${vehicle.id}`} delay={Math.min(index, 5) * 60}>
          <VehicleCard vehicle={vehicle} />
        </AnimateIn>
      ))}
    </div>
  );
}
