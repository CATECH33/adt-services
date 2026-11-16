/**
 * Formulaire de contact — logique partagée entre le navigateur et le serveur.
 *
 * Intégration backend :
 *  1. Définir NEXT_PUBLIC_CONTACT_ENABLED=true.
 *  2. Implémenter l'envoi (e-mail transactionnel, CRM…) dans src/app/api/contact/route.ts.
 * Tant que ce n'est pas fait, le formulaire fonctionne en mode démonstration
 * et l'interface indique explicitement qu'aucun message n'est envoyé.
 */

export const contactFields = [
  "fullName",
  "phone",
  "email",
  "service",
  "projectAddress",
  "message",
  "consent",
] as const;

export type ContactField = (typeof contactFields)[number];

export type ContactRequest = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  projectAddress: string;
  message: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<ContactField, string>>;

export const allowedServices = ["plomberie", "chauffage", "gaz", "construction", "autre"];

/** Téléphone français : 0X XX XX XX XX ou +33 X XX XX XX XX (espaces, points, tirets tolérés). */
export const phonePattern = "^(?:(?:\\+|00)33\\s?|0)[1-9](?:[\\s.\\-]?\\d{2}){4}$";
const phoneRegex = new RegExp(phonePattern);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const limits = {
  fullName: { min: 2, max: 80 },
  projectAddress: { min: 5, max: 160 },
  message: { min: 20, max: 2000 },
} as const;

export function validateContact(data: ContactRequest): ContactErrors {
  const errors: ContactErrors = {};
  const name = data.fullName.trim();
  if (!name) errors.fullName = "Indiquez votre nom et prénom.";
  else if (name.length < limits.fullName.min || name.length > limits.fullName.max)
    errors.fullName = `Entre ${limits.fullName.min} et ${limits.fullName.max} caractères.`;

  const phone = data.phone.trim();
  if (!phone) errors.phone = "Indiquez un numéro de téléphone.";
  else if (!phoneRegex.test(phone))
    errors.phone = "Numéro invalide. Exemple : 06 12 34 56 78.";

  const email = data.email.trim();
  if (!email) errors.email = "Indiquez votre adresse e-mail.";
  else if (!emailRegex.test(email)) errors.email = "Adresse e-mail invalide.";

  if (!allowedServices.includes(data.service))
    errors.service = "Choisissez le type de prestation.";

  const address = data.projectAddress.trim();
  if (!address) errors.projectAddress = "Indiquez l'adresse ou la commune du projet.";
  else if (address.length < limits.projectAddress.min)
    errors.projectAddress = "Adresse trop courte.";
  else if (address.length > limits.projectAddress.max)
    errors.projectAddress = `${limits.projectAddress.max} caractères maximum.`;

  const message = data.message.trim();
  if (!message) errors.message = "Décrivez votre besoin.";
  else if (message.length < limits.message.min)
    errors.message = `Merci de détailler votre besoin (${limits.message.min} caractères minimum).`;
  else if (message.length > limits.message.max)
    errors.message = `${limits.message.max} caractères maximum.`;

  if (!data.consent) errors.consent = "Votre accord est nécessaire pour traiter votre demande.";

  return errors;
}

export const contactEnabled = process.env.NEXT_PUBLIC_CONTACT_ENABLED === "true";

export type SubmitResult =
  | { status: "demo" }
  | { status: "sent" }
  | { status: "error"; message: string; errors?: ContactErrors };

export async function submitContactRequest(data: ContactRequest): Promise<SubmitResult> {
  if (!contactEnabled) return { status: "demo" };
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return { status: "sent" };
    const body = (await res.json().catch(() => ({}))) as { message?: string; errors?: ContactErrors };
    return {
      status: "error",
      message: body.message ?? "L'envoi a échoué. Merci de nous appeler directement.",
      errors: body.errors,
    };
  } catch {
    return { status: "error", message: "Connexion impossible. Merci de nous appeler directement." };
  }
}
