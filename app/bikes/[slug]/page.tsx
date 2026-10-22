import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product-card";
import ProductDetailExperience from "@/components/product-detail-experience";
import LocalizedText from "@/components/localized-text";
import SectionHeading from "@/components/section-heading";
import { getDisciplineById } from "@/data/disciplines";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Bike not found",
      description: "This Giant Mongolia bike could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const discipline = getDisciplineById(product.discipline);

  return (
    <main>
      <article className="section">
        <div className="wrap">
          <ProductDetailExperience product={product} />
          {discipline ? (
            <a className="product-discipline-link" href={`/bikes?discipline=${discipline.id}`}>
              <LocalizedText text={`More ${discipline.name} bikes`} />
            </a>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="panel">
          <div className="wrap">
            <SectionHeading id="related-heading" eyebrow="Keep exploring" title="Related bikes" />
            <ul className="product-grid">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
