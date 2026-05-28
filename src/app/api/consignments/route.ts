import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

import { parseFlexibleNumber } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import type { ConsignmentImage } from "@/types/consignment";

export const runtime = "nodejs";

const uploadFields = [
  { name: "frontImages", label: "Foto frontal", slug: "frontal" },
  { name: "rearImages", label: "Traseira", slug: "traseira" },
  { name: "sideImages", label: "Lateral", slug: "lateral" },
  { name: "interiorImages", label: "Interior", slug: "interior" },
  { name: "dashboardImages", label: "Painel", slug: "painel" }
];

const maxImageSize = 8 * 1024 * 1024;

function stringField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function isUploadFile(value: FormDataEntryValue): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "name" in value &&
    "type" in value &&
    "size" in value
  );
}

function safeExtension(fileName: string, type: string) {
  const extension = path.extname(fileName).toLowerCase();
  if (extension) {
    return extension;
  }

  if (type === "image/png") {
    return ".png";
  }

  if (type === "image/webp") {
    return ".webp";
  }

  return ".jpg";
}

async function saveImages(leadId: string, formData: FormData) {
  const images: ConsignmentImage[] = [];
  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "consignments",
    leadId
  );

  await mkdir(uploadDir, { recursive: true });

  for (const field of uploadFields) {
    const files = formData.getAll(field.name).filter(isUploadFile);

    for (const [index, file] of files.entries()) {
      if (!file.size || !file.type.startsWith("image/") || file.size > maxImageSize) {
        continue;
      }

      const extension = safeExtension(file.name, file.type);
      const fileName = `${field.slug}-${index + 1}-${randomUUID()}${extension}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());

      await writeFile(filePath, buffer);
      images.push({
        src: `/uploads/consignments/${leadId}/${fileName}`,
        label: field.label,
        fileName
      });
    }
  }

  return images;
}

function redirectTo(request: Request, params: Record<string, string>) {
  const url = new URL("/consignar", request.url);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const requiredFields = ["name", "phone", "email", "city", "brand", "model"];
    const missingRequiredField = requiredFields.some((field) => !stringField(formData, field));

    if (missingRequiredField) {
      return redirectTo(request, { erro: "campos" });
    }

    const id = randomUUID();
    const images = await saveImages(id, formData);
    const year = parseFlexibleNumber(formData.get("year"));
    const mileage = parseFlexibleNumber(formData.get("mileage"));
    const askingPrice = parseFlexibleNumber(formData.get("askingPrice"));

    await prisma.consignmentLead.create({
      data: {
        id,
        name: stringField(formData, "name"),
        phone: stringField(formData, "phone"),
        email: stringField(formData, "email"),
        city: stringField(formData, "city"),
        brand: stringField(formData, "brand"),
        model: stringField(formData, "model"),
        version: stringField(formData, "version") || null,
        year: year ? Math.trunc(year) : null,
        mileage: mileage ? Math.trunc(mileage) : null,
        plate: stringField(formData, "plate") || null,
        color: stringField(formData, "color") || null,
        askingPrice,
        notes: stringField(formData, "notes") || null,
        images: JSON.stringify(images),
        status: "pendente_avaliacao"
      }
    });

    return redirectTo(request, { enviado: "1" });
  } catch (error) {
    console.error("Erro ao salvar lead de consignacao:", error);
    return redirectTo(request, { erro: "envio" });
  }
}
