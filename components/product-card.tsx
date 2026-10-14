"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { formatMnt, type Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group flex h-full flex-col bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={`${product.name} ${product.category} bike`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-0 top-4 bg-neutral-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center bg-white text-neutral-900 transition-colors hover:text-accent"
        >
          <Heart className={`h-5 w-5 ${saved ? "fill-accent text-accent" : ""}`} strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600">{product.category}</p>
        <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-neutral-900">{product.name}</h3>
        <p className="mt-2 text-lg font-semibold tabular-nums text-neutral-900">{formatMnt(product.priceMnt)}</p>

        <div className="mt-4">
          <p className="sr-only">Available sizes</p>
          <ul className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <li
                key={size}
                className="flex h-8 min-w-8 items-center justify-center border border-neutral-200 px-2 text-xs font-semibold text-neutral-600"
              >
                {size}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={product.href}
          className="mt-6 inline-flex h-12 items-center justify-center bg-neutral-900 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent md:mt-auto"
        >
          View Bike
          <span className="sr-only">{`: ${product.name}`}</span>
        </Link>
      </div>
    </article>
  );
}
