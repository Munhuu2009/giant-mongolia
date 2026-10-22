export type BikeCategory = "road" | "gravel" | "mountain" | "ebike" | "city" | "kids";

export type BikeCatalogItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryMn: string;
  categoryId: BikeCategory;
  priceMnt: number;
  sizes: string[];
  image: string;
  badge?: "new" | "ebike" | "kids";
};

const images: Record<BikeCategory, string> = {
  road: "/images/bike-road.png",
  gravel: "/images/bike-gravel.png",
  mountain: "/images/bike-mtb.png",
  ebike: "/images/bike-ebike.png",
  city: "/images/bike-road.png",
  kids: "/images/bike-mtb.png",
};

function bike(
  slug: string,
  name: string,
  categoryId: BikeCategory,
  category: string,
  categoryMn: string,
  priceMnt: number,
  sizes: string[],
  badge?: BikeCatalogItem["badge"],
): BikeCatalogItem {
  return {
    id: slug,
    slug,
    name,
    category,
    categoryMn,
    categoryId,
    priceMnt,
    sizes,
    image: images[categoryId],
    ...(badge ? { badge } : {}),
  };
}

export const bikesData: BikeCatalogItem[] = [
  bike("propel-advanced-sl-0", "Giant Propel Advanced SL 0", "road", "Aero Road", "Замын / Аэродинамик", 38_000_000, ["S", "M", "L"], "new"),
  bike("propel-advanced-1", "Giant Propel Advanced 1", "road", "Aero Road", "Замын / Аэродинамик", 9_850_000, ["S", "M", "ML", "L"]),
  bike("tcr-advanced-sl-0", "Giant TCR Advanced SL 0", "road", "Road Race", "Замын / Уралдааны", 32_000_000, ["XS", "S", "M", "L"], "new"),
  bike("tcr-advanced-2", "Giant TCR Advanced 2", "road", "Road Race", "Замын / Уралдааны", 7_250_000, ["XS", "S", "M", "ML", "L"]),
  bike("defy-advanced-pro-1", "Giant Defy Advanced Pro 1", "road", "Endurance Road", "Замын / Холын зайн", 14_500_000, ["S", "M", "ML", "L"]),
  bike("contend-ar-1", "Giant Contend AR 1", "road", "All-Road", "Замын / Бүх замын", 4_800_000, ["S", "M", "L", "XL"]),

  bike("revolt-advanced-pro-0", "Giant Revolt Advanced Pro 0", "gravel", "Gravel", "Гравел", 18_500_000, ["S", "M", "ML", "L"], "new"),
  bike("revolt-advanced-2", "Giant Revolt Advanced 2", "gravel", "Gravel", "Гравел", 8_900_000, ["XS", "S", "M", "L"]),
  bike("revolt-2", "Giant Revolt 2", "gravel", "Gravel / Adventure", "Гравел / Адал явдал", 4_950_000, ["XS", "S", "M", "ML", "L"]),
  bike("revolt-x-advanced-pro-1", "Giant Revolt X Advanced Pro 1", "gravel", "Suspension Gravel", "Түдгэлзүүлэлттэй гравел", 16_200_000, ["S", "M", "L"]),
  bike("toughroad-slr-1", "Giant ToughRoad SLR 1", "gravel", "Adventure / Off-Road", "Адал явдал / Бартаат зам", 5_200_000, ["S", "M", "L", "XL"]),

  bike("anthem-advanced-pro-29-1", "Giant Anthem Advanced Pro 29 1", "mountain", "XC Full Suspension", "Кросс кантри / Бүтэн түдгэлзүүлэлт", 21_000_000, ["S", "M", "L"]),
  bike("trance-advanced-pro-29-2", "Giant Trance Advanced Pro 29 2", "mountain", "Trail Full Suspension", "Трейл / Бүтэн түдгэлзүүлэлт", 15_800_000, ["S", "M", "L", "XL"]),
  bike("trance-x-2", "Giant Trance X 2", "mountain", "Trail", "Трейл", 7_400_000, ["S", "M", "L", "XL"]),
  bike("reign-advanced-pro-29-1", "Giant Reign Advanced Pro 29 1", "mountain", "Enduro", "Эндуро", 22_500_000, ["S", "M", "L"]),
  bike("stance-29-2", "Giant Stance 29 2", "mountain", "Trail Full Suspension", "Трейл / Бүтэн түдгэлзүүлэлт", 5_800_000, ["S", "M", "L", "XL"]),
  bike("fathom-2", "Giant Fathom 2", "mountain", "XC Hardtail", "Кросс кантри / Хатуу сэрээ", 3_850_000, ["S", "M", "L", "XL"]),
  bike("talon-1", "Giant Talon 1", "mountain", "Trail Hardtail", "Трейл / Хатуу сэрээ", 2_850_000, ["XS", "S", "M", "L", "XL"]),

  bike("reign-advanced-e-plus-0", "Giant Reign Advanced E+ 0", "ebike", "E-MTB", "Цахилгаан уулын дугуй", 31_500_000, ["S", "M", "L"], "ebike"),
  bike("trance-advanced-e-plus-1", "Giant Trance Advanced E+ 1", "ebike", "E-MTB", "Цахилгаан уулын дугуй", 24_500_000, ["S", "M", "L", "XL"], "ebike"),
  bike("stance-e-plus-1", "Giant Stance E+ 1", "ebike", "Trail E-MTB", "Трейл цахилгаан уулын дугуй", 11_200_000, ["S", "M", "L"], "ebike"),
  bike("explore-e-plus-2", "Giant Explore E+ 2", "ebike", "Trekking E-Bike", "Аяллын цахилгаан дугуй", 9_500_000, ["S", "M", "L", "XL"], "ebike"),
  bike("fastroad-e-plus-ex-pro", "Giant FastRoad E+ EX Pro", "ebike", "Fitness E-Bike", "Фитнес цахилгаан дугуй", 10_800_000, ["S", "M", "L"], "ebike"),

  bike("fastroad-sl-1", "Giant FastRoad SL 1", "city", "Fitness Flat-Bar", "Фитнес / Шулуун бариултай", 3_600_000, ["S", "M", "ML", "L"]),
  bike("escape-1-disc", "Giant Escape 1 Disc", "city", "City / Commuter", "Хот / Өдөр тутмын", 2_750_000, ["S", "M", "L", "XL"]),
  bike("escape-3", "Giant Escape 3", "city", "Urban Commuter", "Хотын өдөр тутмын", 1_950_000, ["XS", "S", "M", "L"]),
  bike("seek-1", "Giant Seek 1", "city", "Urban Utility", "Хотын хэрэглээний", 3_200_000, ["S", "M", "L"]),

  bike("stp-24-fs", "Giant STP 24 FS", "kids", "Kids Trail / Dirt Jump", "Хүүхдийн трейл / Дёрт-жамп", 1_850_000, ["One Size"], "kids"),
  bike("arx-20", "Giant ARX 20", "kids", "Kids Lightweight", "Хүүхдийн хөнгөн загвар", 1_250_000, ["One Size"], "kids"),
  bike("animator-16", "Giant Animator 16", "kids", "Kids First Pedal", "Хүүхдийн анхны дөрөөт", 780_000, ["One Size"], "kids"),
];

export const bikeCategories: { id: BikeCategory | "all"; label: string; labelMn: string }[] = [
  { id: "all", label: "All Bikes", labelMn: "БҮГД" },
  { id: "road", label: "Road", labelMn: "ЗАМЫН" },
  { id: "gravel", label: "Gravel", labelMn: "ГРАВЕЛ" },
  { id: "mountain", label: "Mountain", labelMn: "УУЛЫН" },
  { id: "ebike", label: "E-Bikes", labelMn: "ЦАХИЛГААН" },
  { id: "city", label: "City / Fitness", labelMn: "ХОТЫН" },
  { id: "kids", label: "Kids", labelMn: "ХҮҮХДИЙН" },
];
