import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import SectionHeading from "@/components/section-heading";
import { featuredProducts } from "@/data/products";

export default function FeaturedBikes() {
  return (
    <section id="bikes" aria-labelledby="bikes-heading" className="scroll-mt-16 bg-neutral-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="bikes-heading"
          eyebrow="2026 collection"
          title="Featured bikes"
          action={
            <Link
              href="#"
              className="group inline-flex h-11 items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.18em] text-neutral-900 hover:text-accent md:self-auto"
            >
              View all bikes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          }
        />

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
