import { ArrowRight, Phone } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";

export default function NotFound() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <LogoMark className="h-16 w-16" />
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-navy">Erreur 404</p>
        <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">Cette page est introuvable</h1>
        <p className="mt-4 max-w-md text-muted">
          La page demandée n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">
            Retour à l&apos;accueil
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={company.phone.href} variant="secondary">
            <Phone aria-hidden className="h-4 w-4" />
            {company.phone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
