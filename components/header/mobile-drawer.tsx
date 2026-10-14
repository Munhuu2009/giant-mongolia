"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Logo from "@/components/logo";
import { Button, IconButton } from "@/components/ui/Button";
import { PlusMinus } from "@/components/ui/plus-minus";
import { primaryNav, type MegaMenu } from "@/data/catalog";
import { easeExit, easeSnappy } from "@/lib/cn";
import { useFocusTrap } from "@/lib/use-focus-trap";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.14 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.42, ease: easeSnappy } },
};

const rowClasses =
  "flex h-14 w-full items-center justify-between text-[13px] font-semibold uppercase leading-none tracking-[0.2em] text-white/85 transition-colors duration-200 hover:text-white";

export default function MobileDrawer({
  open,
  onClose,
  onOpenSearch,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-backdrop"
          className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: easeExit } }}
          onClick={onClose}
        />
      )}
      {open && (
        <motion.div
          key="mobile-panel"
          ref={panelRef}
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ x: "100%" }}
          animate={{ x: 0, transition: { duration: 0.48, ease: easeSnappy } }}
          exit={{ x: "100%", transition: { duration: 0.3, ease: easeExit } }}
          className="fixed inset-y-0 right-0 z-[61] flex w-[min(88vw,400px)] flex-col overflow-y-auto rounded-l-[18px] bg-ink text-white lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 pl-5 pr-3">
            <Logo inverted />
            <IconButton label="Close menu" tone="light" onClick={onClose} data-autofocus>
              <motion.span
                className="inline-flex"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.4, ease: easeSnappy }}
              >
                <X
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-5 transition-transform duration-300 ease-snappy group-hover/icon:rotate-90"
                />
              </motion.span>
            </IconButton>
          </div>

          <nav aria-label="Mobile">
            <motion.ul variants={listVariants} initial="hidden" animate="show" className="flex flex-col px-5 py-3">
              {primaryNav.map((item) => (
                <motion.li key={item.label} variants={itemVariants} className="border-b border-white/[0.07]">
                  {item.menu ? (
                    <DrawerAccordion label={item.label} menu={item.menu} onNavigate={onClose} />
                  ) : (
                    <Link href={item.href} onClick={onClose} className={`group/dl ${rowClasses}`}>
                      {item.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-white/30 transition-[color,transform] duration-300 ease-snappy group-hover/dl:translate-x-1 group-hover/dl:text-accent"
                      />
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45, ease: easeSnappy }}
            className="mt-auto flex flex-col gap-4 border-t border-white/10 p-5"
          >
            <Button variant="secondary" tone="light" block onClick={onOpenSearch}>
              <Search aria-hidden="true" strokeWidth={2} className="size-4" />
              Search
            </Button>
            <p className="text-xs leading-relaxed text-white/45">
              Visit our Ulaanbaatar flagship for test rides, bike fitting and certified service.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DrawerAccordion({ label, menu, onNavigate }: { label: string; menu: MegaMenu; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();

  return (
    <>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={() => setExpanded((value) => !value)}
        className={rowClasses}
      >
        {label}
        <PlusMinus open={expanded} className={expanded ? "text-accent" : "text-white/50"} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={regionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.34, ease: easeSnappy } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.22, ease: easeExit } }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pb-6 pt-1">
              {menu.columns.map((column) => (
                <div key={column.title}>
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
                    <span aria-hidden="true" className="h-px w-3 bg-accent" />
                    {column.title}
                  </p>
                  <ul className="mt-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="flex min-h-10 items-center text-sm text-white/65 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
