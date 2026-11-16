"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { company, navigation } from "@/content/company";
import { cn } from "@/lib/cn";
import { isActive } from "./NavLinks";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState<string | null>(null);
  const [top, setTop] = useState(0);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Ferme le menu lors d'un changement de page.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          const header = buttonRef.current?.closest("header");
          if (header) setTop(Math.round(header.getBoundingClientRect().bottom));
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:bg-mist"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {open &&
        createPortal(
          <div
            id={panelId}
            ref={panelRef}
            style={{ top }}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="px-5 pb-10 pt-4">
              <ul className="divide-y divide-line border-y border-line">
                {navigation.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li
                      key={item.href}
                      className="animate-fade-up"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-4 font-display text-2xl font-semibold",
                          active ? "text-navy" : "text-ink",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                        <ArrowRight
                          aria-hidden
                          className={cn("h-5 w-5", active ? "text-orange" : "text-ink/30")}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 grid gap-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-13 items-center justify-center rounded-full bg-orange font-semibold text-ink"
                >
                  Demander un devis
                </Link>
                <a
                  href={company.phone.href}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-navy font-semibold text-white"
                >
                  <Phone aria-hidden className="h-4 w-4" />
                  {company.phone.display}
                </a>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
