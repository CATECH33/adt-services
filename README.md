# ADT Services — site vitrine

Site vitrine professionnel d'**ADT Services** (SARL, Quetigny — plomberie, chauffage,
installation d'eau et de gaz, construction de maisons individuelles).
Proposition commerciale réalisée par **CA-TECH**.

> ⚠️ **Site de démonstration.** Les photographies sont des visuels d'illustration libres de
> droits (Unsplash) et ne représentent pas des chantiers d'ADT Services. Le formulaire de
> contact n'envoie aucun message tant que le backend n'est pas branché.

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
```

## Contrôles qualité

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run build        # build de production
```

## Pages

| Route           | Contenu                                                              |
| --------------- | -------------------------------------------------------------------- |
| `/`             | Hero, activités, entreprise, services, démarche, galerie, zone, CTA  |
| `/services`     | Plomberie, chauffage, eau & gaz, construction (ancres `#slug`)       |
| `/realisations` | Galerie filtrable + visionneuse (visuels d'illustration)             |
| `/a-propos`     | Histoire depuis 2004, activités, approche, fiche entreprise          |
| `/contact`      | Formulaire validé côté navigateur, téléphone, adresse                |

## Configuration (`.env.example`)

| Variable                      | Rôle                                                        |
| ----------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | URL publique (canonical, Open Graph, sitemap, JSON-LD)      |
| `NEXT_PUBLIC_SITE_INDEXABLE`  | `true` pour autoriser l'indexation (par défaut : `noindex`) |
| `NEXT_PUBLIC_CONTACT_ENABLED` | `true` pour activer l'envoi réel du formulaire              |

## Mise en production — checklist

1. Remplacer les photos de `public/images/` et `src/content/realisations.ts` par les photos
   des chantiers d'ADT Services (`isIllustration: false`).
2. Valider les textes (services, zone d'intervention) dans `src/content/`.
3. Brancher l'envoi du formulaire dans `src/app/api/contact/route.ts` puis
   `NEXT_PUBLIC_CONTACT_ENABLED=true`.
4. Ajouter une page de mentions légales (gérant, hébergeur) et la politique de confidentialité.
5. Retirer le bandeau `DemoBar`, définir `NEXT_PUBLIC_SITE_URL` et `NEXT_PUBLIC_SITE_INDEXABLE=true`.

Règles du projet et design system : voir [`CLAUDE.md`](./CLAUDE.md).
