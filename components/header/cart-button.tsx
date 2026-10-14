"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { IconButton } from "@/components/ui/Button";
import { selectCount, useCart } from "@/lib/cart-store";
import { easeSnappy } from "@/lib/cn";

export default function CartButton() {
  const count = useCart(selectCount);
  const isOpen = useCart((state) => state.isOpen);
  const openCart = useCart((state) => state.open);

  return (
    <IconButton
      label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
      tone="light"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={openCart}
    >
      <ShoppingBag
        aria-hidden="true"
        strokeWidth={1.75}
        className="size-[18px] transition-transform duration-300 ease-snappy group-hover/icon:-translate-y-0.5 group-hover/icon:-rotate-6"
      />
      <AnimatePresence initial={false}>
        {count > 0 && (
          <motion.span
            key="badge"
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeSnappy }}
            className="absolute right-1 top-1.5 flex h-4 min-w-4 items-center justify-center overflow-hidden bg-accent px-1 text-[10px] font-bold leading-none tabular-nums text-white"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={count}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.24, ease: easeSnappy }}
              >
                {count > 9 ? "9+" : count}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
