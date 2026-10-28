export type GearCategory = "helmets" | "apparel" | "electronics" | "accessories";

export type GearProduct = {
  id: string;
  slug: string;
  name: string;
  category: GearCategory;
  priceMnt: number;
  priceUsd: number;
  image: string;
  badge?: string;
  isNew?: boolean;
  detail: { en: string; mn: string };
};

export const gearCategories: {
  id: GearCategory | "all";
  en: string;
  mn: string;
}[] = [
  { id: "all", en: "All Gear", mn: "БҮХ ХЭРЭГСЭЛ" },
  { id: "helmets", en: "Helmets", mn: "ДУУЛГА" },
  { id: "apparel", en: "Apparel & Shoes", mn: "ХУВЦАС & ГУТАЛ" },
  { id: "electronics", en: "Lights & Electronics", mn: "ГЭРЭЛ & ЭЛЕКТРОНИК" },
  { id: "accessories", en: "Bags, Pumps & Tools", mn: "ЦӨНХ & БАГАЖ" },
];

const rawGearProducts: Omit<GearProduct, "slug">[] = [
  {
    id: "rev-pro-mips-helmet",
    name: "Giant Rev Pro MIPS Helmet",
    category: "helmets",
    priceMnt: 580_000,
    priceUsd: 165,
    image: "/images/gianthelmet1.jpg",
    badge: "MIPS",
    detail: {
      en: "Race-ready protection with MIPS rotational impact technology.",
      mn: "MIPS эргэлтийн цохилтын хамгаалалттай, уралдаанд бэлэн дуулга.",
    },
  },
  {
    id: "relay-mips-mtb-helmet",
    name: "Giant Relay MIPS MTB Helmet",
    category: "helmets",
    priceMnt: 280_000,
    priceUsd: 80,
    image: "/images/gianthelmet2.jpg",
    badge: "MIPS",
    detail: {
      en: "Trail-focused coverage and comfortable MIPS protection.",
      mn: "Замын хамгаалалт сайтай, биед эвтэйхэн MIPS технологитой.",
    },
  },
  {
    id: "proshield-rain-jacket",
    name: "Giant Proshield Rain Jacket",
    category: "apparel",
    priceMnt: 380_000,
    priceUsd: 110,
    image: "/images/giantjacket1.jpg",
    badge: "WATERPROOF",
    detail: {
      en: "Lightweight weather protection for wet rides and changing conditions.",
      mn: "Бороотой болон цаг агаар өөрчлөгдөх үед өмсөх хөнгөн хамгаалалт.",
    },
  },
  {
    id: "shuttle-clip-boa-shoes",
    name: "Giant Shuttle Clip BOA Shoes",
    category: "apparel",
    priceMnt: 1_050_000,
    priceUsd: 299.99,
    image: "/images/giantshoe1.png",
    badge: "NEW",
    isNew: true,
    detail: {
      en: "Clip-in trail shoes with a precise, easy-adjust BOA fit.",
      mn: "BOA тохируулгатай, дөрөөнд түгжигддэг замын гутал.",
    },
  },
  {
    id: "elevate-bib-jersey-set",
    name: "Giant Elevate Bib Shorts & Jersey Set",
    category: "apparel",
    priceMnt: 420_000,
    priceUsd: 120,
    image: "/images/bibshorts.jpg",
    badge: "SET",
    detail: {
      en: "A coordinated riding kit made for comfort on long days in the saddle.",
      mn: "Удаан аяллын тав тухад зориулсан хос өмсгөл.",
    },
  },
  {
    id: "recon-hl-1100-front-light",
    name: "Giant Recon HL 1100 Front Light",
    category: "electronics",
    priceMnt: 320_000,
    priceUsd: 90,
    image: "/images/frontlight.jpg",
    badge: "BEST SELLER",
    detail: {
      en: "A powerful 1100-lumen front light for visibility after dark.",
      mn: "Харанхуйд харагдах байдлыг сайжруулах 1100 люмен урд гэрэл.",
    },
  },
  {
    id: "recon-tl-200-rear-light",
    name: "Giant Recon TL 200 Rear Light",
    category: "electronics",
    priceMnt: 180_000,
    priceUsd: 50,
    image: "/images/rearlight.jpg",
    detail: {
      en: "A compact rear light to help keep you visible on every ride.",
      mn: "Аялал бүрд харагдах байдлыг нэмэх авсаархан арын гэрэл.",
    },
  },
  {
    id: "control-tower-pro-floor-pump",
    name: "Giant Control Tower Pro Floor Pump",
    category: "accessories",
    priceMnt: 210_000,
    priceUsd: 60,
    image: "/images/pump.jpg",
    badge: "WORKSHOP PICK",
    detail: {
      en: "A stable floor pump for reliable, precise everyday inflation.",
      mn: "Өдөр тутмын найдвартай, нарийн хий шахалтад зориулсан суурин насос.",
    },
  },
  {
    id: "shadow-dx-seat-bag-bottle-cage",
    name: "Giant Shadow DX Seat Bag & Bottle Cage",
    category: "accessories",
    priceMnt: 110_000,
    priceUsd: 30,
    image: "/images/seatbag.jpg",
    detail: {
      en: "A practical storage and hydration set for rides near and far.",
      mn: "Ойрын болон холын аялалд хэрэгтэй цүнх, савны суурийн багц.",
    },
  },
];

export const gearProducts: GearProduct[] = rawGearProducts.map((product) => ({
  ...product,
  slug: product.id,
}));

export function getGearBySlug(slug: string): GearProduct | undefined {
  return gearProducts.find((product) => product.slug === slug);
}

export function getGearSizes(product: GearProduct): string[] {
  if (product.category === "helmets") return ["S", "M", "L"];
  if (product.id.includes("shoes")) return ["40", "41", "42", "43", "44", "45"];
  if (product.category === "apparel") return ["S", "M", "L", "XL"];
  return [];
}

export const gearDescriptionMn =
  "Giant брэндийн энэ мэргэжлийн хэрэгсэл нь чанар болон тав тухыг дээд зэргээр хангана. Бэлэн байдлыг Giant Mongolia-с шалгана уу.";
