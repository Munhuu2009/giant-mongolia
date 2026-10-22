"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-provider";
import { formatUsdFromMnt, type Product } from "@/data/products";
import { store } from "@/data/store";

const standardSizes = ["XS", "S", "M", "M/L", "L", "XL"];
const specificationGroups = [/^frame$/i, /groupset/i, /wheel/i, /brake/i];
const riderHeights: Record<string, string> = {
  XS: "157–169 cm",
  S: "165–175 cm",
  M: "169–181 cm",
  "M/L": "177–187 cm",
  L: "183–193 cm",
  XL: "190–200 cm",
};

const colorways = [
  { name: "Charcoal", hex: "#17191D", filter: "grayscale(0.75) brightness(0.78)" },
  { name: "Blue", hex: "#000099", filter: "hue-rotate(15deg) saturate(1.25)" },
  { name: "Red", hex: "#D5222B", filter: "hue-rotate(135deg) saturate(1.15)" },
  { name: "White", hex: "#E7E8EA", filter: "grayscale(0.85) brightness(1.16)" },
];

const galleryViews = [
  { label: "Full bike", position: "50% 50%", scale: 1 },
  { label: "Frame detail", position: "38% 45%", scale: 1.35 },
  { label: "Rear detail", position: "72% 60%", scale: 1.35 },
];

function normalizedSize(size: string) {
  return size === "ML" ? "M/L" : size;
}

function productValue(product: Product, terms: RegExp[]) {
  return product.specs.find((spec) => terms.some((term) => term.test(spec.label)))?.value;
}

