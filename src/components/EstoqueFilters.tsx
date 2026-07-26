"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";

type FilterValues = {
  q: string;
  brand: string;
  model: string;
  year: string;
  minPrice: string;
  maxPrice: string;
  maxKm: string;
  fuel: string;
  transmission: string;
  sort: string;
};

type EstoqueFiltersProps = {
  brands: string[];
  models: string[];
  years: string[];
  fuels: string[];
  transmissions: string[];
  defaultValues: FilterValues;
};

export function EstoqueFilters({
  brands,
  models,
  years,
  fuels,
  transmissions,
  defaultValues
}: EstoqueFiltersProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, startTransition] = useTransition();

  function submitForm() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (value) params.set(key, String(value));
    }
    startTransition(() => {
      router.push(`/estoque?${params.toString()}`);
    });
  }

  function handleSelectChange() {
    submitForm();
  }

  function handleTextChange() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(submitForm, 500);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <aside className="h-fit rounded-lg border border-line bg-white p-5 shadow-sm lg:sticky lg:top-28">
      <div className="mb-5 flex items-center gap-2 text-lg font-black text-ink">
        <SlidersHorizontal size={20} />
        Filtros
      </div>

      <form
        ref={formRef}
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <label className="grid gap-2 text-sm font-bold text-ink">
          Busca
          <input
            name="q"
            defaultValue={defaultValues.q}
            placeholder="Marca, modelo ou versão"
            className="h-11 px-3"
            onChange={handleTextChange}
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-ink">
          Marca
          <select
            name="brand"
            defaultValue={defaultValues.brand}
            className="h-11 px-3"
            onChange={handleSelectChange}
          >
            <option value="">Todas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-ink">
          Modelo
          <select
            name="model"
            defaultValue={defaultValues.model}
            className="h-11 px-3"
            onChange={handleSelectChange}
          >
            <option value="">Todos</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-ink">
          Ano
          <select
            name="year"
            defaultValue={defaultValues.year}
            className="h-11 px-3"
            onChange={handleSelectChange}
          >
            <option value="">Todos</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-2 text-sm font-bold text-ink">
            Preço mín.
            <input
              name="minPrice"
              type="number"
              defaultValue={defaultValues.minPrice}
              placeholder="0"
              className="h-11 px-3"
              onChange={handleTextChange}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Preço máx.
            <input
              name="maxPrice"
              type="number"
              defaultValue={defaultValues.maxPrice}
              placeholder="150000"
              className="h-11 px-3"
              onChange={handleTextChange}
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-ink">
          Km máximo
          <input
            name="maxKm"
            type="number"
            defaultValue={defaultValues.maxKm}
            placeholder="80000"
            className="h-11 px-3"
            onChange={handleTextChange}
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-ink">
          Combustível
          <select
            name="fuel"
            defaultValue={defaultValues.fuel}
            className="h-11 px-3"
            onChange={handleSelectChange}
          >
            <option value="">Todos</option>
            {fuels.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-ink">
          Câmbio
          <select
            name="transmission"
            defaultValue={defaultValues.transmission}
            className="h-11 px-3"
            onChange={handleSelectChange}
          >
            <option value="">Todos</option>
            {transmissions.map((transmission) => (
              <option key={transmission} value={transmission}>
                {transmission}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold text-ink">
          Ordenar
          <select
            name="sort"
            defaultValue={defaultValues.sort}
            className="h-11 px-3"
            onChange={handleSelectChange}
          >
            <option value="latest">Mais recentes</option>
            <option value="price_asc">Menor preço</option>
            <option value="price_desc">Maior preço</option>
            <option value="km_asc">Menor km</option>
            <option value="year_desc">Ano mais novo</option>
          </select>
        </label>

        <button
          type="submit"
          className="rounded bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-graphite"
        >
          Aplicar filtros
        </button>
        <a
          href="/estoque"
          className="inline-flex items-center justify-center rounded px-5 py-3 text-center text-sm font-bold text-graphite transition hover:bg-mist hover:text-ink"
        >
          Limpar filtros
        </a>
      </form>
    </aside>
  );
}
