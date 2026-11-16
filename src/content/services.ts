import type { LucideIcon } from "lucide-react";
import { Droplets, Flame, Gauge, House } from "lucide-react";

export type ServiceSlug = "plomberie" | "chauffage" | "gaz" | "construction";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  accent: "blue" | "orange" | "navy";
  tagline: string;
  summary: string;
  description: string[];
  /** Exemples de prestations — à ajuster avec le client. */
  scope: string[];
  image: { src: string; alt: string };
  cta: string;
};

export const services: Service[] = [
  {
    slug: "plomberie",
    title: "Plomberie",
    shortTitle: "Plomberie",
    icon: Droplets,
    accent: "blue",
    tagline: "Des réseaux d'eau fiables, du compteur au robinet.",
    summary:
      "Installation, remplacement et dépannage d'équipements sanitaires et de réseaux d'alimentation et d'évacuation.",
    description: [
      "La plomberie est au cœur du confort quotidien. ADT Services intervient pour l'installation et la rénovation des réseaux d'eau de votre logement, en neuf comme en rénovation.",
      "De la pose d'un équipement sanitaire à la reprise complète d'une installation, chaque intervention est préparée pour s'intégrer proprement à votre habitat.",
    ],
    scope: [
      "Installation et remplacement d'équipements sanitaires",
      "Alimentation en eau et réseaux d'évacuation",
      "Rénovation de salle de bains et de cuisine (partie plomberie)",
      "Recherche et réparation de fuites",
    ],
    image: {
      src: "/images/service-plomberie.jpg",
      alt: "Robinetterie chromée au-dessus d'une baignoire",
    },
    cta: "Demander un devis plomberie",
  },
  {
    slug: "chauffage",
    title: "Chauffage",
    shortTitle: "Chauffage",
    icon: Flame,
    accent: "orange",
    tagline: "Un confort thermique pensé pour votre logement.",
    summary:
      "Installation, remplacement et entretien de systèmes de chauffage et de leurs réseaux de distribution.",
    description: [
      "Un chauffage bien dimensionné, c'est un logement agréable toute l'année. ADT Services étudie votre configuration pour vous proposer une installation adaptée à votre habitat et à vos usages.",
      "Remplacement d'un équipement existant ou installation complète dans le neuf : l'objectif reste le même, un système efficace et durable.",
    ],
    scope: [
      "Installation et remplacement de chaudières",
      "Réseaux de chauffage et émetteurs (radiateurs, planchers)",
      "Régulation et thermostats",
      "Mise en service et entretien des installations",
    ],
    image: {
      src: "/images/service-chauffage.jpg",
      alt: "Thermostat d'ambiance connecté fixé sur un mur clair",
    },
    cta: "Demander un devis chauffage",
  },
  {
    slug: "gaz",
    title: "Installation d'eau et de gaz",
    shortTitle: "Eau & gaz",
    icon: Gauge,
    accent: "navy",
    tagline: "Des installations réalisées avec rigueur.",
    summary:
      "Création, modification et raccordement d'installations intérieures d'eau et de gaz.",
    description: [
      "Les installations d'eau et de gaz demandent méthode et précision. ADT Services réalise la création et la modification des réseaux intérieurs, du point de livraison jusqu'aux appareils.",
      "Chaque projet est étudié au cas par cas afin de respecter la configuration de votre logement et la réglementation applicable.",
    ],
    scope: [
      "Création et modification de réseaux intérieurs",
      "Raccordement d'appareils (chaudière, cuisson, production d'eau chaude)",
      "Distribution d'eau froide et d'eau chaude sanitaire",
      "Remplacement de canalisations",
    ],
    image: {
      src: "/images/service-gaz.jpg",
      alt: "Canalisations et compteurs fixés sur un mur de briques",
    },
    cta: "Demander un devis eau & gaz",
  },
  {
    slug: "construction",
    title: "Construction de maisons individuelles",
    shortTitle: "Construction",
    icon: House,
    accent: "navy",
    tagline: "Votre maison, de l'idée à la remise des clés.",
    summary:
      "Accompagnement dans la construction de maisons individuelles, avec la maîtrise des lots techniques.",
    description: [
      "Construire sa maison est un projet de vie. ADT Services vous accompagne dans la réalisation de votre maison individuelle, avec l'avantage de maîtriser en interne les métiers techniques : plomberie, chauffage, eau et gaz.",
      "Cette double compétence permet d'anticiper les réseaux dès la conception et d'assurer une coordination fluide entre les étapes du chantier.",
    ],
    scope: [
      "Échange sur votre projet et vos besoins",
      "Étude et préparation du chantier",
      "Coordination des travaux",
      "Réalisation des lots plomberie, chauffage, eau et gaz",
    ],
    image: {
      src: "/images/service-construction.jpg",
      alt: "Maison individuelle contemporaine avec bardage bois et jardin",
    },
    cta: "Parler de mon projet de construction",
  },
];

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "autre", label: "Autre demande" },
] as const;
