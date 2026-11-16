import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out focus-visible:outline-offset-4 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-ink shadow-[0_8px_20px_-8px_rgb(255_122_0/0.7)] hover:bg-orange-600 hover:shadow-[0_12px_24px_-8px_rgb(255_122_0/0.75)] hover:-translate-y-0.5",
  secondary: "bg-navy text-white hover:bg-navy-700 hover:-translate-y-0.5 shadow-card",
  ghost: "text-navy hover:bg-navy/5",
  light: "bg-white text-navy hover:bg-mist hover:-translate-y-0.5 shadow-card",
  "outline-light":
    "border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/70",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Lien stylé en bouton. Les liens `tel:`/`mailto:`/externes utilisent un <a> natif. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >) {
  const classes = buttonClasses({ variant, size, className });
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
