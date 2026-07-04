import type { MetadataRoute } from "next";

import { getInventoryVehicles } from "@/lib/inventory";

export const revalidate = 300;

const baseUrl = "https://consultordevendasvictormaffei.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getInventoryVehicles();

  const vehicleUrls: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: `${baseUrl}/veiculo/${vehicle.id}`,
    lastModified: vehicle.lastUpdate ? new Date(vehicle.lastUpdate) : new Date(),
    changeFrequency: "daily",
    priority: 0.8
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${baseUrl}/estoque`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/consignar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    },
    ...vehicleUrls
  ];
}
