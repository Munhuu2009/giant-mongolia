"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-store";
import { easeExit, easeSnappy } from "@/lib/cn";

const VISIBLE_MS = 3500;

export default function AddedToBagNotice() {
  const lastAdded = useCart((state) => state.lastAdded);
  const isOpen = useCart((state) => state.isOpen);
  const dismiss = useCart((state) => state.dismissLastAdded);
  const openCart = useCart((state) => state.open);

  useEffect(() => {
    if (!lastAdded) return;
    const timeout = setTimeout(dismiss, VISIBLE_MS);
    return () => clearTimeout(timeout);
  }, [lastAdded, dismiss]);

  const visible = lastAdded !== null && !isOpen;

  return (
    <>
      <p aria-live="polite" className="sr-only">
        {lastAdded ? `${lastAdded.name}, size ${lastAdded.size}, added to your bag.` : ""}
      </p>
      <div className="pointer-events-none absolute inset-x-0 top-full z-10">
        <div className="mx-auto flex max-w-7xl justify-end px-4 pt-3 md:px-8">
          <AnimatePresence>
            {visible && (
              <motion.div
                key={lastAdded.at}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: easeSnappy } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.18, ease: easeExit } }}
                className="pointer-events-auto w-[min(100%,340px)] overflow-hidden border border-neutral-200 bg-white text-neutral-900 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center gap-3 py-3 pl-3 pr-4">
                  <span className="cut-corner flex size-9 shrink-0 items-center justify-center bg-neutral-900">
                    <Check aria-hidden="true" strokeWidth={2.5} className="size-4 text-accent" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">Added to bag</p>
                    <p className="mt-1 truncate text-sm font-semibold">
                      {lastAdded.name}
                      <span className="font-medium text-neutral-500">{` · ${lastAdded.size}`}</span>
                    </p>
                  </div>
                  <Button variant="text" size="sm" arrow onClick={openCart}>
                    View
                  </Button>
                </div>
                <motion.span
                  aria-hidden="true"
                  className="block h-0.5 origin-left bg-accent"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: VISIBLE_MS / 1000, ease: "linear" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
