"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const colVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.15 },
  }),
};

const NAV_LINKS = [
  { label: "Collections", href: "#" },
  { label: "About", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Stockists", href: "#" },
  { label: "Press", href: "#" },
  { label: "Contact", href: "#" },
];

export function LandingFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <footer className="relative overflow-hidden bg-[#080808]">
      {/* Grain overlay (footer-scoped, relative position) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="footer-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#footer-grain)" opacity="0.055" />
        </svg>
      </div>

      {/* Horizontal top rule */}
      <div className="relative z-10 border-t border-[rgba(255,255,255,0.06)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Top — brand statement + newsletter */}
        <motion.div
          className="grid gap-16 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Brand side */}
          <motion.div custom={0} variants={colVariants}>
            <p className="text-[10px] tracking-[0.45em] text-[#3a3835] uppercase">
              Nocturne Studio
            </p>
            <h2
              className="mt-5 font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-light italic leading-[1.05] text-[#f0ede8]"
              style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
            >
              Dressed for the{" "}quiet hours.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#4a4845]">
              Elevated essentials made to last. Every garment tells you to slow down,
              to be present, to occupy the room with quiet authority.
            </p>
          </motion.div>

          {/* Newsletter side */}
          <motion.div className="flex flex-col justify-center" custom={1} variants={colVariants}>
            <p
              className="font-serif text-xl font-light italic text-[#f0ede8]"
              style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
            >
              The Early Access List
            </p>
            <p className="mt-2 text-sm text-[#4a4845]">
              New collections, private sales, and editorial stories — before anyone else.
            </p>
            {sent ? (
              <p className="mt-6 text-sm italic text-[#c9a96e]">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="h-12 flex-1 border border-[rgba(255,255,255,0.08)] bg-transparent px-4 text-sm text-[#f0ede8] placeholder-[#3a3835] outline-none transition focus:border-[rgba(255,255,255,0.2)]"
                />
                <button
                  type="submit"
                  className="h-12 border border-l-0 border-[rgba(255,255,255,0.08)] px-6 text-[10px] tracking-[0.3em] text-[#9e9890] uppercase transition hover:border-[rgba(255,255,255,0.2)] hover:text-[#f0ede8]"
                >
                  Join
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Mid — nav links */}
        <motion.div
          className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[rgba(255,255,255,0.05)] py-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.25em] text-[#3a3835] uppercase transition hover:text-[#9e9890]"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-[rgba(255,255,255,0.05)] py-7 text-[10px] tracking-[0.2em] text-[#2e2c2a] sm:flex-row sm:items-center">
          <span className="uppercase">© 2025 Nocturne Studio. All rights reserved.</span>
          <div className="flex gap-6 uppercase">
            <a href="#" className="transition hover:text-[#5a5552]">Privacy</a>
            <a href="#" className="transition hover:text-[#5a5552]">Terms</a>
            <a href="#" className="transition hover:text-[#5a5552]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
