type BrandMarkProps = {
  className?: string;
  invert?: boolean;
};

export function BrandMark({ className = "", invert = false }: BrandMarkProps) {
  return (
    <span className={`flex min-w-0 items-center gap-2 sm:gap-3.5 ${className}`}>
      <span
        className={`brand-icon-motion relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border shadow-soft sm:h-12 sm:w-12 ${
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
        <span className="brand-s4-motion relative z-10 text-[15px] font-black italic tracking-[-0.04em] text-[#e11d24]">
          S4
        </span>
        <span className="brand-underline-motion absolute inset-x-2 bottom-2 h-[2px] bg-[#e11d24]" />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={`block whitespace-nowrap text-[14px] font-black tracking-[0.12em] sm:text-[17px] sm:tracking-[0.16em] ${
            invert ? "text-white" : "text-ink"
          }`}
        >
          SQU<span className="brand-four-motion text-[#e11d24]">4</span>TTRO
        </span>
        <span
          className={`block text-[9px] font-semibold uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.34em] ${
            invert ? "text-white/70" : "text-graphite"
          }`}
        >
          Motors
        </span>
        <span
          className={`mt-1 flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[8.5px] font-bold min-[380px]:text-[9.5px] sm:mt-1.5 sm:gap-2 sm:text-[11px] ${
            invert ? "text-white/60" : "text-graphite"
          }`}
        >
          <span className="brand-consultor-line h-px w-4 shrink-0 bg-[#e11d24] sm:w-6" />
          <span>Consultor de Vendas: Victor Maffei</span>
        </span>
      </span>
    </span>
  );
}
