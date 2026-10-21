import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product-card";
import ProductSizeSelector from "@/components/product-size-selector";
import SectionHeading from "@/components/section-heading";
import LocalizedText from "@/components/localized-text";
import { ButtonLink } from "@/components/ui/Button";
import { getDisciplineById } from "@/data/disciplines";
import { formatMnt, getProductBySlug, getRelatedProducts, products } from "@/data/products";

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
        <div className="wrap product-detail">
          <div className="product-detail__media">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <LocalizedText as="p" className="type-label" text={product.category} />
            <h1 className="type-headline mt-2">{product.name}</h1>
            <p className="product-detail__price">{formatMnt(product.priceMnt)}</p>
            <LocalizedText as="p" className="product-detail__copy" text={product.description} />

            <ProductSizeSelector sizes={product.sizes} productName={product.name} />

            <dl className="spec-table">
              {product.specs.map((spec) => (
                <div key={spec.label} className="spec-row">
                  <dt><LocalizedText text={spec.label} /></dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/stores" variant="primary" size="md">
                <LocalizedText text="Test ride in store" />
              </ButtonLink>
              {discipline ? (
                <ButtonLink href={`/bikes?discipline=${discipline.id}`} variant="ghost" size="md">
                  <LocalizedText text={`More ${discipline.name} bikes`} />
                </ButtonLink>
              ) : null}
            </div>
          </div>
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
