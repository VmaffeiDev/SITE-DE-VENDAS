export default function EstoqueLoading() {
  return (
    <section className="bg-mist py-10 sm:py-14" role="status" aria-label="Carregando estoque">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 h-20 w-72 animate-pulse rounded bg-gray-200" />
        <div className="grid animate-pulse gap-6 lg:grid-cols-[300px_1fr]">
          <div className="h-[600px] rounded-lg bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
