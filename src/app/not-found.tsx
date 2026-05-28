import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-ink">Página não encontrada</h1>
        <p className="mt-4 text-graphite">
          O veículo ou endereço solicitado não está disponível.
        </p>
        <Link
          href="/estoque"
          className="mt-8 inline-flex rounded bg-ink px-5 py-3 text-sm font-black text-white"
        >
          Ver estoque
        </Link>
      </div>
    </section>
  );
}
