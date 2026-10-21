// PLACEHOLDER DATA — replace with real Giant Mongolia catalog, pricing, and inventory.
// Names, prices (MNT), and sizes below are illustrative only.

import { getDisciplineById } from "./disciplines";

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  priceMnt: number;
  sizes: string[];
  image: string;
  href: string;
  badge?: string;
  description: string;
  specs: ProductSpec[];
  discipline: string;
};

export const products: Product[] = [
  {
    id: "propel-advanced-1",
    slug: "propel-advanced-1",
    name: "Propel Advanced 1",
    category: "Road / Aero",
    priceMnt: 9_850_000,
    sizes: ["S", "M", "ML", "L"],
    image: "/images/bike-road.png",
    href: "/bikes/propel-advanced-1",
    badge: "New",
    // PLACEHOLDER
    description:
      "An aero road bike built to cut through wind on open steppe roads and race circuits. Lightweight Advanced-grade composite and integrated cockpit details keep you fast when the road is smooth and the pace is high.",
    specs: [
      { label: "Frame", value: "Advanced-Grade Composite" },
      { label: "Fork", value: "Advanced-Grade Composite, full-composite OverDrive steerer" },
      { label: "Groupset", value: "Shimano 105 Di2" },
      { label: "Wheelset", value: "Giant SLR 2 50 Carbon Disc" },
      { label: "Weight", value: "8.1 kg (size M, claimed)" },
    ],
    discipline: "road",
  },
  {
    id: "tcr-advanced-2",
    slug: "tcr-advanced-2",
    name: "TCR Advanced 2",
    category: "Road / Race",
    priceMnt: 7_250_000,
    sizes: ["XS", "S", "M", "ML", "L"],
    image: "/images/bike-road.png",
    href: "/bikes/tcr-advanced-2",
    // PLACEHOLDER
    description:
      "A compact road race bike for climbing, group rides, and all-day events. The TCR’s stiff, light chassis rewards every watt on Ulaanbaatar’s rolling roads and weekend hill repeats.",
    specs: [
      { label: "Frame", value: "Advanced-Grade Composite" },
      { label: "Fork", value: "Advanced-Grade Composite" },
      { label: "Groupset", value: "Shimano 105" },
      { label: "Wheelset", value: "Giant P-R2 Disc" },
      { label: "Weight", value: "8.4 kg (size M, claimed)" },
    ],
    discipline: "road",
  },
  {
    id: "trance-x-2",
    slug: "trance-x-2",
    name: "Trance X 2",
    category: "Mountain / Trail",
    priceMnt: 7_400_000,
    sizes: ["S", "M", "L", "XL"],
    image: "/images/bike-mtb.png",
    href: "/bikes/trance-x-2",
    // PLACEHOLDER
    description:
      "A versatile trail bike with Maestro suspension for Bogd Khan ridgelines and weekend park laps. Balanced geometry keeps you confident on descents without giving up the climb back to the ridge.",
    specs: [
      { label: "Frame", value: "ALUXX SL-Grade Aluminum" },
      { label: "Suspension", value: "Maestro, 140 mm rear / 150 mm fork" },
      { label: "Groupset", value: "Shimano Deore / XT mix" },
      { label: "Wheel size", value: "29-inch" },
      { label: "Travel", value: "150 / 140 mm" },
    ],
    discipline: "mountain",
  },
  {
    id: "fathom-2",
    slug: "fathom-2",
    name: "Fathom 2",
    category: "Mountain / Hardtail",
    priceMnt: 3_850_000,
    sizes: ["S", "M", "L", "XL"],
    image: "/images/bike-mtb.png",
    href: "/bikes/fathom-2",
    // PLACEHOLDER
    description:
      "A capable aluminum hardtail for first trail days and fitness rides around the city fringe. Wide-range gearing and a trail-ready fork make rutted tracks and fire roads feel composed.",
    specs: [
      { label: "Frame", value: "ALUXX-Grade Aluminum" },
      { label: "Fork", value: "Giant Crest 34, 120 mm" },
      { label: "Groupset", value: "Shimano Deore" },
      { label: "Wheel size", value: "29-inch" },
      { label: "Tires", value: "Giant Talon 29x2.4" },
    ],
    discipline: "mountain",
  },
  {
    id: "stance-e-plus-1",
    slug: "stance-e-plus-1",
    name: "Stance E+ 1",
    category: "E-Bike / E-MTB",
    priceMnt: 11_200_000,
    sizes: ["S", "M", "L"],
    image: "/images/bike-ebike.png",
    href: "/bikes/stance-e-plus-1",
    badge: "E-Bike",
    // PLACEHOLDER
    description:
      "A SyncDrive-powered trail e-bike that makes longer loops and steeper climbs accessible. Smart Assist reads how you pedal so support feels natural on mixed paths around Ulaanbaatar.",
    specs: [
      { label: "Motor", value: "SyncDrive Sport, 75 Nm" },
      { label: "Battery", value: "EnergyPak 625 Wh" },
      { label: "Frame", value: "ALUXX-Grade Aluminum" },
      { label: "Suspension", value: "FlexPoint, 120 mm" },
      { label: "Range", value: "Up to 120 km (claimed, Eco mode)" },
    ],
    discipline: "ebike",
  },
  {
    id: "revolt-2",
    slug: "revolt-2",
    name: "Revolt 2",
    category: "Gravel / Adventure",
    priceMnt: 4_950_000,
    sizes: ["XS", "S", "M", "ML", "L"],
    image: "/images/bike-gravel.png",
    href: "/bikes/revolt-2",
    // PLACEHOLDER
    description:
      "A gravel bike for mixed pavement, dirt, and steppe tracks. Generous tire clearance and stable geometry invite all-day rides when the tarmac ends and the horizon opens.",
    specs: [
      { label: "Frame", value: "ALUXX-Grade Aluminum" },
      { label: "Fork", value: "Advanced-Grade Composite" },
      { label: "Groupset", value: "Shimano GRX" },
      { label: "Tire clearance", value: "Up to 45 mm" },
      { label: "Wheelset", value: "Giant S-X2 Disc" },
    ],
    discipline: "gravel",
  },
  {
    id: "escape-3",
    slug: "escape-3",
    name: "Escape 3",
    category: "City / Fitness",
    priceMnt: 1_650_000,
    sizes: ["S", "M", "L"],
    image: "/images/bike-gravel.png",
    href: "/bikes/escape-3",
    // PLACEHOLDER
    description:
      "A comfortable city bike for Peace Avenue commutes and evening fitness loops. Upright posture, reliable gearing, and mounts for fenders make it an everyday rider in every season.",
    specs: [
      { label: "Frame", value: "ALUXX-Grade Aluminum" },
      { label: "Fork", value: "High-tensile steel" },
      { label: "Groupset", value: "Shimano Tourney / Altus" },
      { label: "Brakes", value: "Alloy linear-pull" },
      { label: "Tires", value: "Giant S-X3, puncture resistant" },
    ],
    discipline: "city",
  },
  {
    id: "stp-20",
    slug: "stp-20",
    name: "STP 20",
    category: "Kids / Dirt",
    priceMnt: 1_280_000,
    sizes: ["20\""],
    image: "/images/bike-mtb.png",
    href: "/bikes/stp-20",
    badge: "Kids",
    // PLACEHOLDER
    description:
      "A 20-inch dirt jump and park bike for young riders learning manuals, pump tracks, and first trail days. Tough aluminum and a low standover keep the bike playful and easy to handle.",
    specs: [
      { label: "Frame", value: "ALUXX-Grade Aluminum" },
      { label: "Fork", value: "Rigid alloy, 20-inch" },
      { label: "Brakes", value: "Tektro mechanical disc" },
      { label: "Wheel size", value: "20-inch" },
      { label: "Intended use", value: "Pump track, dirt jump, park" },
    ],
    discipline: "kids",
  },
];

const featuredIds = ["propel-advanced-1", "trance-x-2", "stance-e-plus-1", "revolt-2"];

export const featuredProducts: Product[] = products.filter((product) => featuredIds.includes(product.id));

export function formatMnt(value: number): string {
  return `₮${value.toLocaleString("en-US")}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByDiscipline(disciplineId: string | undefined): Product[] {
  if (!disciplineId) return products;
  return products.filter((product) => product.discipline === disciplineId);
}

export function searchProducts(query: string): Product[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  return products.filter((product) => {
    const disciplineName = getDisciplineById(product.discipline)?.name ?? "";
    const haystack = [product.name, product.category, product.discipline, disciplineName]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameDiscipline = products.filter(
    (item) => item.id !== product.id && item.discipline === product.discipline
  );
  const others = products.filter((item) => item.id !== product.id && item.discipline !== product.discipline);
  return [...sameDiscipline, ...others].slice(0, limit);
}
