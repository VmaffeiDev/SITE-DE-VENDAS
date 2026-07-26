import { NextResponse } from "next/server";

import { getInventoryVehicles } from "@/lib/inventory";

export const revalidate = 300;

export async function GET() {
  try {
    const vehicles = await getInventoryVehicles();
    return NextResponse.json(vehicles, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      }
    });
  } catch {
    return NextResponse.json({ error: "Erro ao carregar estoque." }, { status: 500 });
  }
}
