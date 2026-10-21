"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/logo";
import SearchDialog from "@/components/search-dialog";
import SiteNavLinks from "@/components/site-nav-links";
import ThemeToggle from "@/components/theme-toggle";
import { navItems } from "@/data/navigation";

function NavFallback({ mobile = false }: { mobile?: boolean }) {
  return (
    <ul>
      {navItems.map((item) => (
        <li key={item.label}>
          <Link href={item.href} className={mobile ? undefined : "nav-link"}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap site-header__bar">
        <Link href="/" aria-label="Giant Mongolia home" className="site-header__logo" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="site-nav">
          <Suspense fallback={<NavFallback />}>
            <SiteNavLinks />
          </Suspense>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchButtonRef}
            type="button"
            aria-label="Search"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            aria-controls="search-dialog"
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Cart, 0 items" className="icon-btn">
            <ShoppingBag className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="icon-btn site-header__menu"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="mobile-menu">
          <Suspense fallback={<NavFallback mobile />}>
            <SiteNavLinks mobile onNavigate={() => setOpen(false)} />
          </Suspense>
        </nav>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} triggerRef={searchButtonRef} />
    </header>
  );
}
