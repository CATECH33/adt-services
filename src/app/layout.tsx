import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { defaultDescription, isIndexable, ogImage, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Plomberie, chauffage & construction à Quetigny`,
    template: `%s | ${company.name}`,
  },
  description: defaultDescription,
  applicationName: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: company.name,
    title: `${company.name} — Vos projets, notre savoir-faire`,
    description: defaultDescription,
    url: "/",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image" },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0B3D91",
  width: "device-width",
  initialScale: 1,
};

/** Données structurées : uniquement des informations factuelles. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Plumber", "HomeAndConstructionBusiness"],
  name: company.name,
  url: siteUrl,
  telephone: company.phone.e164,
  foundingDate: company.foundingDateISO,
  image: `${siteUrl}${ogImage.url}`,
  logo: `${siteUrl}/logo-adt-services.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.city,
    addressCountry: company.address.countryCode,
  },
  areaServed: { "@type": "City", name: "Quetigny" },
  identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: company.siret },
  knowsAbout: services.map((s) => s.title),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${bricolage.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-orange px-5 py-3 font-semibold text-ink shadow-lift transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
