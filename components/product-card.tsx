"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
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
  const [saved, setSaved] = useState(false);
  const isFeatured = variant === "featured";
  const saveLabel = saved
    ? `Remove ${product.name} from wishlist`
    : `Save ${product.name} to wishlist`;

  return (
    <article className={`product-card${isFeatured ? " product-card--featured" : ""}`}>
      <div className="product-card__media on-photo">
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
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={translate(saveLabel)}
          className={`icon-btn icon-btn-glass product-card__save${saved ? " is-saved" : ""}`}
        >
          <Heart className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="product-card__body">
        <p className="type-label">{translate(product.category)}</p>
        <h3 className="type-title mt-1">{product.name}</h3>
        <p className="product-card__price">{formatMnt(product.priceMnt)}</p>

        <div>
          <p className="sr-only">{translate("Available sizes")}</p>
          <ul className="size-list">
            {product.sizes.map((size) => (
              <li key={size} className="size-chip">
                {size}
              </li>
            ))}
          </ul>
        </div>

        {isFeatured ? (
          <Link href={product.href} className="product-card__learn-more">
            {translate("Learn more")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{`: ${product.name}`}</span>
          </Link>
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
