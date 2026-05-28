import { XMLParser } from "fast-xml-parser";

import { titleCase } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

export const REVENDAMAIS_XML_URL =
  "http://app.revendamais.com.br/application/index.php/apiGeneratorXml/generator/sitedaloja/4e24bb8b9bfec5a702ee95ca0d7b84987561.xml";

const REQUEST_TIMEOUT_MS = 15000;

type XmlRecord = Record<string, unknown>;

const parser = new XMLParser({
  ignoreAttributes: false,
  trimValues: true,
  isArray: (name) => ["AD", "IMAGE_URL", "IMAGE_URL_LARGE"].includes(name)
});

async function fetchXml() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(REVENDAMAIS_XML_URL, {
      signal: controller.signal,
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`Revenda Mais respondeu com status ${response.status}`);
    }

    const xml = await response.text();

    if (!xml.trim()) {
      throw new Error("XML do Revenda Mais vazio");
    }

    return xml;
  } finally {
    clearTimeout(timeout);
  }
}

function asRecord(value: unknown): XmlRecord | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as XmlRecord;
  }

  return null;
}

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return value === null || value === undefined ? [] : [value];
}

function text(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function numberFrom(value: unknown) {
  const raw = text(value).replace(/\./g, "").replace(",", ".");
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function splitAccessories(value: unknown) {
  return text(value)
    .split(",")
    .map((feature) => titleCase(feature.trim()))
    .filter(Boolean);
}

function imageList(ad: XmlRecord) {
  const largeImages = asRecord(ad.IMAGES_LARGE)?.IMAGE_URL_LARGE;
  const regularImages = asRecord(ad.IMAGES)?.IMAGE_URL;

  return [...asArray(largeImages), ...asArray(regularImages)]
    .map(text)
    .filter(Boolean)
    .filter((image, index, images) => images.indexOf(image) === index);
}

function normalizedTitle(ad: XmlRecord) {
  const title = text(ad.TITLE);
  if (title) {
    return titleCase(title);
  }

  return [ad.MAKE, ad.MODEL, ad.VERSION, ad.YEAR]
    .map(text)
    .filter(Boolean)
    .map(titleCase)
    .join(" ");
}

function normalizeAd(ad: XmlRecord): Vehicle | null {
  const id = text(ad.ID);

  if (!id) {
    return null;
  }

  const price = numberFrom(ad.PROMOTION_PRICE);
  const regularPrice = numberFrom(ad.PRICE);
  const modelYear = numberFrom(ad.YEAR);
  const fabricationYear = numberFrom(ad.FABRIC_YEAR);
  const model = text(ad.BASE_MODEL) || text(ad.MODEL);

  return {
    id,
    title: normalizedTitle(ad),
    brand: titleCase(text(ad.MAKE)),
    model: titleCase(model),
    version: titleCase(text(ad.MODEL)),
    year:
      fabricationYear && modelYear
        ? `${fabricationYear}/${modelYear}`
        : text(ad.YEAR) || text(ad.FABRIC_YEAR),
    fabricationYear,
    modelYear,
    mileage: numberFrom(ad.MILEAGE),
    price: price && price > 0 ? price : regularPrice,
    fuel: titleCase(text(ad.FUEL)),
    transmission: titleCase(text(ad.GEAR)),
    color: titleCase(text(ad.COLOR)),
    description: text(ad.DESCRIPTION),
    images: imageList(ad),
    features: splitAccessories(ad.ACCESSORIES),
    featured: text(ad.DESTAQUE) === "1",
    lastUpdate: text(ad.LAST_UPDATE) || text(ad.DATE),
    source: "revendamais"
  };
}

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const xml = await fetchXml();
    const parsed = parser.parse(xml);
    const ads = asRecord(parsed)?.ADS;
    const adList = asArray(asRecord(ads)?.AD);

    if (!adList.length) {
      return [];
    }

    return adList
      .map(asRecord)
      .filter((ad): ad is XmlRecord => Boolean(ad))
      .map(normalizeAd)
      .filter((vehicle): vehicle is Vehicle => Boolean(vehicle));
  } catch (error) {
    console.error("Erro ao carregar XML Revenda Mais:", error);
    return [];
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const vehicles = await getVehicles();
  return vehicles.find((vehicle) => vehicle.id === id) ?? null;
}
