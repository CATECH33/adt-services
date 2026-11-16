/**
 * Source unique des données factuelles d'ADT Services.
 * Ne rien ajouter ici qui n'ait été fourni ou validé par le client.
 */
export const company = {
  name: "ADT Services",
  legalForm: "SARL",
  siret: "452 932 858 00049",
  foundedLabel: "mai 2004",
  foundedYear: 2004,
  foundingDateISO: "2004-05",
  phone: {
    display: "06 48 30 23 03",
    href: "tel:+33648302303",
    e164: "+33648302303",
  },
  address: {
    street: "9 Rue de l'Enclume",
    postalCode: "21800",
    city: "Quetigny",
    region: "Côte-d'Or",
    country: "France",
    countryCode: "FR",
  },
  activities: [
    "Plomberie",
    "Chauffage",
    "Installation d'eau et de gaz",
    "Construction de maisons individuelles",
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=9+Rue+de+l%27Enclume+21800+Quetigny",
} as const;

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;

/** Agence à l'origine de la proposition. */
export const agency = {
  name: "CA-TECH",
} as const;

export const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Communes géographiquement voisines de Quetigny.
 * Zone d'intervention exacte à confirmer avec le client.
 */
export const nearbyTowns = [
  "Quetigny",
  "Dijon",
  "Chevigny-Saint-Sauveur",
  "Saint-Apollinaire",
  "Sennecey-lès-Dijon",
  "Couternon",
  "Varois-et-Chaignot",
  "Neuilly-Crimolois",
  "Longvic",
  "Chenôve",
  "Talant",
  "Fontaine-lès-Dijon",
] as const;
