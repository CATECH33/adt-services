@AGENTS.md

# ADT Services — Règles du projet

Site vitrine de **ADT Services** (SARL, Quetigny), réalisé par **CA-TECH** comme
proposition commerciale. Application Next.js réelle, destinée à être déployée en
démonstration puis reprise comme site officiel après validation par le client.

## Stack

- Next.js 16 (App Router, Turbopack, `cacheComponents: true`), React 19, TypeScript strict.
- Tailwind CSS v4 : les tokens du design system sont dans `src/app/globals.css` (`@theme`).
- Icônes : `lucide-react` uniquement. Images : `next/image` uniquement.
- **Server Components par défaut.** `"use client"` seulement pour l'interactivité
  (navigation mobile, filtre de galerie, formulaire, animations au scroll).
- Aucune autre dépendance sans justification. Pas de Stripe, Supabase, auth, CMS.
- Pas de `new Date()` / `Math.random()` dans les composants serveur (incompatible
  avec le prérendu `cacheComponents`).

## Commandes

```bash
npm run dev        # développement
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # build de production (doit passer avant toute livraison)
```

## Données de l'entreprise (seules données factuelles autorisées)

Source unique : `src/content/company.ts`. Ne jamais dupliquer ces valeurs en dur.

- ADT Services — SARL — créée en mai 2004 — SIRET 452 932 858 00049
- 9 Rue de l'Enclume, 21800 Quetigny, France — 06 48 30 23 03
- Activités : plomberie, chauffage, installation d'eau et de gaz, construction de maisons individuelles

## Règles éditoriales — NON NÉGOCIABLES

- Pas de faux avis clients, notes, témoignages ou logos de partenaires.
- Pas de certifications, labels, qualifications (RGE, Qualigaz, PG…) ni assurances/garanties inventés.
- Pas de tarifs, délais chiffrés, nombres de chantiers ou de clients inventés.
- Pas de nom de dirigeant, d'e-mail ou d'horaires inventés.
- Les photos sont des **visuels d'illustration** (Unsplash). Elles ne doivent jamais
  être présentées comme des chantiers d'ADT Services : chaque élément de
  `src/content/realisations.ts` porte `isIllustration: true` et l'UI l'affiche.
- Le formulaire de contact ne doit jamais prétendre qu'un message a été envoyé
  tant que le backend n'est pas branché (`NEXT_PUBLIC_CONTACT_ENABLED`).
- Toute information à confirmer par le client est listée dans « Contenus à valider » ci-dessous.

## Design system

- Couleurs : `navy #0B3D91`, `blue #0F8BEF`, `orange #FF7A00`, `mist #F4F5F8`, `white`, `ink #0A1F44` (texte).
- Contraste : l'orange et le bleu ne servent pas de couleur de texte courant sur fond blanc.
  Bouton primaire = fond orange + texte `ink`.
- Typographies : `Bricolage Grotesque` (titres, `font-display`) + `Inter` (texte, `font-sans`).
- Rayons : cartes `rounded-2xl`, boutons `rounded-full`. Ombres douces (`shadow-card`).
- Espacements de section : `py-20 md:py-28`. Conteneur : composant `<Container>`.
- Animations discrètes via `<Reveal>` ; `prefers-reduced-motion` respecté.

## Architecture

```
src/app/                 routes : /, /services, /realisations, /a-propos, /contact
src/app/api/contact/     route handler prêt pour l'intégration e-mail/CRM (désactivé en démo)
src/components/brand/    logo SVG
src/components/layout/   Header, MobileNav, Footer, DemoBar
src/components/ui/       primitives (Button, Container, SectionHeading, Reveal…)
src/components/sections/ blocs de page réutilisables
src/content/             contenus et données (source unique)
src/lib/                 utilitaires, validation du formulaire
public/images/           photos (à remplacer par celles du client)
```

## Accessibilité & SEO

- Lien d'évitement, focus visibles, `aria-*` sur la navigation mobile, la galerie et le formulaire.
- Chaque page exporte `metadata` (title, description, canonical, Open Graph).
- JSON-LD `LocalBusiness` limité aux données factuelles.
- `robots` en `noindex` sauf si `NEXT_PUBLIC_SITE_INDEXABLE=true` (site de démonstration).

## Contenus à valider avec le client

- Zone d'intervention exacte (communes listées = voisinage géographique de Quetigny).
- Description détaillée des prestations par métier.
- Adresse e-mail de contact, horaires, éventuelles qualifications réelles.
- Photos réelles de chantiers (remplacer `public/images/*` et `src/content/realisations.ts`).
- Mentions légales complètes (gérant, hébergeur) avant mise en production.
