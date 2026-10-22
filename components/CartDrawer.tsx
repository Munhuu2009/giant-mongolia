"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-provider";
import { formatUsdFromMnt } from "@/data/products";

function formatPrice(priceMnt: number, language: "en" | "mn", priceUsd?: number) {
  if (language === "mn") return `₮${priceMnt.toLocaleString("en-US")}`;
  if (priceUsd !== undefined) {
    return `$${priceUsd.toLocaleString("en-US", {
      minimumFractionDigits: Number.isInteger(priceUsd) ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return formatUsdFromMnt(priceMnt);
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const { language } = useLanguage();
  const localized = (english: string, mongolian: string) =>
    language === "mn" ? mongolian : english;
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + (language === "mn"
      ? item.priceMnt * item.quantity
      : (item.priceUsd ?? item.priceMnt / 3500) * item.quantity),
    0,
  );
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
        return;
      }
      if (event.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-layer">
      <button
        type="button"
        className="cart-drawer-backdrop"
        aria-label={localized("Close cart", "Сагс хаах")}
        onClick={closeCart}
      />
      <aside
        ref={drawerRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header className="cart-drawer__header">
          <div>
            <p className="cart-drawer__eyebrow">{localized("YOUR SELECTION", "ТАНЫ СОНГОЛТ")}</p>
            <h2 id="cart-drawer-title">{localized("Shopping cart", "Сагс")} ({itemCount})</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label={localized("Close cart", "Сагс хаах")}
          >
            <X aria-hidden="true" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag aria-hidden="true" />
            <p>{localized("Your cart is empty.", "Таны сагс хоосон байна.")}</p>
            <button type="button" className="cart-drawer__continue" onClick={closeCart}>
              {localized("Continue shopping", "Дэлгүүр хэсэх")}
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.key} className="cart-line">
                  <div className="cart-line__image">
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="96px" />
                    ) : (
                      <ShoppingBag aria-hidden="true" />
                    )}
                  </div>
                  <div className="cart-line__details">
                    <h3>{item.name}</h3>
                    <p>{localized("Size", "Хэмжээ")}: {item.size}</p>
                    <p className="cart-line__color">
                      <span style={{ backgroundColor: item.color }} aria-hidden="true" />
                      {item.colorName}
                    </p>
                    <strong>{formatPrice(item.priceMnt, language, item.priceUsd)}</strong>
                    <div className="cart-line__controls">
                      <div className="cart-line__quantity">
                        <button
                          type="button"
                          aria-label={localized("Decrease quantity", "Тоо ширхэг хасах")}
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        >
                          <Minus aria-hidden="true" />
                        </button>
                        <output aria-live="polite">{item.quantity}</output>
                        <button
                          type="button"
                          aria-label={localized("Increase quantity", "Тоо ширхэг нэмэх")}
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        >
                          <Plus aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-line__remove"
                        onClick={() => removeFromCart(item.key)}
                        aria-label={localized(`Remove ${item.name} from cart`, `${item.name} сагснаас хасах`)}
                      >
                        <Trash2 aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>{localized("Subtotal", "Дүн")}</span>
                <strong>
                  {language === "mn"
                    ? formatPrice(subtotal, language)
                    : `$${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </strong>
              </div>
              <p>{localized("Shipping and taxes calculated at checkout.", "Хүргэлт болон татварыг захиалга батлах үед тооцно.")}</p>
              <a href="/contact" className="cart-drawer__checkout">
                {localized("CONTACT STORE TO ORDER", "ЗАХИАЛГА ӨГӨХӨӨР ДЭЛГҮҮРТЭЙ ХОЛБОГДОХ")}
              </a>
              <button type="button" className="cart-drawer__continue" onClick={closeCart}>
                {localized("Continue shopping", "Дэлгүүр хэсэх")}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
