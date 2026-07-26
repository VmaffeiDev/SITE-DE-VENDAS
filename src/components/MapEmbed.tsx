"use client";

import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";

type MapEmbedProps = {
  title: string;
  embedUrl: string;
  mapsUrl: string;
};

export function MapEmbed({ title, embedUrl, mapsUrl }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-premium">
      {loaded ? (
        <iframe
          title={title}
          src={embedUrl}
          className="h-full min-h-[320px] w-full border-0"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin size={32} className="text-whatsapp" />
          <p className="text-sm font-black text-white">{title}</p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex h-11 items-center justify-center rounded bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Carregar mapa
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-black text-whatsapp"
          >
            <Navigation size={16} />
            Abrir no Google Maps
          </a>
        </div>
      )}
    </div>
  );
}
