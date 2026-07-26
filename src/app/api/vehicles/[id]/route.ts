import { NextResponse } from "next/server";

import { getInventoryVehicleById } from "@/lib/inventory";

export const revalidate = 300;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const vehicle = await getInventoryVehicleById(id);
    if (!vehicle) {
      return NextResponse.json({ error: "Veículo não encontrado." }, { status: 404 });
    }
    return NextResponse.json(vehicle, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      }
    });
  } catch {
    return NextResponse.json({ error: "Erro ao carregar veículo." }, { status: 500 });
  }
}
