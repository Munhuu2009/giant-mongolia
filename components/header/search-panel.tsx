"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { IconButton } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/spinner";
import { disciplines } from "@/data/catalog";
import { featuredProducts, formatMnt } from "@/data/products";
import { easeExit, easeSnappy } from "@/lib/cn";

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  price?: string;
  keywords: string;
};

const searchIndex: SearchResult[] = [
  ...featuredProducts.map((product) => ({
    id: product.id,
    title: product.name,
    subtitle: product.category,
    href: "#bikes",
    image: product.image,
    price: formatMnt(product.priceMnt),
    keywords: `${product.name} ${product.category} bike`.toLowerCase(),
  })),
  ...disciplines.map((discipline) => ({
    id: `discipline-${discipline.name}`,
    title: `${discipline.name} bikes`,
    subtitle: discipline.tagline,
    href: discipline.href,
    image: discipline.image,
    keywords: `${discipline.name} ${discipline.tagline} category`.toLowerCase(),
  })),
];

function searchCatalog(query: string): SearchResult[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return searchIndex.filter((item) => terms.every((term) => item.keywords.includes(term))).slice(0, 6);
}

export default function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <SearchPanelContent onClose={onClose} />}</AnimatePresence>;
}

function SearchPanelContent({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const results = useMemo(() => searchCatalog(deferredQuery), [deferredQuery]);
  const trimmed = deferredQuery.trim();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    const first = results[0];
    if (!first) return;
    window.location.hash = first.href.replace(/^#/, "");
    onClose();
  }

  return (
    <motion.div
      id="site-search"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: easeSnappy } }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.18, ease: easeExit } }}
      className="absolute inset-x-0 top-full border-b border-white/10 bg-ink text-white shadow-[0_32px_48px_-32px_rgba(0,0,0,0.7)]"
    >
      <div className="mx-auto max-w-3xl px-4 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
        <div role="search" className="group/search relative flex items-center gap-3 border-b border-white/15">
          <Search aria-hidden="true" strokeWidth={1.75} className="size-5 shrink-0 text-white/50" />
          <label htmlFor="site-search-input" className="sr-only">
            Search bikes and categories
          </label>
          <input
            ref={inputRef}
            id="site-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            placeholder="Search bikes, categories…"
            className="h-14 min-w-0 flex-1 bg-transparent text-lg font-medium text-white placeholder:text-white/30 focus:outline-none md:h-16 md:text-xl [&::-webkit-search-cancel-button]:hidden"
          />
          <span className="flex size-5 items-center justify-center">
            {isStale && <Spinner size={18} className="text-white" />}
          </span>
          {query && (
            <IconButton
              label="Clear search"
              tone="light"
              size="sm"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <X aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/icon:rotate-90" />
            </IconButton>
          )}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-snappy group-focus-within/search:scale-x-100"
          />
        </div>

        <p aria-live="polite" className="sr-only">
          {trimmed ? `${results.length} result${results.length === 1 ? "" : "s"} for ${trimmed}` : ""}
        </p>

        {!trimmed && (
          <div className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">Popular categories</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {disciplines.map((discipline) => (
                <li key={discipline.name}>
                  <Link
                    href={discipline.href}
                    onClick={onClose}
                    className="flex h-9 items-center border border-white/15 px-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/75 transition-colors duration-200 hover:border-white hover:text-white"
                  >
                    {discipline.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {trimmed && results.length > 0 && (
          <ul className="mt-4">
            {results.map((result, index) => (
              <motion.li
                key={result.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: easeSnappy, delay: index * 0.03 }}
                className="border-b border-white/[0.07]"
              >
                <Link
                  href={result.href}
                  onClick={onClose}
                  className="group/res flex items-center gap-4 py-3 transition-colors duration-200 focus-visible:bg-white/[0.04]"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden bg-white/5">
                    <Image
                      src={result.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 ease-snappy group-hover/res:scale-105"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-white">{result.title}</span>
                    <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {result.subtitle}
                    </span>
                  </span>
                  {result.price && <span className="text-sm tabular-nums text-white/70">{result.price}</span>}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 -translate-x-1 text-accent opacity-0 transition-[opacity,transform] duration-300 ease-snappy group-hover/res:translate-x-0 group-hover/res:opacity-100"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        )}

        {trimmed && results.length === 0 && !isStale && (
          <div className="mt-8 flex items-start gap-4">
            <span aria-hidden="true" className="mt-1 h-8 w-0.5 bg-accent" />
            <div>
              <p className="text-lg font-semibold">
                {"No results for "}
                <span className="text-white/60">{`“${trimmed}”`}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/50">
                Try a discipline like Road, Mountain or E-Bikes, or a model name.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
