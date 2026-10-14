"use client";

import Image from "next/image";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Button, ButtonLink, IconButton } from "@/components/ui/Button";
import { formatMnt } from "@/data/products";
import { MAX_LINE_QUANTITY, selectCount, selectSubtotal, useCart, type CartLine } from "@/lib/cart-store";
import { easeExit, easeSnappy } from "@/lib/cn";
import { useFocusTrap } from "@/lib/use-focus-trap";

export default function CartDrawer() {
  const isOpen = useCart((state) => state.isOpen);
  const close = useCart((state) => state.close);
  const lines = useCart((state) => state.lines);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen, close);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-backdrop"
          className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: easeExit } }}
          onClick={close}
        />
      )}
      {isOpen && (
        <motion.div
          key="cart-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          initial={{ x: "100%" }}
          animate={{ x: 0, transition: { duration: 0.48, ease: easeSnappy } }}
          exit={{ x: "100%", transition: { duration: 0.3, ease: easeExit } }}
          className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[440px] flex-col bg-white text-neutral-900 sm:rounded-l-[18px]"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 pl-6 pr-3">
            <h2 id="cart-title" className="flex items-baseline gap-2 text-sm font-black uppercase tracking-[0.16em]">
              Your bag
              <span className="font-mono text-xs font-medium tabular-nums text-neutral-500">{`(${count})`}</span>
            </h2>
            <IconButton label="Close bag" onClick={close} data-autofocus>
              <X
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-5 transition-transform duration-300 ease-snappy group-hover/icon:rotate-90"
              />
            </IconButton>
          </div>

          {lines.length === 0 ? (
            <EmptyBag onClose={close} />
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto px-6">
                <AnimatePresence initial={false}>
                  {lines.map((line) => (
                    <CartLineItem key={line.key} line={line} />
                  ))}
                </AnimatePresence>
              </ul>
              <div className="shrink-0 border-t border-neutral-200 px-6 pb-6 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">Subtotal</span>
                  <span className="text-xl font-black tabular-nums">{formatMnt(subtotal)}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  Online checkout isn&apos;t available yet. Reserve these bikes and complete your purchase at our
                  flagship store.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <ButtonLink href="#stores" onClick={close} block size="lg" arrow>
                    Reserve in store
                  </ButtonLink>
                  <Button variant="secondary" block onClick={close}>
                    Continue shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartLineItem({ line }: { line: CartLine }) {
  const setQuantity = useCart((state) => state.setQuantity);
  const remove = useCart((state) => state.remove);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: easeSnappy } }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.22, ease: easeExit } }}
      className="flex gap-4 border-b border-neutral-200 py-5 last:border-b-0"
    >
      <div className="relative h-[72px] w-24 shrink-0 overflow-hidden bg-neutral-100">
        <Image src={line.image} alt="" fill sizes="96px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">{line.category}</p>
            <p className="mt-1 truncate text-sm font-black uppercase tracking-tight">{line.name}</p>
            <p className="mt-0.5 text-xs text-neutral-500">{`Size ${line.size}`}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold tabular-nums">{formatMnt(line.priceMnt * line.quantity)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-neutral-200">
            <IconButton
              size="sm"
              label={`Decrease quantity of ${line.name}`}
              disabled={line.quantity <= 1}
              onClick={() => setQuantity(line.key, line.quantity - 1)}
            >
              <Minus aria-hidden="true" className="size-3.5" />
            </IconButton>
            <span aria-live="polite" className="w-8 overflow-hidden text-center text-sm font-semibold tabular-nums">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={line.quantity}
                  className="inline-block"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.2, ease: easeSnappy }}
                >
                  {line.quantity}
                </motion.span>
              </AnimatePresence>
            </span>
            <IconButton
              size="sm"
              label={`Increase quantity of ${line.name}`}
              disabled={line.quantity >= MAX_LINE_QUANTITY}
              onClick={() => setQuantity(line.key, line.quantity + 1)}
            >
              <Plus aria-hidden="true" className="size-3.5" />
            </IconButton>
          </div>
          <Button variant="text" size="sm" onClick={() => remove(line.key)} className="text-neutral-500 hover:text-neutral-900">
            Remove
            <span className="sr-only">{` ${line.name}, size ${line.size}`}</span>
          </Button>
        </div>
      </div>
    </motion.li>
  );
}

function EmptyBag({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <span className="relative flex size-16 items-center justify-center border border-neutral-200">
        <ShoppingBag aria-hidden="true" strokeWidth={1.5} className="size-6 text-neutral-400" />
        <span aria-hidden="true" className="absolute -right-px -top-px size-2 bg-accent" />
      </span>
      <p className="mt-6 text-lg font-black uppercase tracking-tight">Your bag is empty</p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
        Pick a size on any bike and add it here to reserve it at the flagship store.
      </p>
      <ButtonLink href="#bikes" onClick={onClose} className="mt-8" arrow>
        Shop bikes
      </ButtonLink>
    </div>
  );
}
