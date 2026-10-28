"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  ArrowUpRight,
  Baby,
  Bike,
  Building2,
  ChevronDown,
  LayoutGrid,
  Menu,
  Mountain,
  Route,
  Search,
  ShoppingBag,
  UserRound,
  X,
  Zap,
} from "lucide-react";
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

const bikeMenu = [
  { id: "all", href: "/bikes", en: "All Bikes", mn: "Бүгд", icon: LayoutGrid },
  { id: "road", href: "/bikes?category=road", en: "Road", mn: "Замын", icon: Bike },
  { id: "gravel", href: "/bikes?category=gravel", en: "Gravel", mn: "Гравел", icon: Route },
  { id: "mountain", href: "/bikes?category=mountain", en: "Mountain", mn: "Уулын", icon: Mountain },
  { id: "ebike", href: "/bikes?category=ebike", en: "E-Bikes", mn: "Цахилгаан", icon: Zap },
  { id: "city", href: "/bikes?category=city", en: "City & Touring", mn: "Хотын", icon: Building2 },
  { id: "kids", href: "/bikes?category=kids", en: "Kids", mn: "Хүүхдийн", icon: Baby },
] as const;

export default function SiteHeader() {
  const { language, setLanguage, t, translate } = useLanguage();
  const { items, openCart } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [bikesOpen, setBikesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const bikesTriggerRef = useRef<HTMLElement | null>(null);
  const bikesCloseRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  function openBikes(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    bikesTriggerRef.current = event.currentTarget;
    setOpen(false);
    setBikesOpen(true);
  }

  function closeBikes() {
    setBikesOpen(false);
    bikesTriggerRef.current?.focus();
  }

  useEffect(() => {
    setBikesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!bikesOpen) return;
    const root = document.documentElement;
    root.classList.add("site-drawer-lock");
    bikesCloseRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBikesOpen(false);
        bikesTriggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.classList.remove("site-drawer-lock");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [bikesOpen]);

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
              {primaryLinks.map((link) => {
                const isBikes = link.key === "nav.bikes";
                const active =
                  pathname === link.href || (link.href === "/bikes" && pathname.startsWith("/bikes"));
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={`nav-link${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup={isBikes ? "dialog" : undefined}
                    aria-expanded={isBikes ? bikesOpen : undefined}
                    aria-controls={isBikes ? "bikes-drawer" : undefined}
                    onClick={isBikes ? openBikes : undefined}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
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
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all max-sm:px-3 ${
                overlay
                  ? "bg-white/15 text-white hover:bg-white/25"
                  : "bg-neutral-200/60 text-neutral-700 hover:bg-neutral-300/60 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:bg-neutral-700/80"
              }`}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              <span className="max-sm:hidden">SEARCH</span>
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
                  <Link
                    href={link.href}
                    onClick={link.key === "nav.bikes" ? openBikes : closeDrawer}
                  >
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

      <div
        className={`fixed inset-0 z-[100] transition-[visibility] duration-300 ${
          bikesOpen ? "visible" : "pointer-events-none invisible"
        }`}
        aria-hidden={!bikesOpen}
        inert={!bikesOpen}
      >
        <button
          type="button"
          aria-label={language === "mn" ? "Дугуйн цэсийг хаах" : "Close bikes menu"}
          tabIndex={bikesOpen ? 0 : -1}
          onClick={closeBikes}
          className={`absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            bikesOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          id="bikes-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bikes-drawer-title"
          className={`absolute inset-y-0 left-0 flex w-[min(24rem,88vw)] flex-col overflow-y-auto border-r border-neutral-200 bg-white text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/10 dark:bg-[#0b0f17] dark:text-neutral-100 ${
            bikesOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-6 py-5 dark:border-white/10">
            <h2
              id="bikes-drawer-title"
              className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400"
            >
              {t("nav.bikes")}
            </h2>
            <button
              ref={bikesCloseRef}
              type="button"
              aria-label={language === "mn" ? "Дугуйн цэсийг хаах" : "Close bikes menu"}
              onClick={closeBikes}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200/60 text-neutral-700 outline-none transition-colors hover:bg-neutral-300/60 focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:bg-neutral-700/80"
            >
              <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t("nav.bikes")} className="flex-1 px-3 py-4">
            <ul className="flex flex-col gap-1">
              {bikeMenu.map((item) => {
                const Icon = item.icon;
                const label = language === "mn" ? item.mn : item.en;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setBikesOpen(false)}
                      className="group flex min-h-14 items-center gap-4 rounded-2xl px-3 py-2 outline-none transition-colors duration-150 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:bg-white/5 dark:text-neutral-300 dark:group-hover:bg-blue-400/15 dark:group-hover:text-blue-300">
                        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1 text-base font-bold leading-tight">{label}</span>
                      <ArrowUpRight
                        className="h-4 w-4 flex-none -translate-x-1 text-neutral-400 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} triggerRef={searchButtonRef} />
    </>
  );
}
