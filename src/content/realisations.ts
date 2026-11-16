import type { ServiceSlug } from "./services";

/**
 * Galerie de la page « Réalisations ».
 *
 * IMPORTANT : en phase de démonstration, toutes les images sont des visuels
 * d'illustration libres de droits (Unsplash) et NE SONT PAS des chantiers
 * réalisés par ADT Services. Pour publier une vraie réalisation :
 *   1. déposer la photo dans /public/images/realisations/
 *   2. ajouter une entrée avec isIllustration: false et une légende réelle.
 */
export type Realisation = {
  id: string;
  category: ServiceSlug;
  title: string;
  caption: string;
  image: { src: string; alt: string; width: number; height: number };
  isIllustration: boolean;
};

export const categories: { value: ServiceSlug | "tous"; label: string }[] = [
  { value: "tous", label: "Tout voir" },
  { value: "plomberie", label: "Plomberie" },
  { value: "chauffage", label: "Chauffage" },
  { value: "gaz", label: "Eau & gaz" },
  { value: "construction", label: "Construction" },
];

const L = { width: 1400, height: 1000 };

export const realisations: Realisation[] = [
  {
    id: "sdb-douche-italienne",
    category: "plomberie",
    title: "Salle de bains avec douche vitrée",
    caption: "Exemple de type de projet : rénovation complète d'une salle de bains.",
    image: { src: "/images/salle-de-bains-1.jpg", alt: "Salle de bains lumineuse avec douche vitrée et double vasque", ...L },
    isIllustration: true,
  },
  {
    id: "maison-bois",
    category: "construction",
    title: "Maison contemporaine à bardage bois",
    caption: "Exemple de type de projet : maison individuelle neuve.",
    image: { src: "/images/maison-bois.jpg", alt: "Maison contemporaine à bardage bois et noir", ...L },
    isIllustration: true,
  },
  {
    id: "reseau-gaz",
    category: "gaz",
    title: "Réseau de distribution",
    caption: "Exemple de type de projet : création d'un réseau intérieur.",
    image: { src: "/images/service-gaz.jpg", alt: "Canalisations et compteurs sur un mur de briques", width: 1600, height: 1100 },
    isIllustration: true,
  },
  {
    id: "thermostat",
    category: "chauffage",
    title: "Régulation du chauffage",
    caption: "Exemple de type de projet : pose d'un thermostat d'ambiance.",
    image: { src: "/images/service-chauffage.jpg", alt: "Thermostat d'ambiance connecté", width: 1600, height: 1100 },
    isIllustration: true,
  },
  {
    id: "sdb-baignoire",
    category: "plomberie",
    title: "Baignoire îlot et vasque à poser",
    caption: "Exemple de type de projet : installation d'équipements sanitaires.",
    image: { src: "/images/salle-de-bains-2.jpg", alt: "Salle de bains blanche avec baignoire îlot", ...L },
    isIllustration: true,
  },
  {
    id: "chantier-fondations",
    category: "construction",
    title: "Préparation de chantier",
    caption: "Exemple de type de projet : phase de gros œuvre.",
    image: { src: "/images/chantier-fondations.jpg", alt: "Équipe sur un chantier en phase de fondations", ...L },
    isIllustration: true,
  },
  {
    id: "brasure",
    category: "chauffage",
    title: "Travail du cuivre",
    caption: "Exemple de type de projet : réalisation d'un réseau en cuivre.",
    image: { src: "/images/artisan-brasure.jpg", alt: "Artisan réalisant une brasure au chalumeau", width: 1600, height: 1200 },
    isIllustration: true,
  },
  {
    id: "maison-blanche",
    category: "construction",
    title: "Maison aux volumes épurés",
    caption: "Exemple de type de projet : maison individuelle neuve.",
    image: { src: "/images/maison-blanche.jpg", alt: "Maison blanche aux volumes cubiques", ...L },
    isIllustration: true,
  },
  {
    id: "cuisine",
    category: "gaz",
    title: "Cuisine équipée",
    caption: "Exemple de type de projet : raccordement d'un appareil de cuisson.",
    image: { src: "/images/cuisine-gaz.jpg", alt: "Cuisine équipée avec plan de cuisson", ...L },
    isIllustration: true,
  },
  {
    id: "sdb-moderne",
    category: "plomberie",
    title: "Salle de bains contemporaine",
    caption: "Exemple de type de projet : création d'une salle de bains.",
    image: { src: "/images/salle-de-bains-3.jpg", alt: "Salle de bains contemporaine avec claustra bois", ...L },
    isIllustration: true,
  },
  {
    id: "renovation",
    category: "construction",
    title: "Rénovation intérieure",
    caption: "Exemple de type de projet : reprise des réseaux en rénovation.",
    image: { src: "/images/renovation-interieur.jpg", alt: "Pièce en cours de rénovation, murs ouverts", ...L },
    isIllustration: true,
  },
  {
    id: "sdb-sombre",
    category: "plomberie",
    title: "Salle de bains aux tons sombres",
    caption: "Exemple de type de projet : rénovation de salle de bains.",
    image: { src: "/images/salle-de-bains-4.jpg", alt: "Salle de bains aux tons gris avec baignoire", ...L },
    isIllustration: true,
  },
];
