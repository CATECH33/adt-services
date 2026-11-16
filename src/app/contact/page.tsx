import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact et demande de devis",
  description:
    "Contactez ADT Services à Quetigny : appelez le 06 48 30 23 03 ou décrivez votre projet de plomberie, chauffage, eau et gaz ou construction pour obtenir un devis.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumb="Contact"
        title="Demandez votre devis"
        intro="Décrivez-nous votre projet ou appelez-nous directement : nous prenons le temps de comprendre votre besoin."
        image={{ src: "/images/maison-piscine.jpg", alt: "" }}
      />

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <aside className="space-y-5 lg:sticky lg:top-36 lg:self-start" aria-label="Coordonnées">
            <a
              href={company.phone.href}
              className="group block overflow-hidden rounded-[1.75rem] bg-navy p-7 text-white shadow-lift transition hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange text-ink">
                <Phone aria-hidden className="h-5 w-5" />
              </span>
              <p className="mt-6 text-sm text-white/70">Le plus simple : appelez-nous</p>
              <p className="mt-1 font-display text-3xl font-bold tracking-tight">
                {company.phone.display}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                Appeler maintenant
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>

            <div className="rounded-[1.75rem] border border-line bg-white p-7 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-navy">
                <MapPin aria-hidden className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-sm font-semibold text-muted">Adresse de l&apos;entreprise</h2>
              <address className="mt-1 text-lg font-semibold not-italic leading-snug text-ink">
                {company.name}
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}, {company.address.country}
              </address>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
              >
                Voir sur la carte
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
              </a>
            </div>

            <p className="px-2 text-xs leading-relaxed text-muted">
              {company.name} — {company.legalForm} — SIRET {company.siret}
            </p>
          </aside>

          <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Votre demande</h2>
            <p className="mt-2 text-muted">
              Plus votre description est précise, plus notre réponse sera adaptée.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
