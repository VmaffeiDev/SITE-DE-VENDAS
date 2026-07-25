import { getLocalVehicleById, getLocalVehicles } from "@/lib/local-inventory";
import {
  getVehicleById as getRevendaVehicleById,
  getVehicles as getRevendaVehicles
} from "@/lib/revendamais";
import type { Vehicle } from "@/types/vehicle";

export async function getInventoryVehicles(): Promise<Vehicle[]> {
  const [revendaVehicles, localVehicles] = await Promise.all([
    getRevendaVehicles(),
    getLocalVehicles()
  ]);

  return [...localVehicles, ...revendaVehicles];
}

export async function getInventoryVehicleById(id: string) {
  const localVehicle = await getLocalVehicleById(id);
  if (localVehicle) {
    return localVehicle;
  }

  return getRevendaVehicleById(id);
}
