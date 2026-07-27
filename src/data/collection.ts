export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  hoverImage: string;
  tag?: string;
  href?: string;
};

export type LookItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// ── Swap these values to update your collection ─────────────────────────────
export const COLLECTION_TITLE = "Autumn Nocturne";
export const COLLECTION_SUBTITLE = "A study in shadow and restraint.";
export const HERO_VIDEO_SRC = ""; // path or URL to an .mp4 file

export const products: Product[] = [
  {
    id: "01",
    name: "Obsidian Wool Coat",
    category: "OUTERWEAR",
    price: 1290,
    image: "https://picsum.photos/seed/p1a/600/800",
    hoverImage: "https://picsum.photos/seed/p1b/600/800",
    tag: "New",
  },
  {
    id: "02",
    name: "Midnight Silk Shirt",
    category: "TOPS",
    price: 340,
    image: "https://picsum.photos/seed/p2a/600/800",
    hoverImage: "https://picsum.photos/seed/p2b/600/800",
  },
  {
    id: "03",
    name: "Slate Cashmere Knit",
    category: "KNITWEAR",
    price: 580,
    image: "https://picsum.photos/seed/p3a/600/800",
    hoverImage: "https://picsum.photos/seed/p3b/600/800",
    tag: "Limited",
  },
  {
    id: "04",
    name: "Shadow Leather Trousers",
    category: "BOTTOMS",
    price: 760,
    image: "https://picsum.photos/seed/p4a/600/800",
    hoverImage: "https://picsum.photos/seed/p4b/600/800",
  },
  {
    id: "05",
    name: "Noir Wrap Dress",
    category: "DRESSES",
    price: 490,
    image: "https://picsum.photos/seed/p5a/600/800",
    hoverImage: "https://picsum.photos/seed/p5b/600/800",
    tag: "New",
  },
  {
    id: "06",
    name: "Onyx Structured Bag",
    category: "ACCESSORIES",
    price: 890,
    image: "https://picsum.photos/seed/p6a/600/800",
    hoverImage: "https://picsum.photos/seed/p6b/600/800",
  },
];

export const LOOK_IMAGE = "https://picsum.photos/seed/editorial-look/900/1200";

export const lookItems: LookItem[] = [
  {
    id: "L1",
    name: "Chalk Linen Shirt",
    price: 290,
    image: "https://picsum.photos/seed/look1/120/160",
  },
  {
    id: "L2",
    name: "Charcoal Wide-Leg Trousers",
    price: 480,
    image: "https://picsum.photos/seed/look2/120/160",
  },
  {
    id: "L3",
    name: "Cream Suede Mules",
    price: 395,
    image: "https://picsum.photos/seed/look3/120/160",
  },
];

export const reviews = [
  `"The quality is unlike anything I've owned."`,
  `"Arrived in perfect condition — stunning construction."`,
  `"I've never felt so effortlessly dressed."`,
  `"Worth every penny. Absolutely flawless."`,
  `"The coat stopped traffic. Literally."`,
  `"My most-complimented piece, without question."`,
];
