import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  image: { src: string; alt: string };
  breadcrumb: string;
  children?: React.ReactNode;
};

/** En-tête des pages intérieures : photo, voile navy, fil d'Ariane. */
export function PageHero({ eyebrow, title, intro, image, breadcrumb, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/30"
      />
      <Container className="py-20 md:py-28">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-white/70">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">
                Accueil
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-white">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}
