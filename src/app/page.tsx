import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Images, Phone } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceZone } from "@/components/sections/ServiceZone";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
import { realisations } from "@/content/realisations";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Plomberie, chauffage, eau & gaz et construction à Quetigny",
    description: `${company.name} : plomberie, chauffage, installation d'eau et de gaz et construction de maisons individuelles à Quetigny, près de Dijon. Entreprise créée en 2004. Demandez votre devis.`,
    path: "/",
  }),
  title: { absolute: `${company.name} — Plomberie, chauffage & construction à Quetigny` },
};

const accentClasses = {
  blue: "bg-blue text-white",
  orange: "bg-orange text-ink",
  navy: "bg-navy text-white",
} as const;

const steps = [
  {
    title: "Vous nous contactez",
    text: "Par téléphone ou via le formulaire, vous nous présentez votre projet ou votre besoin.",
  },
  {
    title: "Nous étudions votre besoin",
    text: "Nous échangeons avec vous pour comprendre votre logement, vos contraintes et vos attentes.",
  },
  {
    title: "Vous recevez un devis",
    text: "Une proposition détaillée vous est remise pour décider en toute clarté.",
  },
  {
    title: "Nous réalisons les travaux",
    text: "L'intervention est menée avec soin, dans le respect de votre logement.",
  },
];

