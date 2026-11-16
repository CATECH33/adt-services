import type { Metadata } from "next";
import { company } from "@/content/company";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Le site de démonstration n'est pas indexé tant que le client n'a pas validé. */
export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export const defaultDescription = `${company.name}, entreprise de plomberie, chauffage, installation d'eau et de gaz et construction de maisons individuelles à Quetigny (21), près de Dijon. Depuis 2004.`;

export const ogImage = {
  url: "/images/hero-maison-contemporaine.jpg",
  width: 2400,
  height: 1500,
  alt: "Maison individuelle contemporaine",
};

/** Construit les métadonnées d'une page avec canonical et Open Graph cohérents. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: path,
      siteName: company.name,
      locale: "fr_FR",
      type: "website",
      images: [ogImage],
    },
  };
}
