"use client";

import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type VehicleImageProps = Omit<ImageProps, "onError" | "src"> & {
  src: string;
  /** Conteúdo exibido quando a foto não carrega de jeito nenhum. */
  fallback?: ReactNode;
};

type LoadStage = "optimized" | "direct" | "failed";

/**
 * `next/image` com duas redes de proteção para as fotos vindas do Revenda Mais:
 *
 * 1. se o otimizador recusar a URL (host fora de `images.remotePatterns`) ou
 *    falhar ao buscar o arquivo, a foto é carregada direto da origem;
 * 2. se nem assim carregar, mostra um placeholder em vez de um quadro vazio.
 */
export function VehicleImage({
  src,
  alt,
  fallback,
  unoptimized,
  ...imageProps
}: VehicleImageProps) {
  const initialStage: LoadStage = unoptimized ? "direct" : "optimized";
  const [stage, setStage] = useState<LoadStage>(initialStage);

  useEffect(() => {
    setStage(initialStage);
  }, [src, initialStage]);

  if (stage === "failed") {
    return (
      fallback ?? (
        <div className="flex h-full w-full items-center justify-center bg-mist text-graphite">
          <ImageIcon size={34} />
          <span className="sr-only">Foto indisponível</span>
        </div>
      )
    );
  }

  return (
    <Image
      {...imageProps}
      key={`${src}-${stage}`}
      src={src}
      alt={alt}
      unoptimized={stage === "direct"}
      onError={() => {
        setStage((current) => (current === "optimized" ? "direct" : "failed"));
      }}
    />
  );
}
