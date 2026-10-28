"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Ruler, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-provider";
import {
  gearCategories,
  gearDescriptionMn,
  getGearSizes,
  type GearProduct,
} from "@/data/gearData";
import { formatMnt } from "@/data/products";

export default function GearDetail({ product }: { product: GearProduct }) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const sizes = getGearSizes(product);
  const [size, setSize] = useState<string>(sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const mn = language === "mn";
  const localized = (en: string, mnText: string) => (mn ? mnText : en);
  const category = gearCategories.find((item) => item.id === product.category);

  const price = mn
    ? formatMnt(product.priceMnt)
    : `$${product.priceUsd.toLocaleString("en-US", {
        minimumFractionDigits: Number.isInteger(product.priceUsd) ? 0 : 2,
        maximumFractionDigits: 2,
      })}`;

  const description = mn
    ? gearDescriptionMn
    : `${product.detail.en} Check availability with Giant Mongolia.`;

  const isHelmet = product.category === "helmets";
  const isApparel = product.category === "apparel";

  const highlights = isHelmet
    ? [
        localized(
          "MIPS protection system for added head safety",
          "MIPS хамгаалалтын системтэй (Толгойн хамгаалалтыг сайжруулах шийдэл)",
        ),
        localized("Lightweight, well-ventilated construction", "Агаар сэлгэлт сайтай, жин багатай хийц"),
      ]
    : [
        localized("Quality Giant construction built for everyday rides", "Өдөр тутмын аялалд зориулсан Giant чанартай хийц"),
        localized("Practical design for comfort and reliability", "Тав тух, найдвартай байдлыг хангасан хэрэглээний шийдэл"),
      ];

  const sizeGuidance = isHelmet
    ? localized(
        "Choose by head circumference (S: 51-55cm, M: 55-59cm, L: 59-63cm)",
        "Толгойн тойргийн хэмжээг тохируулан сонгоно уу (S: 51-55cm, M: 55-59cm, L: 59-63cm)",
      )
    : isApparel
      ? localized("Choose the size that matches your body measurements", "Биеийн хэмжээндээ тохирсон размерыг сонгоно уу")
      : null;

  const sections = [
    { key: "highlights", Icon: Sparkles, title: localized("KEY HIGHLIGHTS", "ОНЦЛОХ ДАВУУ ТАЛ"), items: highlights },
    {
      key: "shipping",
      Icon: Truck,
      title: localized("SHIPPING & GUARANTEE", "ТЭЭВЭР БА БАТАЛГАА"),
      items: [
        localized("Delivery within Ulaanbaatar covered by Giant Mongolia", "Улаанбаатар хот дотор тээврийн зардлыг Giant Mongolia хариуцна"),
        localized("Official Giant warranty", "Giant албан ёсны баталгаат чанар"),
      ],
    },
    ...(sizeGuidance
      ? [{ key: "size", Icon: Ruler, title: localized("SIZE GUIDE", "ХЭМЖЭЭ СОНГОХ ЗААВАР"), items: [sizeGuidance] }]
      : []),
  ];

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: size || localized("One size", "Нэг хэмжээ"),
      color: "#6B7280",
      colorName: localized("Standard", "Стандарт"),
      quantity,
      priceMnt: product.priceMnt,
      priceUsd: product.priceUsd,
    });
  };

  return (
    <main className="section">
      <div className="wrap">
        <Link
          href="/gear"
          className="mb-6 inline-flex items-center gap-2 text-xs font-extrabold tracking-wide text-neutral-900 hover:text-[#000099] dark:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {localized("BACK TO GEAR", "ХЭРЭГСЭЛ РУУ БУЦАХ")}
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="product-gallery__stage relative overflow-hidden rounded-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="product-gallery__image object-contain p-8"
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="type-label">{mn ? category?.mn : category?.en}</p>
            <h1 className="type-headline">{product.name}</h1>
            <p className="text-2xl font-extrabold tabular-nums text-neutral-900 dark:text-white">{price}</p>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>

            {sizes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
                  {localized("Size", "Хэмжээ")}
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label={localized("Size", "Хэмжээ")}>
                  {sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={size === option}
                      onClick={() => setSize(option)}
                      className={`product-size-pill${size === option ? " is-active" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex w-full items-center gap-3">
              <div className="product-quantity flex h-14 shrink-0 items-center" role="group" aria-label={localized("Quantity", "Тоо ширхэг")}>
                <button
                  type="button"
                  aria-label={localized("Decrease quantity", "Тоо хасах")}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <Minus aria-hidden="true" />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  aria-label={localized("Increase quantity", "Тоо нэмэх")}
                  onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                className="product-add-to-cart flex h-14 min-h-0 w-full flex-1 items-center justify-center gap-2 font-extrabold tracking-wide"
                onClick={handleAdd}
              >
                <ShoppingBag className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="leading-none">{localized("ADD TO CART", "САГСАНД НЭМЭХ")}</span>
              </button>
            </div>

            <div className="mt-2 grid gap-3">
              {sections.map(({ key, Icon, title, items }) => (
                <section
                  key={key}
                  className="rounded-sm border border-neutral-200 p-4 dark:border-neutral-800"
                >
                  <h2 className="mb-2 flex items-center gap-2 text-xs font-extrabold tracking-wide text-neutral-900 dark:text-white">
                    <Icon className="h-4 w-4 shrink-0 text-[#000099] dark:text-blue-400" aria-hidden="true" />
                    {title}
                  </h2>
                  <ul className="grid gap-1.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                      >
                        <ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-[#000099] dark:text-blue-400" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
