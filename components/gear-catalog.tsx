"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-provider";
import { gearCategories, gearProducts, type GearCategory } from "@/data/gearData";
import { formatMnt } from "@/data/products";

type SortOption = "all" | "price-asc" | "new";

const categoryTranslations: Record<GearCategory, string> = {
  helmets: "ДУУЛГА",
  apparel: "ХУВЦАС & ГУТАЛ",
  electronics: "ГЭРЭЛ & ЭЛЕКТРОНИК",
  accessories: "ДАГАЛДАХ ХЭРЭГСЭЛ",
};

export default function GearCatalog() {
  const { language, translate } = useLanguage();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<GearCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("all");

  const localized = (english: string, mongolian: string) => (language === "mn" ? mongolian : english);

  const visibleProducts = useMemo(() => {
    const filtered = gearProducts.filter(
      (product) => activeCategory === "all" || product.category === activeCategory,
    );

    if (sort === "price-asc") {
      return [...filtered].sort((a, b) => a.priceMnt - b.priceMnt);
    }

    if (sort === "new") {
      return [...filtered].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }

    return filtered;
  }, [activeCategory, sort]);

  const heroTitle = localized("GIANT COMPLETE CYCLING GEAR", "GIANT ИЖ БҮРЭН ДУГУЙН ХЭРЭГСЭЛ");

  const heroSubtitle =
    activeCategory === "all"
      ? localized("Gear for every ride", "Аялал бүрд тохирох хэрэгсэл")
      : language === "mn"
        ? categoryTranslations[activeCategory]
        : gearCategories.find((category) => category.id === activeCategory)?.en ?? "";

  return (
    <section aria-labelledby="gear-catalog-heading" className="gear-catalog">
      <div className="wrap">
        <div className="gear-catalog__heading">
          <div>
            <h2 id="gear-catalog-heading" className="type-title">
              {heroTitle}
            </h2>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 text-neutral-900 dark:text-neutral-100 mb-3">
              {localized("GIANT ESSENTIALS", "МЭРГЭЖЛИЙН ХЭРЭГСЭЛ")}
            </span>

            <p className="type-label">{heroSubtitle}</p>
          </div>

          <p className="gear-catalog__count">
            {visibleProducts.length} {localized("products", "бүтээгдэхүүн")}
          </p>
        </div>

        <div className="gear-catalog__toolbar">
          <div
            className="gear-tabs"
            role="tablist"
            aria-label={localized("Gear categories", "Хэрэгслийн ангилал")}
          >
            {gearCategories.map((category) => (
              <button
                key={category.id}
                id={`gear-tab-${category.id}`}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls="gear-products"
                className={`gear-tab${activeCategory === category.id ? " is-active" : ""}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {language === "mn" ? category.mn : category.en}
              </button>
            ))}
          </div>

          <label className="gear-sort">
            <span>{localized("Sort", "Эрэмбэлэх")}</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              aria-label={localized("Sort products", "Бүтээгдэхүүн эрэмбэлэх")}
            >
              <option value="price-asc">{localized("Price: Low to High", "Үнэ: Багаас их рүү")}</option>
              <option value="new">{localized("New collection", "Шинэ цуглуулга")}</option>
              <option value="all">{localized("All", "Бүгд")}</option>
            </select>
          </label>
        </div>

        <div
          id="gear-products"
          className="gear-product-grid"
          role="tabpanel"
          aria-labelledby={`gear-tab-${activeCategory}`}
        >
          {visibleProducts.map((product) => {
            const imageSrc = product.image;
            const href = `/gear/${product.slug}`;

            return (
              <article key={product.id} className="gear-product-card group">
                <Link
                  href={href}
                  aria-label={product.name}
                  className="gear-product-card__artwork relative flex h-56 w-full items-center justify-center overflow-hidden rounded-t-sm bg-white p-4"
                >
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.badge && <span className="gear-product-card__badge">{translate(product.badge)}</span>}
                </Link>

                <div className="gear-product-card__body">
                  <p className="gear-product-card__category">
                    {language === "mn"
                      ? categoryTranslations[product.category]
                      : gearCategories.find((category) => category.id === product.category)?.en}
                  </p>

                  <h3>
                    <Link href={href}>{product.name}</Link>
                  </h3>
                  <p className="gear-product-card__detail">{product.detail[language]}</p>

                  <p className="gear-product-card__price">
                    {language === "mn"
                      ? formatMnt(product.priceMnt)
                      : `$${product.priceUsd.toLocaleString("en-US", {
                          minimumFractionDigits: Number.isInteger(product.priceUsd) ? 0 : 2,
                          maximumFractionDigits: 2,
                        })}`}
                  </p>

                  <button
                    type="button"
                    className="gear-product-card__quick-add"
                    onClick={() =>
                      addToCart({
                        productId: product.id,
                        name: product.name,
                        image: imageSrc,
                        size: localized("One size", "Нэг хэмжээ"),
                        color: "#6B7280",
                        colorName: localized("Standard", "Стандарт"),
                        quantity: 1,
                        priceMnt: product.priceMnt,
                        priceUsd: product.priceUsd,
                      })
                    }
                  >
                    <ShoppingBag aria-hidden="true" />
                    {localized("QUICK ADD", "САГСАНД НЭМЭХ")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="gear-catalog__fine-print">
          {translate("Prices and product availability are subject to change.")}
        </p>
      </div>
    </section>
  );
}
