"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { Clock, Cpu, CornerDownLeft, Search, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { disciplines } from "@/data/disciplines";
import { bikesData } from "@/data/bikesData";
import { gearCategories, gearProducts } from "@/data/gearData";
import { formatMnt, searchProducts } from "@/data/products";

const LIMITS = { bikes: 5, gear: 4, technology: 3 } as const;
const RECENT_LIMIT = 4;
const RECENT_KEY = "gm-recent-searches";

const technologyEntries = [
  {
    id: "syncdrive",
    name: "SyncDrive Pro",
    detail: { en: "E-bike motor system", mn: "Цахилгаан дугуйн моторын систем" },
    keywords: "motor ebike e-bike power battery energypak мотор цахилгаан батарей",
  },
  {
    id: "advanced-composite",
    name: "Advanced Composite",
    detail: { en: "Carbon frame technology", mn: "Карбон раамны технологи" },
    keywords: "carbon frame lightweight composite advanced sl карбон раам хөнгөн",
  },
  {
    id: "maestro",
    name: "Maestro Suspension",
    detail: { en: "Full-suspension platform", mn: "Бүрэн дүүжингийн систем" },
    keywords: "suspension trail enduro shock fork дүүжин",
  },
  {
    id: "aluxx",
    name: "ALUXX Aluminum",
    detail: { en: "Aluminum frame technology", mn: "Хөнгөн цагаан раамны технологи" },
    keywords: "aluminum aluminium frame alloy хөнгөн цагаан раам",
  },
  {
    id: "mips",
    name: "MIPS Protection",
    detail: { en: "Rotational impact helmet technology", mn: "Дуулганы эргэлтийн цохилтоос хамгаалах технологи" },
    keywords: "helmet safety mips protection дуулга хамгаалалт",
  },
] as const;

const copy = {
  en: {
    placeholder: "Search bikes, gear, technology...",
    clear: "Clear search",
    close: "Close",
    recent: "Recent searches",
    navigate: "Navigate",
    select: "Select",
    bikes: "Bikes",
    gear: "Gear",
    technology: "Technology & components",
  },
  mn: {
    placeholder: "Дугуй, хэрэгслүүд, технологи хайх...",
    clear: "Хайлтыг арилгах",
    close: "Хаах",
    recent: "Сүүлийн хайлтууд",
    navigate: "Шилжих",
    select: "Сонгох",
    bikes: "Дугуй",
    gear: "Хэрэгсэл",
    technology: "Технологи ба эд анги",
  },
} as const;

type Section = "bikes" | "gear" | "technology" | "discipline";

type Hit = {
  id: string;
  section: Section;
  href: string;
  title: string;
  badge?: string;
  price?: string;
  image?: string;
};

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

function readRecent(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string").slice(0, RECENT_LIMIT)
      : [];
  } catch {
    return [];
  }
}

