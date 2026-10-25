"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { bikeCategories, bikesData, type BikeCategory } from "@/data/bikesData";
import { formatMnt, formatUsdFromMnt } from "@/data/products";

type BikeCatalogProps = {
  initialCategory: BikeCategory | "all";
};

export default function BikeCatalog({ initialCategory }: BikeCatalogProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<BikeCategory | "all">(initialCategory);
  const filteredBikes =
    activeCategory === "all"
      ? bikesData
      : bikesData.filter((bike) => bike.categoryId === activeCategory);

  return (
    <>
      <nav
        aria-label={language === "mn" ? "Дугуйн ангилал" : "Bike categories"}
        className="bike-category-nav sticky z-20 border-y border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95"
        style={{ top: "var(--header-height)" }}
      >
        <div className="wrap flex gap-2 overflow-x-auto py-3">
          {bikeCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 rounded-sm border px-4 py-2 text-xs font-bold tracking-wide transition-colors ${
                activeCategory === category.id
                  ? "border-[#000099] bg-[#000099] text-white"
                  : "border-neutral-300 bg-transparent text-neutral-700 hover:border-[#000099] hover:text-[#000099] dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-blue-400"
              }`}
            >
              {language === "mn" ? category.labelMn : category.label}
            </button>
          ))}
        </div>
      </nav>

      <section aria-label={language === "mn" ? "Giant дугуйнууд" : "Giant bicycles"} className="section">
        <div className="wrap">
          <p className="mb-5 text-sm text-neutral-600 dark:text-neutral-400" aria-live="polite">
            {language === "mn"
              ? `${filteredBikes.length} дугуй`
              : `${filteredBikes.length} ${filteredBikes.length === 1 ? "bike" : "bikes"}`}
          </p>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBikes.map((bike) => (
              <li key={bike.id} className="min-w-0">
                <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-neutral-200 bg-white p-4 shadow-sm transition-colors hover:border-[#000099] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#000099]">
                  <Link
                    href={`/bikes/${bike.slug}`}
                    className="relative mb-4 block aspect-[11/8] overflow-hidden rounded-sm bg-[#F2F4F7] p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000099] dark:bg-neutral-800"
                    aria-label={`${language === "mn" ? "Дугуй үзэх" : "View"}: ${bike.name}`}
                  >
                    <Image
                      src={bike.image}
                      alt={bike.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    />
                    {bike.badge && (
                      <span className="absolute left-2 top-2 rounded-sm bg-[#000099] px-2 py-1 text-[0.625rem] font-bold uppercase tracking-wide text-white">
                        {bike.badge === "new"
                          ? language === "mn"
                            ? "ШИНЭ"
                            : "NEW"
                          : bike.badge === "ebike"
                            ? language === "mn"
                              ? "ЦАХИЛГААН ДУГУЙ"
                              : "E-BIKE"
                            : bike.badge === "best-seller"
                              ? language === "mn"
                                ? "ЭРЭЛТТЭЙ"
                                : "BEST SELLER"
                              : language === "mn"
                                ? "ХҮҮХДИЙН"
                                : "KIDS"}
                      </span>
                    )}
                  </Link>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    {language === "mn" ? bike.categoryMn : bike.category}
                  </p>
                  <h2 className="text-base font-black uppercase leading-snug text-neutral-900 dark:text-white">
                    {bike.name}
                  </h2>
                  <p className="mt-2 text-lg font-extrabold tabular-nums text-neutral-900 dark:text-white">
                    {language === "mn"
                      ? formatMnt(bike.priceMnt)
                      : bike.priceUsd !== undefined
                        ? `$${bike.priceUsd.toLocaleString("en-US")}`
                        : formatUsdFromMnt(bike.priceMnt)}
                  </p>
                  {bike.colorways && (
                    <ul
                      className="mt-3 flex flex-wrap gap-2"
                      aria-label={language === "mn" ? "Өнгөний сонголтууд" : "Available colors"}
                    >
                      {bike.colorways.map((color) => (
                        <li key={color.name}>
                          <span
                            className="block h-4 w-4 rounded-full border border-neutral-300 dark:border-neutral-600"
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} · ${color.hex}`}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  <div
                    className="mt-4 flex flex-wrap gap-2"
                    role="group"
                    aria-label={language === "mn" ? "Хэмжээ" : "Sizes"}
                  >
                    {bike.sizes.map((size) => (
                      <span
                        key={size}
                        className="whitespace-nowrap rounded-sm bg-neutral-100 px-2.5 py-1 text-xs font-bold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/bikes/${bike.slug}`}
                    className="mt-auto flex items-center justify-between gap-2 pt-5 text-xs font-extrabold tracking-wide text-neutral-900 transition-colors hover:text-[#000099] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000099] dark:text-white dark:hover:text-blue-400"
                  >
                    {language === "mn" ? "ДУГУЙ ҮЗЭХ" : "VIEW BIKE"}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
