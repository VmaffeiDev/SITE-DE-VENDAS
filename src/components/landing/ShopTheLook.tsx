"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LookItem } from "@/data/collection";

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.12 },
  }),
};

type ShopTheLookProps = {
  image: string;
  items: LookItem[];
};

export function ShopTheLook({ image, items }: ShopTheLookProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="look"
      ref={ref}
      className="relative overflow-hidden border-y border-[rgba(255,255,255,0.05)] bg-[#0a0908] px-6 py-24 sm:px-10 lg:px-16 lg:py-0"
    >
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 lg:grid-cols-[1.1fr_1fr]">
        {/* Left — parallax image */}
        <div className="relative hidden aspect-[4/5] overflow-hidden lg:block lg:aspect-auto lg:min-h-[680px]">
          <motion.img
            src={image}
            alt="Shop the look"
            className="absolute inset-0 h-[116%] w-full object-cover"
            style={{ y: imageY, top: "-8%" }}
          />
          {/* subtle right-edge fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24"
            style={{
              background: "linear-gradient(to right, transparent, #0a0908)",
            }}
          />
        </div>

        {/* Right — text + product list */}
        <motion.div
          className="flex flex-col justify-center py-20 lg:pl-16 lg:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="text-[10px] tracking-[0.45em] text-[#5a5552] uppercase"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
          >
            Editorial
          </motion.p>
          <motion.h2
            className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light italic leading-tight text-[#f0ede8]"
            style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
          >
            Shop the Look
          </motion.h2>
          <motion.p
            className="mt-4 max-w-xs text-sm leading-7 text-[#5a5552]"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.9, delay: 0.15 } } }}
          >
            Every piece chosen for how it moves together — and how it moves alone.
          </motion.p>

          <div className="mt-10 space-y-px">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={itemVariants}
                className="group flex items-center gap-5 border-t border-[rgba(255,255,255,0.05)] py-5 transition-colors last:border-b hover:bg-[rgba(255,255,255,0.02)]"
              >
                <div className="h-16 w-12 shrink-0 overflow-hidden bg-[#141414]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="font-serif text-sm font-light text-[#f0ede8]"
                    style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
                  >
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#5a5552]">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] tracking-[0.25em] text-[#3a3835] uppercase transition group-hover:text-[#c9a96e]">
                  Add →
                </span>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#"
            className="mt-10 inline-flex w-fit items-center gap-3 border-b border-[rgba(201,169,110,0.4)] pb-0.5 text-[11px] tracking-[0.3em] text-[#c9a96e] uppercase transition hover:border-[#c9a96e]"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.45, duration: 0.8 } } }}
          >
            View full look
            <span aria-hidden>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
