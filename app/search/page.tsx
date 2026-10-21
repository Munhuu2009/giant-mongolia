import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/page-intro";
import ProductCard from "@/components/product-card";
import { ButtonLink } from "@/components/ui/Button";
import { searchCopy } from "@/data/pages";
import { searchProducts } from "@/data/products";

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}): Promise<Metadata> {
  const q = firstParam((await searchParams).q).trim();
  if (!q) {
    return {
      title: "Search",
      description: "Search Giant bikes by name, category, or discipline at Giant Mongolia.",
    };
  }
  return {
    title: `Search “${q}”`,
    description: `Giant Mongolia bikes matching “${q}”.`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const q = firstParam((await searchParams).q).trim();
  const results = searchProducts(q);
  const title = q ? `Results for “${q}”` : searchCopy.title;
  const lead = q
    ? results.length > 0
      ? searchCopy.pageLead
      : searchCopy.pageEmptyLead
    : searchCopy.placeholder;

  return (
    <main>
      <PageIntro id="search-heading" eyebrow={searchCopy.pageEyebrow} title={title} lead={lead} />

      <section aria-labelledby="search-heading" className="section">
        <div className="wrap">
          {q && results.length === 0 ? (
            <div>
              <p role="status" className="type-lead">
                {`${searchCopy.emptyPrefix} “${q}”`}
              </p>
              <ButtonLink href="/bikes" variant="secondary" size="md" className="mt-8">
                Browse all bikes
              </ButtonLink>
            </div>
          ) : results.length > 0 ? (
            <ul className="product-grid">
              {results.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="type-lead">
              Type a bike name in search, or{" "}
              <Link href="/bikes" className="plain-link">
                browse all bikes
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
