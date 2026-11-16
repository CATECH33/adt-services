import { NextResponse } from "next/server";
import { type ContactRequest, validateContact } from "@/lib/contact";

/**
 * Point d'entrée du formulaire de contact.
 *
 * Statut : NON BRANCHÉ (démonstration). La requête est validée côté serveur,
 * puis une réponse 501 est renvoyée : aucun message n'est transmis.
 *
 * Pour la mise en production, remplacer le bloc « TODO » par l'envoi réel
 * (service d'e-mail transactionnel, CRM…) en lisant les secrets depuis
 * les variables d'environnement serveur, puis renvoyer { ok: true }.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const p = (payload ?? {}) as Record<string, unknown>;
  const data: ContactRequest = {
    fullName: String(p.fullName ?? ""),
    phone: String(p.phone ?? ""),
    email: String(p.email ?? ""),
    service: String(p.service ?? ""),
    projectAddress: String(p.projectAddress ?? ""),
    message: String(p.message ?? ""),
    consent: p.consent === true,
  };

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Certains champs sont invalides.", errors }, { status: 422 });
  }

  // TODO (intégration) : transmettre la demande à ADT Services.
  return NextResponse.json(
    {
      message:
        "L'envoi en ligne n'est pas encore activé. Merci de contacter ADT Services par téléphone.",
    },
    { status: 501 },
  );
}
