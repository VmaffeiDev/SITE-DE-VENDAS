"use client";

type MarqueeStripProps = {
  reviews: string[];
};

export function MarqueeStrip({ reviews }: MarqueeStripProps) {
  // Duplicate so the loop is seamless
  const doubled = [...reviews, ...reviews];

  return (
    <section
      className="overflow-hidden border-y border-[rgba(255,255,255,0.05)] bg-[#080808] py-7"
      aria-label="Customer reviews"
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: "marquee-scroll 48s linear infinite" }}
      >
        {doubled.map((text, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-6 pr-6"
          >
            <span className="font-serif text-sm font-light italic text-[#6b6560]" style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}>
              {text}
            </span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#c9a96e] opacity-60" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
