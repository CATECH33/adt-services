import { Info } from "lucide-react";
import { agency } from "@/content/company";

/** Bandeau signalant le statut de démonstration du site. */
export function DemoBar() {
  return (
    <div className="bg-ink text-white/85">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center text-[0.72rem] leading-snug sm:text-xs">
        <Info aria-hidden className="h-3.5 w-3.5 shrink-0 text-orange" />
        <span>
          Site de démonstration proposé par {agency.name} — visuels d&apos;illustration et contenus
          à valider par ADT Services.
        </span>
      </p>
    </div>
  );
}
