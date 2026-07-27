import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import { GrainOverlay } from "@/components/landing/GrainOverlay";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LenisProvider } from "@/components/landing/LenisProvider";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { ShopTheLook } from "@/components/landing/ShopTheLook";
import {
  COLLECTION_SUBTITLE,
  COLLECTION_TITLE,
  HERO_VIDEO_SRC,
  LOOK_IMAGE,
  lookItems,
  products,
  reviews,
} from "@/data/collection";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: `${COLLECTION_TITLE} — Nocturne Studio`,
  description: COLLECTION_SUBTITLE,
};

export default function ColecaoPage() {
  return (
    <div className={`${serif.variable} bg-[#080808] text-[#f0ede8]`}>
      <LenisProvider>
        <GrainOverlay />
        <HeroSection
          title={COLLECTION_TITLE}
          subtitle={COLLECTION_SUBTITLE}
          videoSrc={HERO_VIDEO_SRC || undefined}
        />
        <ProductGrid products={products} />
        <MarqueeStrip reviews={reviews} />
        <ShopTheLook image={LOOK_IMAGE} items={lookItems} />
        <LandingFooter />
      </LenisProvider>
    </div>
  );
}
