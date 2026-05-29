"use client";

import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type VehicleGalleryProps = {
  images: string[];
  title: string;
};

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const galleryImages = useMemo(
    () => images.filter((image) => Boolean(image)),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex > galleryImages.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, galleryImages.length]);

  const activeImage = galleryImages[activeIndex];
  const hasMultipleImages = galleryImages.length > 1;

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="min-w-0 space-y-4" aria-label={`Galeria de fotos: ${title}`}>
      <div className="relative overflow-hidden rounded-lg border border-line bg-white shadow-sm">
        <div className="relative aspect-[4/3] bg-white">
          {activeImage ? (
            <Image
              key={activeImage}
              src={activeImage}
              alt={`${title} foto ${activeIndex + 1}`}
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-graphite">
              <ImageIcon size={44} />
              <span className="sr-only">Foto indisponível</span>
            </div>
          )}
        </div>

        {hasMultipleImages ? (
          <>
            <div className="absolute right-4 top-4 rounded bg-ink/80 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
              {activeIndex + 1} / {galleryImages.length}
            </div>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-ink shadow-soft transition hover:bg-white"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-ink shadow-soft transition hover:bg-white"
            >
              <ChevronRight size={22} />
            </button>
          </>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div
          className="flex max-w-full gap-3 overflow-x-auto pb-2"
          aria-label="Miniaturas"
        >
          {galleryImages.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Mostrar foto ${index + 1}`}
                aria-pressed={isActive}
                className={`relative h-20 w-28 shrink-0 overflow-hidden rounded border bg-white transition ${
                  isActive
                    ? "border-ink ring-2 ring-ink/20"
                    : "border-line hover:border-graphite"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} miniatura ${index + 1}`}
                  fill
                  unoptimized
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
