"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  CONSIGNMENT_STATUSES,
  type ConsignmentStatus
} from "@/types/consignment";

function idFrom(formData: FormData) {
  return String(formData.get("id") ?? "").trim();
}

function isConsignmentStatus(status: string): status is ConsignmentStatus {
  return CONSIGNMENT_STATUSES.includes(status as ConsignmentStatus);
}

async function setStatus(id: string, status: ConsignmentStatus) {
  if (!id) {
    return;
  }

  await prisma.consignmentLead.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/admin/consignados");
  revalidatePath("/estoque");
}

export async function approveConsignment(formData: FormData) {
  await setStatus(idFrom(formData), "aprovado");
}

export async function refuseConsignment(formData: FormData) {
  await setStatus(idFrom(formData), "recusado");
}

export async function markConsignmentSold(formData: FormData) {
  await setStatus(idFrom(formData), "vendido");
}

export async function updateConsignmentStatus(formData: FormData) {
  const id = idFrom(formData);
  const status = String(formData.get("status") ?? "");

  if (!id || !isConsignmentStatus(status)) {
    return;
  }

  await setStatus(id, status);
}

export async function convertConsignmentToVehicle(formData: FormData) {
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
