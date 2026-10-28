"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ButtonLink } from "@/components/ui/Button";
import { formatMnt, type Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "featured";
  promotionBadge?: "New" | "Best Seller";
};

export default function ProductCard({
  product,
  variant = "default",
  promotionBadge,
}: ProductCardProps) {
  const { language, translate } = useLanguage();
  const isFeatured = variant === "featured";

  return (
    <article
      className={`product-card${isFeatured ? " product-card--featured group border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-[#000099] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#000099]" : ""}`}
    >
      <div
        className={`product-card__media on-photo${isFeatured ? " rounded-sm bg-white p-4" : ""}`}
      >
        {isFeatured ? (
          <div className="absolute inset-4">
            <Image
              src={product.image}
              alt={
                language === "mn"
                  ? `${product.name} ${translate(product.category)} дугуй`
                  : `${product.name} ${product.category} bike`
              }
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="zoom object-contain"
            />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={
              language === "mn"
                ? `${product.name} ${translate(product.category)} дугуй`
                : `${product.name} ${product.category} bike`
            }
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="zoom"
          />
        )}
        {isFeatured
          ? promotionBadge && (
              <span
                className={`product-card__badge product-card__promotion-badge product-card__promotion-badge--${promotionBadge
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {translate(promotionBadge)}
              </span>
            )
          : product.badge && (
              <span className="chip chip-accent product-card__badge">{translate(product.badge)}</span>
            )}
      </div>

      <div className="product-card__body">
        <p className={`type-label${isFeatured ? " text-neutral-500 dark:text-neutral-400" : ""}`}>
          {translate(product.category)}
        </p>
        <h3 className={`type-title mt-1${isFeatured ? " font-bold text-neutral-900 dark:text-white" : ""}`}>
          {product.name}
        </h3>
        <p className={`product-card__price${isFeatured ? " text-lg font-extrabold text-neutral-900 dark:text-white" : ""}`}>
          {product.priceUsd !== undefined && language === "en"
            ? `$${product.priceUsd.toLocaleString("en-US")}`
            : formatMnt(product.priceMnt)}
        </p>

        <div>
          <p className="sr-only">{translate("Available sizes")}</p>
          <ul className="size-list">
            {product.sizes.map((size) => (
              <li
                key={size}
                className={`size-chip${isFeatured ? " bg-neutral-100 text-neutral-700 hover:bg-[#000099] hover:text-white dark:bg-neutral-800 dark:text-neutral-300" : ""}`}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>

        {isFeatured ? (
          <motion.div
            className="product-card__learn-more-wrap"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={product.href}
              className="product-card__learn-more text-neutral-900 transition-colors dark:text-white group-hover:text-[#000099] dark:group-hover:text-blue-400"
            >
              {translate("Learn more")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{`: ${product.name}`}</span>
            </Link>
          </motion.div>
        ) : (
          <ButtonLink href={product.href} variant="secondary" size="md" className="btn-block product-card__cta">
            {translate("View bike")}
            <span className="sr-only">{`: ${product.name}`}</span>
          </ButtonLink>
        )}
      </div>
    </article>
  );
}
