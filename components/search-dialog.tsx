"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { disciplines, type Discipline } from "@/data/disciplines";
import { formatMnt, searchProducts, type Product } from "@/data/products";

const RESULT_LIMIT = 6;

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

type Hit =
  | { kind: "product"; id: string; href: string; product: Product }
  | { kind: "discipline"; id: string; href: string; discipline: Discipline };

export default function SearchDialog({ open, onOpenChange, triggerRef }: SearchDialogProps) {
  const { t, translate } = useLanguage();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpen = useRef(false);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState<number | null>(null);

  const trimmed = query.trim();
  const matches = useMemo(() => searchProducts(trimmed).slice(0, RESULT_LIMIT), [trimmed]);

  const hits: Hit[] = useMemo(() => {
    if (!trimmed) {
      return disciplines.map((discipline) => ({
        kind: "discipline",
        id: discipline.id,
        href: `/bikes?discipline=${discipline.id}`,
        discipline,
      }));
    }
    return matches.map((product) => ({
      kind: "product",
      id: product.id,
      href: product.href,
      product,
    }));
  }, [matches, trimmed]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const goToSearchPage = useCallback(() => {
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
    close();
  }, [close, router, trimmed]);

  const goToHit = useCallback(
    (hit: Hit) => {
      router.push(hit.href);
      close();
    },
    [close, router]
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

  function moveHighlight(delta: number) {
    if (hits.length === 0) return;
    setHighlighted((current) => {
      if (current === null) return delta > 0 ? 0 : hits.length - 1;
      return (current + delta + hits.length) % hits.length;
    });
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveHighlight(1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(-1);
      return;
    }
    if (event.key === "Enter" && highlighted !== null) {
      const hit = hits[highlighted];
      if (!hit) return;
      event.preventDefault();
      goToHit(hit);
    }
  }

  const activeId = highlighted !== null ? `${listId}-option-${highlighted}` : undefined;
  const showEmpty = Boolean(trimmed) && matches.length === 0;

  return (
    <dialog
      ref={dialogRef}
      id="search-dialog"
      className="search-dialog"
      aria-labelledby="search-dialog-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      <div className="search-dialog__sheet">
        <div className="search-dialog__head">
          <h2 id="search-dialog-title" className="type-title">
            {t("search.title")}
          </h2>
          <button type="button" className="icon-btn" aria-label={t("search.close")} onClick={close}>
            <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <form
          className="search-dialog__form"
          onSubmit={(event) => {
            event.preventDefault();
            goToSearchPage();
          }}
        >
          <label htmlFor="site-search" className="sr-only">
            {t("search.title")}
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={t("search.placeholder")}
            autoComplete="off"
            className="search-field"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={activeId}
          />
        </form>
        <p className="search-dialog__hint">{t("search.hint")}</p>

        <div className="search-dialog__body">
          {showEmpty ? (
            <p role="status" className="search-empty">
              {`${t("search.empty")} “${trimmed}”`}
            </p>
          ) : trimmed ? (
            <>
              <p className="type-label search-dialog__label">{t("search.results")}</p>
              <ul id={listId} role="listbox" className="search-hits">
                {hits.map((hit, index) => {
                  if (hit.kind !== "product") return null;
                  const selected = highlighted === index;
                  return (
                    <li key={hit.id} role="presentation">
                      <Link
                        id={`${listId}-option-${index}`}
                        role="option"
                        aria-selected={selected}
                        href={hit.href}
                        className={`search-hit${selected ? " is-active" : ""}`}
                        onClick={close}
                        onMouseEnter={() => setHighlighted(index)}
                      >
                        <span className="search-hit__media">
                          <Image
                            src={hit.product.image}
                            alt=""
                            fill
                            sizes="72px"
                            className="object-cover"
                          />
                        </span>
                        <span>
                          <span className="search-hit__name">{hit.product.name}</span>
                          <span className="search-hit__price">{formatMnt(hit.product.priceMnt)}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <p className="type-label search-dialog__label">{t("search.disciplines")}</p>
              <div id={listId} role="listbox" className="search-quick">
                {hits.map((hit, index) => {
                  if (hit.kind !== "discipline") return null;
                  const selected = highlighted === index;
                  return (
                    <Link
                      key={hit.id}
                      id={`${listId}-option-${index}`}
                      role="option"
                      aria-selected={selected}
                      href={hit.href}
                      className={`search-quick__link${selected ? " is-active" : ""}`}
                      onClick={close}
                      onMouseEnter={() => setHighlighted(index)}
                    >
                      {translate(hit.discipline.name)}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
