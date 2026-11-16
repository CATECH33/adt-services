import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em]",
        tone === "light" ? "text-navy" : "text-white/80",
        className,
      )}
    >
      <span aria-hidden className="h-[2px] w-7 rounded-full bg-orange" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center [&>p:first-child]:justify-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "mt-4 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-muted" : "text-white/75",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