export default function HomePage() {
  const gallery = [
    realisations.find((r) => r.id === "maison-bois")!,
    realisations.find((r) => r.id === "sdb-douche-italienne")!,
    realisations.find((r) => r.id === "brasure")!,
    realisations.find((r) => r.id === "reseau-gaz")!,
    realisations.find((r) => r.id === "maison-blanche")!,
  ];

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative isolate overflow-hidden bg-navy-900 text-white">
        <Image
          src="/images/hero-maison-contemporaine.jpg"
          alt="Maison individuelle contemporaine éclairée à la tombée de la nuit"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[60%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/95 via-navy-900/75 to-navy-900/10"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy-900/90 to-transparent"
        />

        <Container className="flex min-h-[calc(100svh-6.5rem)] flex-col justify-between gap-14 pb-10 pt-20 md:pt-28 lg:min-h-[720px]">
          <div className="max-w-2xl">
            <div className="animate-fade-up">
              <Eyebrow tone="dark">Quetigny · Côte-d&apos;Or · Depuis 2004</Eyebrow>
            </div>
            <h1
              className="mt-6 animate-fade-up text-[2.75rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              Vos projets,
              <br />
              <span className="text-orange">notre savoir-faire</span>
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/85 sm:text-xl"
              style={{ animationDelay: "160ms" }}
            >
              Plomberie, chauffage, installation d&apos;eau et de gaz et construction de maisons
              individuelles : un seul interlocuteur pour votre habitat, à Quetigny et aux alentours
              de Dijon.
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <ButtonLink href="/contact" size="lg">
                Demander un devis
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </ButtonLink>
              <ButtonLink href={company.phone.href} size="lg" variant="outline-light">
                <Phone aria-hidden className="h-4 w-4" />
                Appeler le {company.phone.display}
              </ButtonLink>
            </div>
          </div>

          <ul
            aria-label="Nos quatre activités"
            className="grid animate-fade-up grid-cols-2 gap-3 lg:grid-cols-4"
            style={{ animationDelay: "320ms" }}
          >
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md transition hover:border-white/35 hover:bg-white/15 sm:p-4"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11",
                        accentClasses[s.accent],
                      )}
                    >
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold leading-tight sm:text-[0.95rem]">
                      {s.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="ml-auto hidden h-4 w-4 shrink-0 text-white/50 transition group-hover:text-white sm:block"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ───────────── PRÉSENTATION ───────────── */}
      <section className="py-20 md:py-28" aria-labelledby="presentation-title">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-[5/5]">
              <Image
                src="/images/artisan-brasure.jpg"
                alt="Artisan réalisant une brasure sur une canalisation en cuivre"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 w-[48%] overflow-hidden rounded-2xl border-[6px] border-white shadow-lift sm:-right-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/plans-construction.jpg"
                  alt="Plans de construction annotés sur une table"
                  fill
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -left-2 top-8 rounded-2xl bg-orange px-5 py-4 text-ink shadow-lift sm:-left-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em]">Depuis</p>
              <p className="font-display text-4xl font-extrabold leading-none">
                {company.foundedYear}
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="L'entreprise"
              title={
                <span id="presentation-title">
                  Une entreprise locale, des métiers complémentaires
                </span>
              }
              intro={`Créée en ${company.foundedLabel}, ${company.name} accompagne les particuliers dans leurs projets d'habitat depuis plus de vingt ans. Depuis Quetigny, l'entreprise réunit les métiers de la plomberie, du chauffage, des installations d'eau et de gaz et de la construction de maisons individuelles.`}
            />
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Cette complémentarité permet d&apos;aborder chaque projet dans sa globalité : un
              dépannage, une rénovation ou une maison neuve bénéficient du même regard technique.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4">
              {[
                { value: String(company.foundedYear), label: "Année de création" },
                { value: "4", label: "Métiers complémentaires" },
                { value: "Quetigny", label: "Siège en Côte-d'Or" },
                { value: company.legalForm, label: "Forme juridique" },
              ].map((fact, i) => (
                <Reveal
                  key={fact.label}
                  delay={i * 70}
                  className="rounded-2xl border border-line bg-mist/60 p-5"
                >
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
                    {fact.value}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <Link
              href="/a-propos"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-navy"
            >
              Découvrir l&apos;entreprise
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Container>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section className="bg-mist py-20 md:py-28" aria-labelledby="services-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Nos services"
              title={<span id="services-title">Quatre savoir-faire au service de votre habitat</span>}
            />
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 font-semibold text-navy"
            >
              Tous nos services
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal as="li" key={s.slug} delay={i * 80}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="relative">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={s.image.src}
                          alt={s.image.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                      <span
                        className={cn(
                          "absolute bottom-0 left-5 flex h-12 w-12 translate-y-1/2 items-center justify-center rounded-xl shadow-card ring-4 ring-white",
                          accentClasses[s.accent],
                        )}
                      >
                        <Icon aria-hidden className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 pt-9">
                      <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                        {s.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                        En savoir plus
                        <ArrowRight
                          aria-hidden
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ───────────── DÉMARCHE ───────────── */}
      <section
        className="relative overflow-hidden bg-navy py-20 text-white md:py-28"
        aria-labelledby="demarche-title"
      >
        <div aria-hidden className="bg-blueprint absolute inset-0" />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Notre démarche"
            title={<span id="demarche-title">Un projet mené pas à pas</span>}
            intro="Que vous ayez besoin d'une intervention ponctuelle ou que vous prépariez la construction de votre maison, la démarche reste simple et transparente."
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 90}
                className="relative rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm"
              >
                <span className="font-display text-5xl font-extrabold text-orange/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────────── RÉALISATIONS ───────────── */}
      <section className="py-20 md:py-28" aria-labelledby="realisations-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Réalisations"
              title={<span id="realisations-title">Des projets à votre image</span>}
              intro="Salles de bains, réseaux de chauffage, installations de gaz ou maisons neuves : un aperçu des types de projets que nous accompagnons."
            />
            <Link
              href="/realisations"
              className="group inline-flex shrink-0 items-center gap-2 font-semibold text-navy"
            >
              Voir la galerie
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
            {gallery.map((item, i) => (
              <Reveal
                key={item.id}
                delay={i * 60}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-mist",
                  i === 0 && "col-span-2 row-span-2",
                )}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">
                  {item.title}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <Images aria-hidden className="h-4 w-4 text-blue" />
            Visuels d&apos;illustration — les photos des chantiers d&apos;ADT Services seront
            intégrées prochainement.
          </p>
        </Container>
      </section>

      <ServiceZone />
      <CtaBand />
    </>
  );
}
