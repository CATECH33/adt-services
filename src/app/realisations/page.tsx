import { Info } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { categories, realisations } from "@/content/realisations";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Réalisations",
  description:
    "Galerie de projets en plomberie, chauffage, installation d'eau et de gaz et construction de maisons individuelles — ADT Services, Quetigny.",
  path: "/realisations",
});

export default function RealisationsPage() {
  const hasIllustrations = realisations.some((r) => r.isIllustration);

  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        breadcrumb="Réalisations"
        title="Des projets pensés dans le détail"
        intro="Salles de bains, chauffage, réseaux d'eau et de gaz, maisons individuelles : parcourez les types de projets que nous accompagnons."
        image={{ src: "/images/maison-bois.jpg", alt: "" }}
      />

      <section className="py-16 md:py-24" aria-label="Galerie">
        <Container>
          {hasIllustrations && (
            <div
              role="note"
              className="mb-10 flex gap-4 rounded-2xl border border-blue/25 bg-blue-50 p-5 text-sm leading-relaxed text-ink sm:p-6"
            >
              <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
              <p>
                <strong className="font-semibold">Galerie de démonstration.</strong> Les images
                présentées ici sont des visuels d&apos;illustration libres de droits. Elles ne
                représentent pas des chantiers réalisés par ADT Services et seront remplacées par
                les photos des réalisations de l&apos;entreprise.
              </p>
            </div>
          )}
          <Gallery items={realisations} categories={categories} />
        </Container>
      </section>

      <CtaBand
        title="Votre projet sera peut-être le prochain"
        text="Parlez-nous de votre salle de bains, de votre chauffage, de votre installation de gaz ou de votre future maison."
      />
    </>
  );
}
