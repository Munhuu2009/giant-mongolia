"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { formatMnt, type Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="product-card">
      <div className="product-card__media on-photo">
        <Image
          src={product.image}
          alt={`${product.name} ${product.category} bike`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="zoom"
        />
        {product.badge && <span className="chip chip-accent product-card__badge">{product.badge}</span>}
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`icon-btn icon-btn-glass product-card__save${saved ? " is-saved" : ""}`}
        >
          <Heart className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="product-card__body">
        <p className="type-label">{product.category}</p>
        <h3 className="type-title mt-1">{product.name}</h3>
        <p className="product-card__price">{formatMnt(product.priceMnt)}</p>

        <div>
          <p className="sr-only">Available sizes</p>
          <ul className="size-list">
            {product.sizes.map((size) => (
              <li key={size} className="size-chip">
                {size}
              </li>
            ))}
          </ul>
        </div>

        <ButtonLink href={product.href} variant="secondary" size="md" className="btn-block product-card__cta">
          View bike
          <span className="sr-only">{`: ${product.name}`}</span>
        </ButtonLink>
      </div>
    </article>
  );
}
