export default function VehicleLoading() {
  return (
    <div className="animate-pulse">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-6 w-64 rounded bg-gray-200" />
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/3] w-full rounded-lg bg-gray-200" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded bg-gray-200" />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-10 w-3/4 rounded bg-gray-200" />
            <div className="h-8 w-1/2 rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 rounded bg-gray-200" />
              ))}
            </div>
            <div className="mt-4 h-12 w-full rounded bg-gray-200" />
            <div className="h-12 w-full rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
