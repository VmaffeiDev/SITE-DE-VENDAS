type BrandMarkProps = {
  className?: string;
  invert?: boolean;
};

export function BrandMark({ className = "", invert = false }: BrandMarkProps) {
  return (
    <span className={`flex min-w-0 items-center gap-3.5 ${className}`}>
      <span
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border shadow-soft ${
          invert
            ? "border-white/20 bg-white text-ink"
            : "border-black/10 bg-[linear-gradient(145deg,#050505_0%,#1b1b1b_55%,#050505_100%)] text-white"
        }`}
      >
        <span
          className={`absolute inset-x-2 top-2 h-px ${
            invert ? "bg-ink/15" : "bg-white/20"
          }`}
        />
        <span className="relative text-[15px] font-black italic tracking-[-0.04em] text-[#e11d24]">
          S4
        </span>
        <span className="absolute inset-x-2 bottom-2 h-[2px] bg-[#e11d24]" />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate text-[17px] font-black tracking-[0.16em] ${
            invert ? "text-white" : "text-ink"
          }`}
        >
          SQU<span className="text-[#e11d24]">4</span>TTRO
        </span>
        <span
          className={`block text-[11px] font-semibold uppercase tracking-[0.34em] ${
            invert ? "text-white/70" : "text-graphite"
          }`}
        >
          Motors
        </span>
        <span
          className={`mt-1.5 flex min-w-0 items-center gap-2 text-[11px] font-bold ${
            invert ? "text-white/60" : "text-graphite"
          }`}
        >
          <span className="h-px w-6 shrink-0 bg-[#e11d24]" />
          <span className="truncate">Consultor de Vendas: Victor Maffei</span>
        </span>
      </span>
    </span>
  );
}
