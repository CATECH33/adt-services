import Image from "next/image";
import { Building2, CalendarDays, FileText, Handshake, MapPin, MessageSquare, Ruler, Sparkles } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceZone } from "@/components/sections/ServiceZone";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company, fullAddress } from "@/content/company";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "À propos",
  description:
    "ADT Services, SARL créée en mai 2004 et implantée à Quetigny (21) : plomberie, chauffage, installation d'eau et de gaz et construction de maisons individuelles.",
  path: "/a-propos",
});

const milestones = [
  {
    date: "Mai 2004",
    title: "Création de l'entreprise",
    text: `${company.name} est créée sous la forme d'une société à responsabilité limitée (SARL).`,
  },
  {
    date: "Métiers",
    title: "Des compétences complémentaires",
    text: "L'activité réunit la plomberie, le chauffage, l'installation d'eau et de gaz et la construction de maisons individuelles.",
  },
  {
    date: "Aujourd'hui",
    title: "Un ancrage à Quetigny",
    text: `L'entreprise est établie au ${fullAddress}, dans la métropole dijonnaise.`,
  },
];

const commitments = [
  {
    icon: MessageSquare,
    title: "L'écoute",
    text: "Comprendre votre logement, votre usage et vos priorités avant de proposer une solution.",
  },
  {
    icon: FileText,
    title: "La clarté",
    text: "Un devis détaillé et des explications simples pour décider sereinement.",
  },
  {
    icon: Ruler,
    title: "Le soin du travail",
    text: "Des installations propres, réalisées dans le respect de votre intérieur.",
  },
  {
    icon: Handshake,
    title: "La proximité",
    text: "Une entreprise locale, joignable directement par téléphone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        breadcrumb="À propos"
        title={
          <>
            Plus de vingt ans au service
            <br className="hidden sm:block" /> de votre habitat
          </>
        }
        intro={`Depuis ${company.foundedLabel}, ${company.name} met son savoir-faire au service des particuliers, depuis Quetigny.`}
        image={{ src: "/images/outillage.jpg", alt: "" }}
      />

      {/* Histoire */}
      <section className="py-20 md:py-28" aria-labelledby="histoire-title">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Notre histoire"
              title={<span id="histoire-title">Une entreprise construite sur le terrain</span>}
              intro={`Depuis sa création en ${company.foundedYear}, ${company.name} accompagne les particuliers dans leurs projets d'habitat : installations sanitaires, chauffage, réseaux d'eau et de gaz, maisons individuelles.`}
            />
            <p className="mt-5 leading-relaxed text-muted sm:text-lg">
              La réunion de ces métiers complémentaires au sein d&apos;une même entreprise permet
              d&apos;aborder chaque projet dans sa globalité, de l&apos;intervention ponctuelle
              jusqu&apos;à la construction d&apos;une maison.
            </p>
            <Reveal className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-lift">
              <Image
                src="/images/plans-construction.jpg"
                alt="Plans de maison annotés à la main"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <ol className="relative space-y-6 border-l-2 border-line pl-8 lg:mt-24">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 100} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.6rem] top-6 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-orange shadow-card"
                />
                <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-navy">{m.date}</p>
                  <h3 className="mt-2 text-xl font-bold text-ink">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Activités */}
      <section className="bg-mist py-20 md:py-28" aria-labelledby="activites-title">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Nos activités"
            title={<span id="activites-title">Quatre métiers, une vision d&apos;ensemble</span>}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  as="li"
                  key={s.slug}
                  delay={i * 70}
                  className="rounded-2xl bg-white p-6 shadow-card"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Engagements + fiche */}
      <section className="py-20 md:py-28" aria-labelledby="approche-title">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Notre approche"
              title={<span id="approche-title">Ce qui guide notre travail</span>}
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {commitments.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal as="li" key={c.title} delay={i * 70} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <Reveal delay={100}>
            <aside
              aria-labelledby="fiche-title"
              className="relative overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white shadow-lift"
            >
              <div aria-hidden className="bg-blueprint absolute inset-0" />
              <div className="relative">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  <Sparkles aria-hidden className="h-4 w-4 text-orange" />
                  Fiche entreprise
                </p>
                <h2 id="fiche-title" className="mt-3 text-2xl font-bold">
                  {company.name}
                </h2>
                <dl className="mt-6 divide-y divide-white/10 text-sm">
                  {[
                    { icon: Building2, label: "Forme juridique", value: company.legalForm },
                    { icon: CalendarDays, label: "Création", value: company.foundedLabel },
                    { icon: FileText, label: "SIRET", value: company.siret },
                    { icon: MapPin, label: "Adresse", value: fullAddress },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.label} className="flex items-start gap-3 py-3.5">
                        <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                        <dt className="w-32 shrink-0 text-white/60">{row.label}</dt>
                        <dd className="font-medium">{row.value}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <ServiceZone />
      <CtaBand />
    </>
  );
}
