"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  CONSIGNMENT_STATUSES,
  type ConsignmentStatus
} from "@/types/consignment";

type ActionResult = { success: boolean; error?: string };

function idFrom(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  return /^[a-z0-9_-]{10,40}$/i.test(id) ? id : "";
}

function isConsignmentStatus(status: string): status is ConsignmentStatus {
  return CONSIGNMENT_STATUSES.includes(status as ConsignmentStatus);
}

async function setStatus(id: string, status: ConsignmentStatus): Promise<ActionResult> {
  if (!id) {
    return { success: false, error: "id_invalido" };
  }

  await prisma.consignmentLead.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/admin/consignados");
  revalidatePath("/estoque");
  return { success: true };
}

export async function approveConsignment(formData: FormData): Promise<void> {
  await setStatus(idFrom(formData), "aprovado");
}

export async function refuseConsignment(formData: FormData): Promise<void> {
  await setStatus(idFrom(formData), "recusado");
}

export async function markConsignmentSold(formData: FormData): Promise<void> {
  await setStatus(idFrom(formData), "vendido");
}

export async function updateConsignmentStatus(formData: FormData): Promise<void> {
  const id = idFrom(formData);
  const status = String(formData.get("status") ?? "");

  if (!id || !isConsignmentStatus(status)) {
    return;
  }

  await setStatus(id, status);
}

export async function convertConsignmentToVehicle(formData: FormData): Promise<void> {
  const id = idFrom(formData);

  if (!id) {
    return;
  }

  const lead = await prisma.consignmentLead.findUnique({
    where: { id }
  });

  if (!lead) {
    return;
  }

  const vehicleId = `consignado-${lead.id}`;
  const title = [lead.brand, lead.model, lead.version, lead.year]
    .filter(Boolean)
    .join(" ");

  await prisma.vehicle.upsert({
    where: { id: vehicleId },
    create: {
      id: vehicleId,
      consignmentLeadId: lead.id,
      title,
      brand: lead.brand,
      model: lead.model,
      version: lead.version,
      year: lead.year,
      mileage: lead.mileage,
      price: lead.askingPrice,
      color: lead.color,
      description: lead.notes,
      images: lead.images,
      features: JSON.stringify(["Consignação VMAFFEI Motors"]),
      source: "consignment"
    },
    update: {
      title,
      brand: lead.brand,
      model: lead.model,
      version: lead.version,
      year: lead.year,
      mileage: lead.mileage,
      price: lead.askingPrice,
      color: lead.color,
      description: lead.notes,
      images: lead.images,
      features: JSON.stringify(["Consignação VMAFFEI Motors"])
    }
  });

  await prisma.consignmentLead.update({
    where: { id },
    data: { status: "anunciado" }
  });

  revalidatePath("/admin/consignados");
  revalidatePath("/estoque");
  revalidatePath(`/veiculo/${vehicleId}`);
}
