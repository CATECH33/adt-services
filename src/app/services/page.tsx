import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck, Phone } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Nos services : plomberie, chauffage, eau & gaz, construction",
  description:
    "Plomberie, chauffage, installation d'eau et de gaz et construction de maisons individuelles : découvrez les métiers d'ADT Services à Quetigny, près de Dijon.",
  path: "/services",
});

const accent = {
  blue: { chip: "bg-blue text-white", soft: "bg-blue-50 text-navy", check: "text-blue" },
  orange: { chip: "bg-orange text-ink", soft: "bg-orange-50 text-ink", check: "text-orange-600" },
  navy: { chip: "bg-navy text-white", soft: "bg-mist text-navy", check: "text-navy" },
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        breadcrumb="Services"
        title="Quatre métiers, une même exigence"
        intro="De l'entretien de votre installation à la construction de votre maison, ADT Services réunit des compétences complémentaires pour votre habitat."
        image={{ src: "/images/plans-construction.jpg", alt: "" }}
      >
        <nav aria-label="Accès rapide aux services" className="mt-9">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
                >
                  {s.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="py-12 md:py-16">
        {services.map((s, index) => {
          const Icon = s.icon;
          const a = accent[s.accent];
          const reversed = index % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="py-12 md:py-16"
            >
              <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn("relative", reversed && "lg:order-2")}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lift ring-[6px] ring-white",
                      reversed ? "right-6" : "left-6",
                      a.chip,
                    )}
                  >
                    <Icon aria-hidden className="h-7 w-7" />
                  </span>
                </Reveal>

                <div className={cn(reversed && "lg:order-1")}>
                  <Eyebrow>{`0${index + 1} — ${s.shortTitle}`}</Eyebrow>
                  <h2
                    id={`${s.slug}-title`}
                    className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl"
                  >
                    {s.title}
                  </h2>
                  <p className="mt-3 text-lg font-medium text-navy">{s.tagline}</p>
                  {s.description.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}

                  <div className={cn("mt-7 rounded-2xl p-6", a.soft)}>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em]">
                      Exemples de prestations
                    </h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {s.scope.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-snug text-ink">
                          <CircleCheck aria-hidden className={cn("mt-0.5 h-4 w-4 shrink-0", a.check)} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={`/contact?prestation=${s.slug}`}>
                      {s.cta}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </ButtonLink>
                    <ButtonLink href={company.phone.href} variant="ghost">
                      <Phone aria-hidden className="h-4 w-4" />
                      {company.phone.display}
                    </ButtonLink>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <section className="bg-mist py-16">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-2xl text-lg text-ink">
            <strong className="font-display text-xl">Un projet qui mêle plusieurs métiers ?</strong>{" "}
            <span className="text-muted">
              Rénovation de salle de bains avec chauffage, raccordement gaz d&apos;une maison neuve…
              Décrivez-nous l&apos;ensemble de votre projet.
            </span>
          </p>
          <Link
            href="/realisations"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-navy"
          >
            Voir les réalisations
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
