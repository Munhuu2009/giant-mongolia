"use client";

import { useMemo, useState } from "react";
import { Backpack, Footprints, Lightbulb, Shirt, ShieldCheck, ShoppingBag, Wrench } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-provider";
import { gearCategories, gearProducts, type GearArtwork, type GearCategory } from "@/data/gearData";
import { formatMnt } from "@/data/products";

type SortOption = "all" | "price-asc" | "new";

const categoryIcons: Record<GearArtwork, typeof ShoppingBag> = {
  helmet: ShieldCheck,
  apparel: Shirt,
  shoes: Footprints,
  light: Lightbulb,
  pump: Wrench,
  bag: Backpack,
};

const categoryTranslations: Record<GearCategory, string> = {
  helmets: "Дуулга",
  apparel: "Хувцас & гутал",
  electronics: "Гэрэл & электроник",
  accessories: "Дагалдах хэрэгсэл",
};

export default function GearCatalog() {
  const { language, translate } = useLanguage();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<GearCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("all");
  const localized = (english: string, mongolian: string) =>
    language === "mn" ? mongolian : english;

  const visibleProducts = useMemo(() => {
    const filtered = gearProducts.filter(
      (product) => activeCategory === "all" || product.category === activeCategory,
    );
    if (sort === "price-asc") {
      return [...filtered].sort((a, b) => a.priceMnt - b.priceMnt);
    }
    if (sort === "new") {
      return [...filtered].sort(
        (a, b) => Number(b.isNew) - Number(a.isNew),
      );
    }
    return filtered;
  }, [activeCategory, sort]);

  return (
    <section aria-labelledby="gear-catalog-heading" className="gear-catalog">
      <div className="wrap">
        <div className="gear-catalog__toolbar">
          <div className="gear-tabs" role="tablist" aria-label={localized("Gear categories", "Хэрэгслийн ангилал")}>
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

        <div className="gear-catalog__heading">
          <div>
            <p className="type-label">{localized("GIANT PERFORMANCE GEAR", "GIANT ГҮЙЦЭТГЭЛИЙН ХЭРЭГСЭЛ")}</p>
            <h2 id="gear-catalog-heading" className="type-title">
              {activeCategory === "all"
                ? localized("Gear for every ride", "Аялал бүрд тохирох хэрэгсэл")
                : language === "mn"
                  ? categoryTranslations[activeCategory]
                  : gearCategories.find((category) => category.id === activeCategory)?.en}
            </h2>
          </div>
          <p className="gear-catalog__count">
            {visibleProducts.length} {localized("products", "бүтээгдэхүүн")}
          </p>
        </div>

        <div
          id="gear-products"
          className="gear-product-grid"
          role="tabpanel"
          aria-labelledby={`gear-tab-${activeCategory}`}
        >
          {visibleProducts.map((product) => {
            const Icon = categoryIcons[product.artwork];
            return (
              <article key={product.id} className="gear-product-card">
                <div className={`gear-product-card__artwork gear-product-card__artwork--${product.artwork}`}>
                  {product.badge && (
                    <span className="gear-product-card__badge">{translate(product.badge)}</span>
                  )}
                  <Icon aria-hidden="true" className="gear-product-card__icon" strokeWidth={1.2} />
                  <span className="gear-product-card__wordmark">GIANT</span>
                </div>
                <div className="gear-product-card__body">
                  <p className="gear-product-card__category">
                    {language === "mn"
                      ? categoryTranslations[product.category]
                      : gearCategories.find((category) => category.id === product.category)?.en}
                  </p>
                  <h3>{product.name}</h3>
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
                    onClick={() => addToCart({
                      productId: product.id,
                      name: product.name,
                      image: "",
                      size: localized("One size", "Нэг хэмжээ"),
                      color: "#6B7280",
                      colorName: localized("Standard", "Стандарт"),
                      quantity: 1,
                      priceMnt: product.priceMnt,
                      priceUsd: product.priceUsd,
                    })}
                  >
                    <ShoppingBag aria-hidden="true" />
                    {localized("QUICK ADD", "САГСАНД НЭМЭХ")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="gear-catalog__fine-print">{translate("Prices and product availability are subject to change.")}</p>
      </div>
    </section>
  );
}
