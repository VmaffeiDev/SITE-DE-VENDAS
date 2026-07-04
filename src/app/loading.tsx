export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-[420px] bg-gray-200 sm:h-[520px]" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
