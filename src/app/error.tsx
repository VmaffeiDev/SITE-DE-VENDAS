"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={32} />
        </span>
        <h1 className="mt-6 text-3xl font-black text-ink">
          Algo deu errado
        </h1>
        <p className="mt-3 leading-7 text-graphite">
          Não foi possível carregar esta página. Tente novamente ou volte ao
          estoque.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded bg-ink px-6 py-3 text-sm font-black text-white transition hover:bg-graphite"
          >
            Tentar novamente
          </button>
          <a
            href="/estoque"
            className="text-sm font-bold text-graphite transition hover:text-ink"
          >
            Ver estoque
          </a>
        </div>
      </div>
    </section>
  );
}
