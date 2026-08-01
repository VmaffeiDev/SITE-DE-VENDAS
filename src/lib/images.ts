/**
 * Normalização das URLs de fotos recebidas do XML do Revenda Mais.
 *
 * O feed devolve endereços em formatos variados (http, protocolo relativo,
 * espaços sem escape, host sem protocolo). Sem tratamento essas fotos não
 * carregam: `next/image` recusa URLs mal formadas e o navegador bloqueia
 * imagens `http://` dentro de uma página `https://` (mixed content).
 */

const IMAGE_EXTENSION_PATTERN = /\.(jpe?g|png|webp|gif|avif|bmp)$/i;

/**
 * Devolve a URL pronta para uso em `<Image>` ou `null` quando não é utilizável.
 *
 * - caminhos locais (`/uploads/...`) são preservados;
 * - `//host/foto.jpg` e `host/foto.jpg` ganham protocolo;
 * - `http://` é promovido para `https://` para não ser bloqueado como
 *   conteúdo misto nas imagens servidas sem o otimizador;
 * - espaços e acentos são percent-encoded.
 */
export function normalizeImageUrl(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const raw = value.trim();

  if (!raw) {
    return null;
  }

  // Caminho local servido pelo próprio site (uploads de consignação).
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    return encodeLocalPath(raw);
  }

  const withProtocol = raw.startsWith("//")
    ? `https:${raw}`
    : /^https?:\/\//i.test(raw)
      ? raw
      : `https://${raw.replace(/^\/+/, "")}`;

  let url: URL;

  try {
    url = new URL(withProtocol);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return null;
  }

  if (url.protocol === "http:") {
    url.protocol = "https:";
  }

  if (!url.hostname.includes(".")) {
    return null;
  }

  // `href` já percent-encoda espaços e caracteres acentuados do caminho.
  return url.href;
}

function encodeLocalPath(path: string) {
  const [pathname, ...rest] = path.split("?");
  const encoded = pathname
    .split("/")
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join("/");

  return rest.length ? `${encoded}?${rest.join("?")}` : encoded;
}

/**
 * Percorre a subárvore do XML coletando qualquer string que pareça uma URL de
 * imagem. Assim o estoque continua com fotos mesmo se o feed mudar o nome ou o
 * aninhamento das tags (`IMAGE_URL`, `IMAGE_URL_LARGE`, ...).
 */
export function collectImageUrls(node: unknown, depth = 0): string[] {
  if (depth > 6 || node === null || node === undefined) {
    return [];
  }

  if (typeof node === "string") {
    const trimmed = node.trim();
    const looksLikeImage =
      /^(https?:)?\/\//i.test(trimmed) || IMAGE_EXTENSION_PATTERN.test(trimmed);

    return looksLikeImage ? [trimmed] : [];
  }

  if (Array.isArray(node)) {
    return node.flatMap((item) => collectImageUrls(item, depth + 1));
  }

  if (typeof node === "object") {
    return Object.entries(node as Record<string, unknown>)
      .filter(([key]) => !key.startsWith("@_"))
      .flatMap(([, item]) => collectImageUrls(item, depth + 1));
  }

  return [];
}

function imageQualityRank(image: string) {
  if (/(^|[/_-])O(_|-)/i.test(image)) {
    return 0;
  }

  if (/(^|[/_-])W(_|-)/i.test(image)) {
    return 1;
  }

  return 2;
}

function canonicalImageKey(image: string) {
  return image.replace(/(^|[/_-])W(?=[_-])/gi, "$1O").toLowerCase();
}

/**
 * Junta as listas de fotos (grandes e regulares) mantendo uma entrada por foto
 * e preferindo sempre a variante de maior qualidade.
 *
 * A contagem final nunca fica menor que a maior lista de origem: se a
 * canonicalização agrupar fotos distintas por engano, a lista original é usada
 * para não sumir com imagens do anúncio.
 */
export function mergeImageLists(...lists: string[][]): string[] {
  const normalizedLists = lists.map((list) =>
    dedupe(
      list
        .map((image) => normalizeImageUrl(image))
        .filter((image): image is string => Boolean(image))
    )
  );

  const bestImages = new Map<string, string>();

  normalizedLists.flat().forEach((image) => {
    const key = canonicalImageKey(image);
    const current = bestImages.get(key);

    if (!current || imageQualityRank(image) < imageQualityRank(current)) {
      bestImages.set(key, image);
    }
  });

  const merged = Array.from(bestImages.values());
  const richestList = normalizedLists.reduce<string[]>(
    (largest, list) => (list.length > largest.length ? list : largest),
    []
  );

  return merged.length >= richestList.length ? merged : richestList;
}

function dedupe(images: string[]) {
  return Array.from(new Set(images));
}
