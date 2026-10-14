"use client";

import Link from "next/link";
import { useEffect, useRef, type FocusEvent, type PointerEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MegaPanel from "@/components/header/mega-panel";
import { primaryNav } from "@/data/catalog";
import { cn } from "@/lib/cn";

const OPEN_DELAY = 90;
const CLOSE_DELAY = 160;

function navItemClasses(active: boolean) {
  return cn(
    "relative flex h-full cursor-pointer items-center gap-1.5 px-3.5 text-[11px] font-semibold uppercase leading-none tracking-[0.2em] transition-colors duration-200 hover:text-white",
    "after:pointer-events-none after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:bg-accent after:transition-transform after:duration-300 after:ease-snappy",
    active
      ? "text-white after:origin-left after:scale-x-100"
      : "text-white/70 after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100",
  );
}

export default function DesktopNav({
  activeMenu,
  onActiveMenuChange,
}: {
  activeMenu: string | null;
  onActiveMenuChange: (id: string | null) => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);

  function clearTimer() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }

  useEffect(() => clearTimer, []);

  function handlePointerEnter(event: PointerEvent, id: string) {
    if (event.pointerType !== "mouse") return;
    clearTimer();
    const open = () => {
      openedByHover.current = true;
      onActiveMenuChange(id);
    };
    if (activeMenu) open();
    else timer.current = setTimeout(open, OPEN_DELAY);
  }

  function handlePointerLeave(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    clearTimer();
    timer.current = setTimeout(() => onActiveMenuChange(null), CLOSE_DELAY);
  }

  function handleToggle(id: string) {
    clearTimer();
    // A click right after hover-open should keep the menu open instead of toggling it shut.
    if (activeMenu === id && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    onActiveMenuChange(activeMenu === id ? null : id);
  }

  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) onActiveMenuChange(null);
  }

  return (
    <nav aria-label="Primary" className="hidden h-full lg:flex">
      <ul className="flex h-full items-stretch">
        {primaryNav.map((item) => {
          const menu = item.menu;
          if (!menu) {
            return (
              <li key={item.label} className="flex">
                <Link href={item.href} className={navItemClasses(false)}>
                  {item.label}
                </Link>
              </li>
            );
          }
          const open = activeMenu === menu.id;
          return (
            <li
              key={item.label}
              className="flex"
              onPointerEnter={(event) => handlePointerEnter(event, menu.id)}
              onPointerLeave={handlePointerLeave}
              onBlur={handleBlur}
            >
              <button
                id={`nav-trigger-${menu.id}`}
                type="button"
                aria-expanded={open}
                aria-controls={`nav-panel-${menu.id}`}
                onClick={() => handleToggle(menu.id)}
                className={navItemClasses(open)}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2}
                  className={cn(
                    "size-3 transition-[transform,opacity] duration-300 ease-snappy",
                    open ? "rotate-180 opacity-100" : "opacity-50",
                  )}
                />
              </button>
              <AnimatePresence>
                {open && <MegaPanel menu={menu} label={item.label} onNavigate={() => onActiveMenuChange(null)} />}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
