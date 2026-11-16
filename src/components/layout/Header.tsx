import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { company } from "@/content/company";
import { DemoBar } from "./DemoBar";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <DemoBar />
      <div className="border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
          <Link href="/" aria-label="ADT Services — accueil" className="rounded-lg">
            <Logo />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={company.phone.href}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-mist md:inline-flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue">
                <Phone aria-hidden className="h-4 w-4" />
              </span>
              <span>{company.phone.display}</span>
            </a>
            <div className="hidden sm:block">
              <ButtonLink href="/contact">Demander un devis</ButtonLink>
            </div>
            <a
              href={company.phone.href}
              aria-label={`Appeler ADT Services au ${company.phone.display}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange text-ink sm:hidden"
            >
              <Phone aria-hidden className="h-5 w-5" />
            </a>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
