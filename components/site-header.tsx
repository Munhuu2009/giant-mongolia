"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/logo";

const navItems = [
  { label: "Bikes", href: "#bikes" },
  { label: "E-Bikes", href: "#disciplines" },
  { label: "Gear", href: "#" },
  { label: "Technology", href: "#technology" },
  { label: "Stores", href: "#stores" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" aria-label="Giant Mongolia home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-900 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center">
          <button
            type="button"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center text-neutral-900 transition-colors hover:text-accent"
          >
            <Search className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Cart, 0 items"
            className="relative flex h-11 w-11 items-center justify-center text-neutral-900 transition-colors hover:text-accent"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center text-neutral-900 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-neutral-200 bg-white lg:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-neutral-200">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center px-4 text-sm font-bold uppercase tracking-[0.18em] text-neutral-900 active:bg-neutral-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
