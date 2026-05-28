export function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Consulte";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatMileage(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Km não informado";
  }

  return `${new Intl.NumberFormat("pt-BR").format(value)} km`;
}

export function formatYear(year: string | number | null | undefined) {
  if (!year) {
    return "Ano não informado";
  }

  return String(year);
}

export function formatLabel(value: string | null | undefined) {
  if (!value) {
    return "Não informado";
  }

  return value;
}

export function parseFlexibleNumber(value: FormDataEntryValue | string | null) {
  if (!value) {
    return null;
  }

  const normalized = String(value)
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function titleCase(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .replace(/(^|\s|-)([a-zà-ÿ0-9])/g, (match) => match.toLocaleUpperCase("pt-BR"));
}
