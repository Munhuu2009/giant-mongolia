// PLACEHOLDER DATA — replace with real Giant Mongolia catalog, pricing, and inventory.
// Names, prices (MNT), and sizes below are illustrative only.

export type Product = {
  id: string;
  name: string;
  category: string;
  priceMnt: number;
  sizes: string[];
  image: string;
  href: string;
  badge?: string;
};

export const featuredProducts: Product[] = [
  {
    id: "propel-advanced-1",
    name: "Propel Advanced 1",
    category: "Road / Aero",
    priceMnt: 9_850_000,
    sizes: ["S", "M", "ML", "L"],
    image: "/images/bike-road.png",
    href: "#",
    badge: "New",
  },
  {
    id: "trance-x-2",
    name: "Trance X 2",
    category: "Mountain / Trail",
    priceMnt: 7_400_000,
    sizes: ["S", "M", "L", "XL"],
    image: "/images/bike-mtb.png",
    href: "#",
  },
  {
    id: "stance-e-plus-1",
    name: "Stance E+ 1",
    category: "E-Bike / E-MTB",
    priceMnt: 11_200_000,
    sizes: ["S", "M", "L"],
    image: "/images/bike-ebike.png",
    href: "#",
    badge: "E-Bike",
  },
  {
    id: "revolt-2",
    name: "Revolt 2",
    category: "Gravel / Adventure",
    priceMnt: 4_950_000,
    sizes: ["XS", "S", "M", "ML", "L"],
    image: "/images/bike-gravel.png",
    href: "#",
  },
];

/** Single entry point for product data so the source can later become a real catalog API. */
export async function getFeaturedProducts(): Promise<Product[]> {
  return featuredProducts;
}

export function formatMnt(value: number): string {
  return `₮${value.toLocaleString("en-US")}`;
}
