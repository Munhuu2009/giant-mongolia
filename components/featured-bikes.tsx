import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import SectionHeading from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProducts } from "@/data/products";

export default function FeaturedBikes() {
  return (
    <section id="bikes" aria-labelledby="bikes-heading" className="panel">
      <div className="wrap">
        <SectionHeading
          id="bikes-heading"
          eyebrow="2026 collection"
          title="Featured bikes"
          action={
            <ButtonLink href="/bikes" variant="secondary" size="md" className="self-start md:self-auto">
              View all bikes
              <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
            </ButtonLink>
          }
        />

        <ul className="product-grid">
          {featuredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
