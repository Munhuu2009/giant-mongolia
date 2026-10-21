"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

export default function ProductSizeSelector({
  sizes,
  productName,
}: {
  sizes: string[];
  productName: string;
}) {
  const { translate } = useLanguage();
  const [selected, setSelected] = useState(sizes[0] ?? "");

  return (
    <fieldset className="mt-8">
      <legend className="type-label">{translate("Select size")}</legend>
      <p className="sr-only">{translate(`Available sizes for ${productName}`)}</p>
      <div className="size-list">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setSelected(size)}
            aria-pressed={selected === size}
            className={`size-option${selected === size ? " is-selected" : ""}`}
          >
            {size}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
