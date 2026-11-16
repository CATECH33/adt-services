"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Realisation } from "@/content/realisations";
import { cn } from "@/lib/cn";

type Category = { value: string; label: string };

export function Gallery({ items, categories }: { items: Realisation[]; categories: Category[] }) {
  const [filter, setFilter] = useState("tous");
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filter === "tous" ? items : items.filter((i) => i.category === filter);
  const labelOf = (v: string) => categories.find((c) => c.value === v)?.label ?? v;

  const open = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setCurrent(index);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setCurrent((c) => (c === null ? c : (c + delta + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setCurrent(null);
      triggerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const active = current !== null ? visible[current] : null;

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrer par catégorie"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((c) => {
          const count =
            c.value === "tous" ? items.length : items.filter((i) => i.category === c.value).length;
          const selected = filter === c.value;
          return (
            <button
              key={c.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(c.value)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                selected
                  ? "border-navy bg-navy text-white shadow-card"
                  : "border-line bg-white text-ink/75 hover:border-navy/40 hover:text-navy",
              )}
            >
              {c.label}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs",
                  selected ? "bg-white/15" : "bg-mist text-muted",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} visuels affichés
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <li key={item.id} className="animate-fade-up" style={{ animationDelay: `${index * 40}ms` }}>
            <figure className="group overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <button
                type="button"
                onClick={(e) => open(index, e.currentTarget)}
                className="relative block aspect-[4/3] w-full overflow-hidden"
                aria-label={`Agrandir : ${item.title}`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-semibold text-ink backdrop-blur">
                  {labelOf(item.category)}
                </span>
                {item.isIllustration && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[0.68rem] font-medium text-white backdrop-blur">
                    Visuel d&apos;illustration
                  </span>
                )}
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                  <Expand aria-hidden className="h-4 w-4" />
                </span>
              </button>
              <figcaption className="p-5">
                <p className="font-display text-lg font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.caption}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={active ? active.title : "Visionneuse"}
        className="m-auto max-h-[92dvh] w-[min(92vw,1100px)] overflow-hidden rounded-3xl bg-ink p-0 text-white backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {active && (
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] max-h-[70dvh] w-full bg-black sm:aspect-[16/10]">
              <Image
                src={active.image.src}
                alt={active.image.alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Visuel précédent"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy transition hover:bg-white"
                  >
                    <ChevronLeft aria-hidden className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Visuel suivant"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy transition hover:bg-white"
                  >
                    <ChevronRight aria-hidden className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
              <div>
                <p className="font-display text-xl font-bold">{active.title}</p>
                <p className="mt-1 text-sm text-white/70">
                  {active.caption}
                  {active.isIllustration && " Visuel d'illustration, non réalisé par ADT Services."}
                </p>
                <p className="mt-2 text-xs text-white/50">
                  {current! + 1} / {visible.length}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer la visionneuse"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
