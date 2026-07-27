"use client";
import { motion } from "framer-motion";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  videoSrc?: string;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};

const line = {
  hidden: { opacity: 0, y: 72 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, delay: 0.1 } },
};

export function HeroSection({ title, subtitle, videoSrc }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden bg-[#080808]">
      {/* Background */}
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, #1c1714 0%, #0a0908 55%, #080808 100%)",
          }}
        />
      )}

      {/* Gradient vignette — darkens edges and bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.55) 35%, rgba(8,8,8,0.1) 65%, rgba(8,8,8,0.4) 100%)",
        }}
      />

      {/* Nav bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-7 sm:px-10 lg:px-16">
        <span
          className="text-xs font-semibold tracking-[0.35em] text-[#f0ede8] uppercase"
          style={{ fontFamily: "inherit" }}
        >
          Nocturne
        </span>
        <div className="hidden gap-8 sm:flex">
          {["Collection", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[11px] tracking-[0.22em] text-[#9e9890] uppercase transition-colors hover:text-[#f0ede8]"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="text-[11px] tracking-[0.22em] text-[#9e9890] uppercase transition-colors hover:text-[#f0ede8]"
        >
          Bag (0)
        </a>
      </nav>

      {/* Hero text — vertically centred in remaining space */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center">
        <motion.div
          className="overflow-hidden"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="mb-6 text-[10px] tracking-[0.45em] text-[#7a7570] uppercase"
            variants={fade}
          >
            Autumn / Winter 2025
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="font-serif text-[clamp(3.5rem,10vw,9rem)] font-light italic leading-[0.92] tracking-tight text-[#f0ede8]"
              variants={line}
              style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            className="mt-7 font-serif text-[clamp(1.1rem,2vw,1.6rem)] font-light italic text-[#7a7570]"
            style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
            variants={fade}
          >
            {subtitle}
          </motion.p>

          <motion.div className="mt-10 flex justify-center gap-4" variants={fade}>
            <a
              href="#collection"
              className="inline-flex h-12 items-center border border-[rgba(240,237,232,0.25)] px-8 text-[11px] tracking-[0.28em] text-[#f0ede8] uppercase transition hover:border-[#f0ede8] hover:bg-[rgba(240,237,232,0.05)]"
            >
              Shop Now
            </a>
            <a
              href="#look"
              className="inline-flex h-12 items-center px-8 text-[11px] tracking-[0.28em] text-[#7a7570] uppercase transition hover:text-[#f0ede8]"
            >
              Shop the Look
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-[#5a5552]" />
        <span className="text-[9px] tracking-[0.35em] text-[#5a5552] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
