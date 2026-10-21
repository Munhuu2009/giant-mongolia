import type { Metadata } from "next";
import PageIntro from "@/components/page-intro";
import ProductCard from "@/components/product-card";
import LocalizedText from "@/components/localized-text";
import { getDisciplineById } from "@/data/disciplines";
import { bikesPage } from "@/data/pages";
import { getProductsByDiscipline } from "@/data/products";

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
  searchParams: Promise<{ discipline?: string | string[] }>;
}) {
  const params = await searchParams;
  const disciplineId = firstParam(params.discipline);
  const discipline = getDisciplineById(disciplineId);
  const list = getProductsByDiscipline(discipline?.id);

  const title = discipline ? `${discipline.name} bikes` : bikesPage.title;
  const lead = discipline
    ? `Giant ${discipline.name.toLowerCase()} bikes available at Giant Mongolia. ${discipline.tagline}.`
    : bikesPage.lead;

  return (
    <main>
      <PageIntro id="bikes-heading" eyebrow={bikesPage.eyebrow} title={title} lead={lead} />

      <section aria-labelledby="bikes-heading" className="section">
        <div className="wrap">
          {list.length === 0 ? (
            <LocalizedText
              as="p"
              className="type-lead"
              text="No bikes in this category yet. Check back soon or browse the full range."
            />
          ) : (
            <ul className="product-grid">
              {list.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
