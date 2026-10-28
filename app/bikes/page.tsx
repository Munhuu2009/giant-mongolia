import type { Metadata } from "next";
import BikeCatalog from "@/components/bike-catalog";
import BikeVideoHero from "@/components/bike-video-hero";
import type { BikeCategory } from "@/data/bikesData";

export const metadata: Metadata = {
  title: "Bikes",
  description:
    "Shop Giant road, mountain, gravel, city, kids, and e-bikes at Giant Mongolia in Ulaanbaatar.",
};

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function BikesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; discipline?: string | string[] }>;
}) {
  const params = await searchParams;
  const disciplineId = firstParam(params.category) ?? firstParam(params.discipline);
  const initialCategory: BikeCategory | "all" =
    disciplineId === "ebike" ||
    disciplineId === "road" ||
    disciplineId === "gravel" ||
    disciplineId === "mountain" ||
    disciplineId === "city" ||
    disciplineId === "kids"
      ? disciplineId
      : "all";

  return (
    <main>
      <BikeVideoHero />
      <BikeCatalog key={initialCategory} initialCategory={initialCategory} />
    </main>
  );
}
