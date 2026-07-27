import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">🔍 Erro 404</p>
        <h1 className="mt-3 text-4xl font-black text-ink">😕 Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-graphite">
          O veículo ou endereço solicitado não está disponível. Confira o estoque atualizado da loja.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/estoque"
            className="inline-flex h-12 items-center justify-center rounded bg-ink px-6 text-sm font-black text-white transition hover:bg-graphite"
          >
            Ver estoque
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded border border-line bg-white px-6 text-sm font-black text-ink transition hover:bg-mist"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
