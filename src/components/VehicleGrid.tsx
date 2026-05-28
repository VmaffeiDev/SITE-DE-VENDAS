import { VehicleCard } from "@/components/VehicleCard";
import type { Vehicle } from "@/types/vehicle";

type VehicleGridProps = {
  vehicles: Vehicle[];
};

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={`${vehicle.source}-${vehicle.id}`} vehicle={vehicle} />
      ))}
    </div>
  );
}
