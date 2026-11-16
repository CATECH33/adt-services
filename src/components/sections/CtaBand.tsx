import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/company";

type Props = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = "Parlons de votre projet",
  text = "Plomberie, chauffage, eau et gaz ou construction : décrivez-nous votre besoin, nous revenons vers vous pour en discuter.",
}: Props) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 md:py-20 lg:px-16">
          <Image
            src="/images/maison-piscine.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-20 object-cover opacity-25"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy/90 to-navy-900/70"
          />
          <div
            aria-hidden
            className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-orange/30 blur-3xl"
          />
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row xl:justify-end">
              <ButtonLink href="/contact" size="lg">
                Demander un devis
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </ButtonLink>
              <ButtonLink href={company.phone.href} size="lg" variant="outline-light">
                <Phone aria-hidden className="h-4 w-4" />
                {company.phone.display}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
