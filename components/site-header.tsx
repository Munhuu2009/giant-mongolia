"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Logo from "@/components/logo";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-provider";
import SearchDialog from "@/components/search-dialog";
import ThemeToggle from "@/components/theme-toggle";

const primaryLinks = [
  { key: "nav.bikes", href: "/bikes" },
  { key: "nav.gear", href: "/gear" },
  { key: "nav.technology", href: "/technology" },
  { key: "nav.stores", href: "/stores" },
] as const;

export default function SiteHeader() {
  const { language, setLanguage, t, translate } = useLanguage();
  const { items, openCart } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("site-drawer-lock");
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      root.classList.remove("site-drawer-lock");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const overlay = pathname === "/" && !scrolled;

  function closeDrawer() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <>
      <header className={`site-header${overlay ? " site-header--overlay" : ""}${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="site-header__bar">
          <div className="site-header__left">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={open}
              aria-controls="site-drawer"
              className="site-header__menu-button"
              onClick={() => setOpen((value) => !value)}
            >
              <Menu className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <nav aria-label={t("nav.primary")} className="site-nav">
              {primaryLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`nav-link${pathname === link.href || (link.href === "/bikes" && pathname.startsWith("/bikes")) ? " is-active" : ""}`}
                  aria-current={pathname === link.href || (link.href === "/bikes" && pathname.startsWith("/bikes")) ? "page" : undefined}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-header__center">
            <Link href="/" aria-label={translate("Giant Mongolia home")} className="site-header__brand">
              <Logo className="w-auto" inverted={overlay} />
            </Link>
          </div>

          <div className="site-header__actions">
            <button
              ref={searchButtonRef}
              type="button"
              aria-label={t("nav.search")}
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              aria-controls="search-dialog"
              className="site-header__utility"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`${t("nav.cart")} (${cartCount})`}
              aria-haspopup="dialog"
              className="site-header__utility"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              {items.length > 0 && (
                <span className="site-header__cart-count" aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </button>
            <button type="button" aria-label={t("nav.account")} className="site-header__utility">
              <UserRound className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="site-language-toggle" role="group" aria-label={t("language.label")}>
              {(["en", "mn"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-label={t(option === "en" ? "language.english" : "language.mongolian")}
                  aria-pressed={language === option}
                  onClick={() => setLanguage(option)}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>

      </header>

      <div className={`site-drawer-layer${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <button
          type="button"
          className="site-drawer-backdrop"
          aria-label={t("nav.closeMenu")}
          tabIndex={open ? 0 : -1}
          onClick={closeDrawer}
        />
        <aside
          ref={drawerRef}
          id="site-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.siteMenu")}
          className="site-drawer"
        >
          <div className="site-drawer__head">
            <Link href="/" aria-label={translate("Giant Mongolia home")} onClick={() => setOpen(false)}>
              <Logo className="site-drawer__logo w-auto" />
            </Link>
            <div className="site-drawer__head-actions">
              <div className="site-drawer__theme">
                <ThemeToggle />
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={t("nav.closeMenu")}
                className="site-drawer__close"
                onClick={closeDrawer}
              >
                <X className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav aria-label={t("nav.menu")}>
            <ul className="site-drawer__links">
              {primaryLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} onClick={closeDrawer}>
                    {t(link.key)}
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  aria-expanded={marketOpen}
                  className="site-drawer__market"
                  onClick={() => setMarketOpen((value) => !value)}
                >
                  {t("nav.selectMarket")}
                  <ChevronDown
                    className={`h-5 w-5${marketOpen ? " is-open" : ""}`}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
                {marketOpen && (
                  <div className="site-drawer__markets">
                    <span aria-current="true">{t("nav.mongolia")}</span>
                    <a href="https://www.giant-bicycles.com/global" target="_blank" rel="noreferrer">
                      {t("nav.global")}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className="site-drawer__brands">
            <p className="site-drawer__eyebrow">{t("nav.moreWays")}</p>
            <a href="https://www.liv-cycling.com" target="_blank" rel="noreferrer">
              <span>Liv</span>
              <small>{t("nav.forWomen")}</small>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="https://www.momentum-biking.com" target="_blank" rel="noreferrer">
              <span>Momentum</span>
              <small>{t("nav.forCity")}</small>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="https://dynamiccyclingfit.com" target="_blank" rel="noreferrer">
              <span>Dynamic Cycling Fit</span>
              <small>{t("nav.forFit")}</small>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} triggerRef={searchButtonRef} />
    </>
  );
}
