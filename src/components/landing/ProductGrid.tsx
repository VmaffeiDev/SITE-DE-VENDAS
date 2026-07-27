"use client";
import { motion } from "framer-motion";
import type { Product } from "@/data/collection";

// ── Section-level entrance ──────────────────────────────────────────────────
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

// ── Product card ────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      className="group relative cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Image block */}
      <motion.div
        className="relative aspect-[3/4] overflow-hidden bg-[#111]"
        variants={{
          rest: { y: 0, boxShadow: "0 0px 0px 0 rgba(0,0,0,0)" },
          hover: {
            y: -14,
            boxShadow: "0 40px 80px -10px rgba(0,0,0,0.85)",
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
          },
        }}
      >
        {/* Primary image */}
        {/* Replace <img> with next/image + domain config when using real assets */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          variants={{
            rest: { opacity: 1, scale: 1 },
            hover: { opacity: 0, scale: 1.04, transition: { duration: 0.55, ease: "easeOut" } },
          }}
        />
        {/* Hover image */}
        <motion.img
          src={product.hoverImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          variants={{
            rest: { opacity: 0, scale: 1.04 },
            hover: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
          }}
        />

        {product.tag && (
          <span className="absolute left-4 top-4 bg-[#c9a96e] px-2 py-0.5 text-[9px] font-semibold tracking-[0.3em] text-[#080808] uppercase">
            {product.tag}
          </span>
        )}

        {/* Quick-add overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-[rgba(8,8,8,0.9)] to-transparent pb-5 pt-10"
          variants={{
            rest: { opacity: 0, y: 10 },
            hover: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
          }}
        >
          <button
            type="button"
            className="border border-[rgba(240,237,232,0.3)] px-6 py-2 text-[10px] tracking-[0.3em] text-[#f0ede8] uppercase backdrop-blur-sm transition hover:border-[#f0ede8] hover:bg-[rgba(240,237,232,0.08)]"
          >
            Add to Bag
          </button>
        </motion.div>
      </motion.div>

      {/* Text info */}
      <div className="pt-4">
        <p className="text-[9px] tracking-[0.35em] text-[#5a5552] uppercase">
          {product.category}
        </p>
        <p
          className="mt-1 font-serif text-base font-light text-[#f0ede8]"
          style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
        >
          {product.name}
        </p>
        <p className="mt-1 text-sm text-[#7a7570]">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </motion.article>
  );
}

// ── Grid section ────────────────────────────────────────────────────────────
type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="collection" className="bg-[#080808] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      {/* Header */}
      <motion.div
        className="mb-14"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-[10px] tracking-[0.45em] text-[#5a5552] uppercase">
          The Collection
        </p>
        <h2
          className="mt-3 font-serif text-[clamp(2.2rem,5vw,4rem)] font-light italic text-[#f0ede8]"
          style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
        >
          Selected Pieces
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={cardVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
