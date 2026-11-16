import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { agency, company, navigation } from "@/content/company";
import { services } from "@/content/services";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="bg-blueprint absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="ADT Services — accueil" className="inline-block rounded-lg">
              <Logo tone="dark" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Plomberie, chauffage, installation d&apos;eau et de gaz et construction de maisons
              individuelles. Entreprise implantée à {company.address.city} depuis{" "}
              {company.foundedYear}.
            </p>
          </div>

          <nav aria-label="Plan du site" className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Navigation
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Métiers
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-white/80 transition hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={company.phone.href}
                  className="group inline-flex items-center gap-3 font-semibold text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-ink">
                    <Phone aria-hidden className="h-4 w-4" />
                  </span>
                  <span className="text-base group-hover:underline">{company.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-3 text-white/80 hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <MapPin aria-hidden className="h-4 w-4" />
                  </span>
                  <span>
                    {company.address.street}
                    <br />
                    {company.address.postalCode} {company.address.city}
                    <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
                    <ArrowUpRight aria-hidden className="ml-1 inline h-3.5 w-3.5 opacity-60" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            {company.name} — {company.legalForm} — SIRET {company.siret} — Créée en{" "}
            {company.foundedLabel}
          </p>
          <p>
            Site de démonstration conçu par {agency.name}. Photographies d&apos;illustration
            (Unsplash).
          </p>
        </div>
      </div>
    </footer>
  );
}
