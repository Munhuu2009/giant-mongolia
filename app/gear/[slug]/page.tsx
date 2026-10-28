import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GearDetail from "@/components/gear-detail";
import { gearProducts, getGearBySlug } from "@/data/gearData";

type GearPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return gearProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: GearPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getGearBySlug(slug);
  if (!product) return { title: "Gear not found | Giant Mongolia" };
  return {
    title: `${product.name} | Giant Mongolia`,
    description: product.detail.en,
  };
}

export default async function GearPage({ params }: GearPageProps) {
  const { slug } = await params;
  const product = getGearBySlug(slug);
  if (!product) notFound();

  return <GearDetail product={product} />;
}
