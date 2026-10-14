"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Search } from "lucide-react";
import CartDrawer from "@/components/cart-drawer";
import AddedToBagNotice from "@/components/header/added-to-bag-notice";
import CartButton from "@/components/header/cart-button";
import DesktopNav from "@/components/header/desktop-nav";
import MobileDrawer from "@/components/header/mobile-drawer";
import SearchPanel from "@/components/header/search-panel";
import Logo from "@/components/logo";
import { IconButton } from "@/components/ui/Button";
import { cn, easeExit } from "@/lib/cn";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export default function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 8, () => false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  const overlayOpen = activeMenu !== null || searchOpen;

  useEffect(() => {
    if (!overlayOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (activeMenu) {
        const trigger = document.getElementById(`nav-trigger-${activeMenu}`);
        if (headerRef.current?.contains(document.activeElement)) trigger?.focus();
        setActiveMenu(null);
      }
      if (searchOpen) {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [overlayOpen, activeMenu, searchOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setActiveMenu(null);
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b text-white transition-[background-color,border-color] duration-300 ease-snappy",
          scrolled || overlayOpen ? "border-white/10 bg-ink/90 backdrop-blur-md" : "border-white/[0.06] bg-ink",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-stretch px-4 md:px-8">
          <div className="flex flex-1 items-center">
            <Link
              href="/"
              aria-label="Giant Mongolia home"
              className="flex h-11 items-center transition-opacity duration-200 hover:opacity-80"
            >
              <Logo inverted />
            </Link>
          </div>

          <DesktopNav
            activeMenu={activeMenu}
            onActiveMenuChange={(id) => {
              setActiveMenu(id);
              if (id) setSearchOpen(false);
            }}
          />

          <div className="-mr-2.5 flex flex-1 items-center justify-end gap-0.5">
            <IconButton
              ref={searchButtonRef}
              label="Search"
              tone="light"
              aria-expanded={searchOpen}
              aria-controls="site-search"
              aria-keyshortcuts="/"
              onClick={() => {
                setActiveMenu(null);
                setSearchOpen((value) => !value);
              }}
              className={searchOpen ? "bg-white/[0.08] text-white" : undefined}
            >
              <Search
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-[18px] transition-transform duration-300 ease-snappy group-hover/icon:-rotate-12 group-hover/icon:scale-110"
              />
            </IconButton>
            <CartButton />
            <IconButton
              label="Open menu"
              tone="light"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden"
            >
              <span aria-hidden="true" className="flex w-5 flex-col items-end gap-[5px]">
                <span className="h-[1.5px] w-5 bg-current" />
                <span className="h-[1.5px] w-5 origin-right scale-x-[0.65] bg-current transition-transform duration-300 ease-snappy group-hover/icon:scale-x-100" />
              </span>
            </IconButton>
          </div>
        </div>

        <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
        <AddedToBagNotice />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-accent/80"
        />
      </header>

      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: easeExit } }}
          />
        )}
      </AnimatePresence>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenSearch={() => {
          setDrawerOpen(false);
          setSearchOpen(true);
        }}
      />
      <CartDrawer />
    </>
  );
}