function writeRecent(term: string): string[] {
  const next = [term, ...readRecent().filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(
    0,
    RECENT_LIMIT
  );
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
  return next;
}

function searchGear(needle: string) {
  const q = needle.toLowerCase();
  return gearProducts.filter((item) => {
    const category = gearCategories.find((entry) => entry.id === item.category);
    return [item.name, item.category, category?.en ?? "", category?.mn ?? "", item.badge ?? "", item.detail.en, item.detail.mn]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}

function searchTechnology(needle: string) {
  const q = needle.toLowerCase();
  return technologyEntries.filter((item) =>
    [item.name, item.detail.en, item.detail.mn, item.keywords].join(" ").toLowerCase().includes(q)
  );
}

export default function SearchDialog({ open, onOpenChange, triggerRef }: SearchDialogProps) {
  const { t, translate, language } = useLanguage();
  const c = copy[language];
  const sectionLabel: Record<Exclude<Section, "discipline">, string> = {
    bikes: c.bikes,
    gear: c.gear,
    technology: c.technology,
  };
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpen = useRef(false);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [recent, setRecent] = useState<string[]>([]);

  const trimmed = query.trim();

  const hits: Hit[] = useMemo(() => {
    if (!trimmed) {
      return disciplines.map((discipline) => ({
        id: discipline.id,
        section: "discipline" as const,
        href: `/bikes?discipline=${discipline.id}`,
        title: discipline.name,
      }));
    }
    const bikes = searchProducts(trimmed)
      .slice(0, LIMITS.bikes)
      .map<Hit>((product) => ({
        id: `bike-${product.id}`,
        section: "bikes",
        href: product.href,
        title: product.name,
        badge:
          language === "mn"
            ? (bikesData.find((bike) => bike.id === product.id)?.categoryMn ?? product.category)
            : product.category,
        price: formatMnt(product.priceMnt),
        image: product.image,
      }));
    const gear = searchGear(trimmed)
      .slice(0, LIMITS.gear)
      .map<Hit>((item) => ({
        id: `gear-${item.id}`,
        section: "gear",
        href: "/gear",
        title: item.name,
        badge: (() => {
          const category = gearCategories.find((entry) => entry.id === item.category);
          return language === "mn" ? category?.mn : category?.en;
        })(),
        price: formatMnt(item.priceMnt),
        image: item.image,
      }));
    const technology = searchTechnology(trimmed)
      .slice(0, LIMITS.technology)
      .map<Hit>((item) => ({
        id: `tech-${item.id}`,
        section: "technology",
        href: "/technology",
        title: item.name,
        badge: item.detail[language],
      }));
    return [...bikes, ...gear, ...technology];
  }, [trimmed, language]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const remember = useCallback(() => {
    if (trimmed) setRecent(writeRecent(trimmed));
  }, [trimmed]);

  const goToSearchPage = useCallback(() => {
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    remember();
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
    close();
  }, [close, remember, router, trimmed]);

  const goToHit = useCallback(
    (hit: Hit) => {
      remember();
      router.push(hit.href);
      close();
    },
    [close, remember, router]
  );

  useEffect(() => {
    function onGlobalKey(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(true);
      }
    }
    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [onOpenChange]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onNativeClose() {
      onOpenChange(false);
    }

    dialog.addEventListener("close", onNativeClose);
    return () => dialog.removeEventListener("close", onNativeClose);
  }, [onOpenChange]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.classList.add("search-lock");
      setRecent(readRecent());
      inputRef.current?.focus();
      inputRef.current?.select();
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.classList.remove("search-lock");
      setQuery("");
      setHighlighted(null);
    }

    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;

    return () => document.documentElement.classList.remove("search-lock");
  }, [open, triggerRef]);

  useEffect(() => {
    setHighlighted(null);
  }, [trimmed]);

  useEffect(() => {
    if (highlighted === null) return;
    document.getElementById(`${listId}-option-${highlighted}`)?.scrollIntoView({ block: "nearest" });
  }, [highlighted, listId]);

  function moveHighlight(delta: number) {
    if (hits.length === 0) return;
    setHighlighted((current) => {
      if (current === null) return delta > 0 ? 0 : hits.length - 1;
      return (current + delta + hits.length) % hits.length;
    });
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        close();
        return;
      case "ArrowDown":
        event.preventDefault();
        moveHighlight(1);
        return;
      case "ArrowUp":
        event.preventDefault();
        moveHighlight(-1);
        return;
      case "Home":
        if (hits.length && highlighted !== null) {
          event.preventDefault();
          setHighlighted(0);
        }
        return;
      case "End":
        if (hits.length && highlighted !== null) {
          event.preventDefault();
          setHighlighted(hits.length - 1);
        }
        return;
      case "Enter": {
        const index = highlighted ?? (trimmed ? 0 : null);
        const hit = index !== null ? hits[index] : undefined;
        if (!hit) return;
        event.preventDefault();
        goToHit(hit);
        return;
      }
    }
  }

  const activeId = highlighted !== null ? `${listId}-option-${highlighted}` : undefined;
  const showEmpty = Boolean(trimmed) && hits.length === 0;

  const sections = (["bikes", "gear", "technology"] as const)
    .map((section) => ({
      section,
      items: hits.map((hit, index) => ({ hit, index })).filter((entry) => entry.hit.section === section),
    }))
    .filter((group) => group.items.length > 0);

  const kbd =
    "rounded-md border border-neutral-300 bg-white/60 px-1.5 py-0.5 font-semibold dark:border-neutral-700 dark:bg-white/5";
  const labelClass =
    "px-3 pb-1 pt-3 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400";
  const pillBase =
    "inline-flex min-h-10 items-center rounded-full border border-neutral-300/70 bg-neutral-200/60 px-4 text-sm font-semibold text-neutral-800 outline-none transition-all duration-150 hover:border-blue-500/40 hover:bg-blue-500/10 focus-visible:ring-2 focus-visible:ring-blue-500/50 aria-selected:border-blue-500/50 aria-selected:bg-blue-500/10 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100 dark:hover:bg-blue-400/15 dark:aria-selected:bg-blue-400/15";

  return (
    <dialog
      ref={dialogRef}
      id="search-dialog"
      aria-labelledby="search-dialog-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      className="mx-auto mb-auto mt-[max(1rem,8svh)] max-h-[min(42rem,calc(100svh-2rem))] w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/90 p-0 text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex open:flex-col dark:border-white/15 dark:bg-[#0b0f17]/90 dark:text-neutral-100"
    >
      <h2 id="search-dialog-title" className="sr-only">
        {t("search.title")}
      </h2>

      <form
        className="flex items-center gap-2 border-b border-neutral-200/80 px-4 py-3 md:px-6 md:py-4 dark:border-white/10"
        onSubmit={(event) => {
          event.preventDefault();
          goToSearchPage();
        }}
      >
        <label htmlFor="site-search" className="sr-only">
          {t("search.title")}
        </label>
        <Search className="h-5 w-5 flex-none text-neutral-500 dark:text-neutral-400" strokeWidth={2} aria-hidden="true" />
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder={c.placeholder}
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={activeId}
          className="h-11 min-w-0 flex-1 rounded-lg bg-transparent px-1 text-lg font-medium text-neutral-900 outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:text-neutral-50 dark:placeholder:text-neutral-500 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label={c.clear}
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-neutral-200/70 text-neutral-600 outline-none transition-colors hover:bg-neutral-300/70 focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700/80"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          onClick={close}
          className="inline-flex h-10 flex-none items-center gap-1.5 rounded-full px-3 text-xs font-semibold uppercase tracking-wider text-neutral-700 outline-none transition-colors hover:bg-neutral-200/70 focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:text-neutral-200 dark:hover:bg-neutral-800/80"
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          <span>{c.close}</span>
        </button>
      </form>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2 md:px-4">
        {showEmpty ? (
          <p
            role="status"
            className="m-2 rounded-2xl bg-neutral-200/50 px-5 py-5 text-[0.9375rem] leading-relaxed dark:bg-white/5"
          >
            {`${t("search.empty")} “${trimmed}”`}
          </p>
        ) : trimmed ? (
          <div id={listId} role="listbox" aria-label={t("search.results")}>
            {sections.map((group) => (
              <div key={group.section} role="group" aria-label={sectionLabel[group.section]}>
                <p className={labelClass}>{sectionLabel[group.section]}</p>
                <ul className="flex flex-col gap-0.5">
                  {group.items.map(({ hit, index }) => {
                    const selected = highlighted === index;
                    return (
                      <li key={hit.id} role="presentation">
                        <Link
                          id={`${listId}-option-${index}`}
                          role="option"
                          aria-selected={selected}
                          href={hit.href}
                          tabIndex={-1}
                          onClick={() => {
                            remember();
                            close();
                          }}
                          onMouseEnter={() => setHighlighted(index)}
                          className="flex min-h-14 items-center gap-4 rounded-xl px-3 py-2 outline-none transition-colors duration-150 hover:bg-neutral-200/60 aria-selected:bg-blue-500/10 aria-selected:ring-1 aria-selected:ring-blue-500/30 dark:hover:bg-white/10 dark:aria-selected:bg-blue-400/15"
                        >
                          <span className="relative flex h-12 w-[5.25rem] flex-none items-center justify-center overflow-hidden rounded-lg bg-neutral-200/70 dark:bg-neutral-800/80">
                            {hit.image ? (
                              <Image src={hit.image} alt="" fill sizes="84px" className="object-cover" />
                            ) : (
                              <Cpu className="h-5 w-5 text-neutral-500 dark:text-neutral-400" strokeWidth={1.8} aria-hidden="true" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1 text-left">
                            <span className="block truncate text-[0.9375rem] font-bold leading-tight tracking-tight">
                              {hit.title}
                            </span>
                            {hit.badge && (
                              <span className="mt-0.5 block truncate text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                {hit.badge}
                              </span>
                            )}
                          </span>
                          {hit.price && (
                            <span className="flex-none text-[0.8125rem] font-semibold tabular-nums text-neutral-600 dark:text-neutral-300">
                              {hit.price}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <>
            {recent.length > 0 && (
              <>
                <p className={labelClass}>{c.recent}</p>
                <div className="flex flex-wrap gap-1 px-2 pb-2 pt-1">
                  {recent.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-neutral-600 outline-none transition-colors hover:bg-neutral-200/70 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:text-neutral-300 dark:hover:bg-neutral-800/80 dark:hover:text-white"
                    >
                      <Clock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      {term}
                    </button>
                  ))}
                </div>
              </>
            )}
            <p className={labelClass}>{t("search.disciplines")}</p>
            <div
              id={listId}
              role="listbox"
              aria-label={t("search.disciplines")}
              className="flex flex-wrap gap-2 px-3 pb-3 pt-1"
            >
              {hits.map((hit, index) => (
                <Link
                  key={hit.id}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={highlighted === index}
                  href={hit.href}
                  className={pillBase}
                  onClick={close}
                  onMouseEnter={() => setHighlighted(index)}
                >
                  {translate(hit.title)}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-neutral-200/80 px-4 py-3 text-xs text-neutral-500 md:px-6 dark:border-white/10 dark:text-neutral-400">
        <span className="hidden items-center gap-4 md:flex">
          <span className="inline-flex items-center gap-1.5">
            <kbd className={kbd}>↑</kbd>
            <kbd className={kbd}>↓</kbd>
            {c.navigate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className={kbd}>
              <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
            </kbd>
            {c.select}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className={kbd}>Esc</kbd>
            {c.close}
          </span>
        </span>
        {trimmed && hits.length > 0 && (
          <button
            type="button"
            onClick={goToSearchPage}
            className="ml-auto rounded-full px-3 py-1.5 font-semibold text-blue-700 outline-none transition-colors hover:bg-blue-500/10 focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:text-blue-300"
          >
            {t("search.hint")}
          </button>
        )}
      </div>
    </dialog>
  );
}
