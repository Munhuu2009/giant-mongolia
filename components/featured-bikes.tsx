"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import ProductCard from "@/components/product-card";
import SectionHeading from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProducts } from "@/data/products";

const featuredBadges: Record<string, "New" | "Best Seller"> = {
  "propel-advanced-1": "New",
  "trance-x-2": "Best Seller",
};

export default function FeaturedBikes() {
  const { translate } = useLanguage();

  return (
    <section id="bikes" aria-labelledby="bikes-heading" className="panel featured-section">
      <div className="wrap">
        <SectionHeading
          id="bikes-heading"
          eyebrow={translate("2026 collection")}
          title={translate("Featured bikes")}
          action={
            <ButtonLink href="/bikes" variant="secondary" size="md" className="self-start md:self-auto">
              {translate("View all bikes")}
              <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
            </ButtonLink>
          }
        />

        <ul className="product-grid">
          {featuredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                variant="featured"
                promotionBadge={featuredBadges[product.id]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