export default function ProductDetailExperience({ product }: { product: Product }) {
  const { language, translate } = useLanguage();
  const { addToCart } = useCart();
  const localized = (english: string, mongolian: string) =>
    language === "mn" ? mongolian : english;
  const availableSizes = new Set(product.sizes.map(normalizedSize));
  const sizeOptions = [
    ...standardSizes,
    ...product.sizes.map(normalizedSize).filter((size) => !standardSizes.includes(size)),
  ];
  const [selectedSize, setSelectedSize] = useState(
    sizeOptions.find((size) => availableSizes.has(size)) ?? "",
  );
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const colorway = colorways[selectedColor];
  const galleryImage = galleryViews[selectedImage];
  const price = language === "mn"
    ? `₮${product.priceMnt.toLocaleString("en-US")}`
    : formatUsdFromMnt(product.priceMnt);
  const technicalSpecifications = [
    {
      label: "Frame",
      value: productValue(product, [/^frame$/i]) ?? localized("Contact the store for details", "Дэлгүүртэй холбогдож мэдээлэл авна уу"),
    },
    {
      label: "Groupset",
      value: productValue(product, [/groupset/i]) ?? localized("Contact the store for details", "Дэлгүүртэй холбогдож мэдээлэл авна уу"),
    },
    {
      label: "Wheels",
      value: productValue(product, [/wheel/i]) ?? localized("Contact the store for details", "Дэлгүүртэй холбогдож мэдээлэл авна уу"),
    },
    {
      label: "Brakes",
      value: productValue(product, [/brake/i]) ?? localized("Contact the store for details", "Дэлгүүртэй холбогдож мэдээлэл авна уу"),
    },
  ];
  const additionalSpecifications = product.specs.filter(
    (spec) => !specificationGroups.some((group) => group.test(spec.label)),
  );

  return (
    <>
      <div className="product-detail-experience">
        <div className="product-gallery">
          <div className="product-gallery__stage">
            <Image
              key={`${colorway.name}-${selectedImage}`}
              src={product.image}
              alt={`${product.name} ${colorway.name} ${galleryImage.label}`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="product-gallery__image"
              style={{
                filter: colorway.filter,
                objectPosition: galleryImage.position,
                transform: `scale(${galleryImage.scale})`,
              }}
            />
            <span className="product-gallery__view-label">{galleryImage.label}</span>
          </div>
          <div
            className="product-gallery__thumbnails"
            role="group"
            aria-label={localized("Product image gallery", "Бүтээгдэхүүний зургийн цомог")}
          >
            {galleryViews.map((view, index) => (
              <button
                key={view.label}
                type="button"
                className={`product-gallery__thumbnail${selectedImage === index ? " is-selected" : ""}`}
                onClick={() => setSelectedImage(index)}
                aria-label={localized(`View ${view.label.toLowerCase()}`, `${view.label} харах`)}
                aria-pressed={selectedImage === index}
              >
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="100px"
                  className="product-gallery__thumbnail-image"
                  style={{
                    filter: colorway.filter,
                    objectPosition: view.position,
                    transform: `scale(${view.scale})`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <section className="product-detail__summary" aria-labelledby="product-title">
          <p className="type-label">{translate(product.category)}</p>
          <h1 id="product-title" className="type-headline mt-2">{product.name}</h1>
          <p className="product-detail__price">{price}</p>
          {language === "en" && (
            <p className="product-price-note">Estimated conversion from MNT</p>
          )}
          <p className="product-detail__copy">{translate(product.description)}</p>

          <fieldset className="product-colorways">
            <legend className="product-control-label">
              {localized("Color", "Өнгө")}: <span>{colorway.name}</span>
            </legend>
            <div className="product-colorways__list">
              {colorways.map((color, index) => (
                <button
                  key={color.name}
                  type="button"
                  className={`product-colorways__swatch${selectedColor === index ? " is-selected" : ""}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => {
                    setSelectedColor(index);
                    setSelectedImage(0);
                  }}
                  aria-label={localized(`${color.name} color`, `${color.name} өнгө`)}
                  aria-pressed={selectedColor === index}
                  title={`${color.name} · ${color.hex}`}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="product-sizes">
            <legend className="product-control-label">
              {localized("Select size", "Хэмжээ сонгох")}
              <span className="product-sizes__guide">
                <a href="#size-guide">{localized("Size Guide", "Хэмжээний заавар")}</a>
              </span>
            </legend>
            <div className="product-sizes__list">
              {sizeOptions.map((size) => {
                const inStock = availableSizes.has(size);
                return (
                  <button
                    key={size}
                    type="button"
                    className={`product-size-pill${selectedSize === size ? " is-selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                    disabled={!inStock}
                    aria-pressed={selectedSize === size}
                    aria-label={`${size}${inStock ? "" : `, ${localized("out of stock", "дууссан")}`}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            {selectedSize && !availableSizes.has(selectedSize) && (
              <p className="product-sizes__stock-note">
                {localized("This size is currently out of stock.", "Энэ хэмжээ одоогоор дууссан байна.")}
              </p>
            )}
          </fieldset>

          <details id="size-guide" className="product-accordion product-size-guide">
            <summary>{localized("Size Guide", "Хэмжээний заавар")}</summary>
            <p className="product-accordion__intro">
              {localized(
                "Use these height ranges as a starting point. A professional fitting is recommended.",
                "Эдгээр өндрийн хэмжээг эхний баримжаа болгон ашиглана уу. Мэргэжлийн дугуйн тохиргоо хийлгэхийг зөвлөж байна.",
              )}
            </p>
            <div className="product-chart-scroll">
              <table className="product-chart">
                <thead>
                  <tr>
                    <th scope="col">{localized("Size", "Хэмжээ")}</th>
                    <th scope="col">{localized("Rider height", "Унаачийн өндөр")}</th>
                    <th scope="col">{localized("Availability", "Бэлэн эсэх")}</th>
                  </tr>
                </thead>
                <tbody>
                  {standardSizes.map((size) => (
                    <tr key={size}>
                      <th scope="row">{size}</th>
                      <td>{riderHeights[size]}</td>
                      <td>{availableSizes.has(size) ? localized("In stock", "Бэлэн") : localized("Out of stock", "Дууссан")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <div className="product-detail__actions">
            <a className="product-test-ride" href="/contact">
              {localized("TEST RIDE AT FLAGSHIP STORE", "ТӨВ ДЭЛГҮҮРТ ТУРШИЖ ҮЗЭХ")}
            </a>
            <a className="product-store-contact" href={`tel:${store.phone.replace(/\s/g, "")}`}>
              {localized("Questions? Call", "Лавлах утас")}: {store.phone}
            </a>
          </div>
        </section>

        <div className="product-detail__accordions">
          <details className="product-accordion" open>
            <summary>{localized("Technical Specifications", "Техникийн үзүүлэлт")}</summary>
            <dl className="spec-table">
              {technicalSpecifications.map((spec) => (
                <div key={spec.label} className="spec-row">
                  <dt>{localized(
                    spec.label,
                    ({ Frame: "Рам", Groupset: "Арааны систем", Wheels: "Дугуй", Brakes: "Тоормос" } as Record<string, string>)[spec.label],
                  )}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
            {additionalSpecifications.length > 0 && (
              <dl className="spec-table product-additional-specs">
                {additionalSpecifications.map((spec) => (
                    <div key={spec.label} className="spec-row">
                      <dt>{translate(spec.label)}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                ))}
              </dl>
            )}
          </details>
          <details className="product-accordion">
            <summary>{localized("Geometry Chart", "Геометрийн хүснэгт")}</summary>
            <p className="product-accordion__intro">
              {localized(
                "Rider height is a general sizing reference. Exact frame geometry varies by model and size; contact the store for this bike’s official geometry chart.",
                "Унаачийн өндөр нь ерөнхий хэмжээг сонгох баримжаа болно. Рамын геометр загвар, хэмжээнээс хамаарч өөр тул албан ёсны хүснэгтийг дэлгүүрээс авна уу.",
              )}
            </p>
            <div className="product-chart-scroll">
              <table className="product-chart">
                <thead>
                  <tr>
                    <th scope="col">{localized("Frame size", "Рамын хэмжээ")}</th>
                    <th scope="col">{localized("Recommended rider height", "Унаачийн санал болгох өндөр")}</th>
                    <th scope="col">{localized("Availability", "Бэлэн эсэх")}</th>
                  </tr>
                </thead>
                <tbody>
                  {standardSizes.map((size) => (
                    <tr key={size}>
                      <th scope="row">{size}</th>
                      <td>{riderHeights[size]}</td>
                      <td>{availableSizes.has(size) ? localized("In stock", "Бэлэн") : localized("Out of stock", "Дууссан")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>

      <div className="product-sticky-cart">
        <div className="product-sticky-cart__inner">
          <div className="product-sticky-cart__product">
            <strong>{product.name}</strong>
            <span>
              {price}
              {selectedSize ? ` · ${localized("Size", "Хэмжээ")}: ${selectedSize}` : ""}
            </span>
          </div>
          <div className="product-quantity" aria-label={localized("Quantity", "Тоо ширхэг")}>
            <button
              type="button"
              aria-label={localized("Decrease quantity", "Тоо ширхэг хасах")}
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity <= 1}
            >
              <Minus aria-hidden="true" />
            </button>
            <output aria-live="polite">{quantity}</output>
            <button
              type="button"
              aria-label={localized("Increase quantity", "Тоо ширхэг нэмэх")}
              onClick={() => setQuantity((value) => Math.min(10, value + 1))}
              disabled={quantity >= 10}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
          <motion.button
            type="button"
            className="product-add-to-cart"
            disabled={!selectedSize}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => addToCart({
              productId: product.id,
              name: product.name,
              image: product.image,
              size: selectedSize,
              color: colorway.hex,
              colorName: colorway.name,
              quantity,
              priceMnt: product.priceMnt,
            })}
          >
            {localized("ADD TO CART", "САГСАНД НЭМЭХ")}
          </motion.button>
        </div>
      </div>
      <div className="product-cart-spacer" aria-hidden="true" />
    </>
  );
}
