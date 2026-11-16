import { cn } from "@/lib/cn";

type MarkProps = {
  className?: string;
  /** "light" = sur fond clair, "dark" = sur fond navy */
  tone?: "light" | "dark";
  title?: string;
};

/**
 * Pictogramme ADT Services : une maison stylisée abritant
 * une goutte d'eau (plomberie) et une flamme (chauffage / gaz).
 */
export function LogoMark({ className, tone = "light", title }: MarkProps) {
  const house = tone === "light" ? "#0B3D91" : "#FFFFFF";
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Toit + murs */}
      <path
        d="M5 29.5 32 7l27 22.5"
        fill="none"
        stroke={house}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 27v25.5a4.5 4.5 0 0 0 4.5 4.5h30a4.5 4.5 0 0 0 4.5-4.5V27"
        fill="none"
        stroke={house}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Goutte d'eau */}
      <path
        d="M25 26.5s-8.2 9.3-8.2 15.3a8.2 8.2 0 0 0 16.4 0c0-6-8.2-15.3-8.2-15.3Z"
        fill="#0F8BEF"
      />
      <path
        d="M21.6 42.4a3.6 3.6 0 0 0 3 3.4"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity=".75"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Flamme */}
      <path
        d="M40.6 51c-4.7 0-7.6-3.4-7.6-7.4 0-4.8 3.9-7.4 4.8-12.6 2.6 2 3.4 5 2.8 7.6 2.5-1 3.8-3.6 3.6-6.6 3 2.7 4.4 6.6 4.4 11.4 0 4.3-3.2 7.6-8 7.6Z"
        fill="#FF7A00"
      />
      <path
        d="M40.8 51c-2.2 0-3.6-1.5-3.6-3.4 0-2.4 2-3.6 2.7-6.2 1.9 1.5 4.5 3.5 4.5 6.2 0 1.9-1.5 3.4-3.6 3.4Z"
        fill="#FFC27A"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  tone?: "light" | "dark";
};

/** Logo complet : pictogramme + wordmark « ADT Services ». */
export function Logo({ className, tone = "light" }: LogoProps) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.45rem] font-extrabold tracking-[-0.03em]",
            dark ? "text-white" : "text-navy",
          )}
        >
          ADT
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.32em]",
            dark ? "text-white/75" : "text-ink/70",
          )}
        >
          Services
        </span>
      </span>
    </span>
  );
}
