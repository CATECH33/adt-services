"use client";

import { useEffect, useRef, useState } from "react";
import { CircleCheck, Info, LoaderCircle, Phone, Send, TriangleAlert } from "lucide-react";
import { company } from "@/content/company";
import { serviceOptions } from "@/content/services";
import {
  allowedServices,
  type ContactErrors,
  type ContactField,
  type ContactRequest,
  contactEnabled,
  limits,
  phonePattern,
  type SubmitResult,
  submitContactRequest,
  validateContact,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

const empty: ContactRequest = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  projectAddress: "",
  message: "",
  consent: false,
};

const fieldBase =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 transition focus:outline-none focus:ring-4";
const fieldOk = "border-line focus:border-blue focus:ring-blue/15";
const fieldErr = "border-red-500 focus:border-red-500 focus:ring-red-500/15";

export function ContactForm() {
  const [values, setValues] = useState<ContactRequest>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Pré-sélection depuis /contact?prestation=chauffage (liens de la page Services).
  useEffect(() => {
    const prestation = new URLSearchParams(window.location.search).get("prestation");
    if (prestation && allowedServices.includes(prestation)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
      setValues((v) => ({ ...v, service: prestation }));
    }
  }, []);

  const update = <K extends ContactField>(key: K, value: ContactRequest[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors((e) => ({ ...e, [key]: validateContact(next)[key] }));
    if (result) setResult(null);
  };

  const blur = (key: ContactField) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateContact(values)[key] }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validateContact(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));

    // Contrôle natif du navigateur (required, type, pattern…) en complément.
    if (Object.keys(found).length > 0 || !form.checkValidity()) {
      const firstKey = (Object.keys(empty) as ContactField[]).find((k) => found[k]);
      const target = firstKey
        ? form.querySelector<HTMLElement>(`[name="${firstKey}"]`)
        : form.querySelector<HTMLElement>(":invalid");
      target?.focus();
      return;
    }

    setPending(true);
    const res = await submitContactRequest(values);
    setPending(false);
    setResult(res);
    if (res.status === "error" && res.errors) setErrors(res.errors);
    if (res.status === "sent") {
      setValues(empty);
      setTouched({});
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const describedBy = (key: ContactField, hint?: boolean) =>
    [hint ? `${key}-hint` : null, errors[key] ? `${key}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  const renderError = (name: ContactField) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
        <TriangleAlert aria-hidden className="h-3.5 w-3.5 shrink-0" />
        {errors[name]}
      </p>
    ) : null;

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-intro" className="space-y-6">
      <p id="form-intro" className="text-sm text-muted">
        Les champs marqués d&apos;un <span className="font-semibold text-orange-600">*</span> sont
        obligatoires.
      </p>

      {errorCount > 0 && Object.keys(touched).length >= 7 && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorCount === 1
            ? "Un champ est à corriger avant l'envoi."
            : `${errorCount} champs sont à corriger avant l'envoi.`}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="text-sm font-semibold text-ink">
            Nom et prénom <span className="text-orange-600">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            minLength={limits.fullName.min}
            maxLength={limits.fullName.max}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => blur("fullName")}
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName")}
            className={cn(fieldBase, errors.fullName ? fieldErr : fieldOk)}
            placeholder="Prénom Nom"
          />
          {renderError("fullName")}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-ink">
            Téléphone <span className="text-orange-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            pattern={phonePattern}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={cn(fieldBase, errors.phone ? fieldErr : fieldOk)}
            placeholder="06 12 34 56 78"
          />
          {renderError("phone")}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            E-mail <span className="text-orange-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={cn(fieldBase, errors.email ? fieldErr : fieldOk)}
            placeholder="vous@exemple.fr"
          />
          {renderError("email")}
        </div>

        <div>
          <label htmlFor="service" className="text-sm font-semibold text-ink">
            Type de prestation <span className="text-orange-600">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            onBlur={() => blur("service")}
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            className={cn(
              fieldBase,
              "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230B3D91%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10",
              !values.service && "text-ink/45",
              errors.service ? fieldErr : fieldOk,
            )}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value} className="text-ink">
                {o.label}
              </option>
            ))}
          </select>
          {renderError("service")}
        </div>

        <div>
          <label htmlFor="projectAddress" className="text-sm font-semibold text-ink">
            Adresse du projet <span className="text-orange-600">*</span>
          </label>
          <input
            id="projectAddress"
            name="projectAddress"
            type="text"
            autoComplete="street-address"
            required
            minLength={limits.projectAddress.min}
            maxLength={limits.projectAddress.max}
            value={values.projectAddress}
            onChange={(e) => update("projectAddress", e.target.value)}
            onBlur={() => blur("projectAddress")}
            aria-invalid={!!errors.projectAddress}
            aria-describedby={describedBy("projectAddress")}
            className={cn(fieldBase, errors.projectAddress ? fieldErr : fieldOk)}
            placeholder="Rue, code postal, commune"
          />
          {renderError("projectAddress")}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="message" className="text-sm font-semibold text-ink">
              Description du besoin <span className="text-orange-600">*</span>
            </label>
            <span id="message-hint" className="text-xs text-muted" aria-live="polite">
              {values.message.trim().length} / {limits.message.max}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            minLength={limits.message.min}
            maxLength={limits.message.max}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", true)}
            className={cn(fieldBase, "resize-y", errors.message ? fieldErr : fieldOk)}
            placeholder="Nature des travaux, type de logement, délai souhaité…"
          />
          {renderError("message")}
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => {
              update("consent", e.target.checked);
              setTouched((t) => ({ ...t, consent: true }));
              setErrors((er) => ({
                ...er,
                consent: e.target.checked ? undefined : validateContact({ ...values, consent: false }).consent,
              }));
            }}
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-navy"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-ink/80">
            J&apos;accepte que les informations saisies soient utilisées par {company.name}{" "}
            pour traiter ma demande et me recontacter. Conformément au RGPD, je peux exercer mes droits d&apos;accès, de
            rectification et d&apos;effacement en contactant l&apos;entreprise.{" "}
            <span className="text-orange-600">*</span>
          </label>
        </div>
        {renderError("consent")}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-orange px-8 font-semibold text-ink shadow-[0_8px_20px_-8px_rgb(255_122_0/0.7)] transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:opacity-60"
        >
          {pending ? (
            <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
          ) : (
            <Send aria-hidden className="h-4 w-4" />
          )}
          {pending ? "Vérification…" : "Envoyer ma demande"}
        </button>
        {!contactEnabled && (
          <p className="flex items-center gap-2 text-xs text-muted">
            <Info aria-hidden className="h-4 w-4 shrink-0 text-blue" />
            Démonstration : l&apos;envoi en ligne n&apos;est pas encore activé.
          </p>
        )}
      </div>

      <div ref={resultRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {result?.status === "demo" && (
          <div className="animate-fade-up rounded-2xl border border-blue/30 bg-blue-50 p-6">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
              <CircleCheck aria-hidden className="h-5 w-5 text-blue" />
              Formulaire valide — mode démonstration
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              Toutes les informations sont correctement renseignées.{" "}
              <strong>Aucun message n&apos;a été envoyé</strong> : l&apos;envoi en ligne sera
              activé lors de la mise en service du site. Pour toute demande, contactez dès
              maintenant ADT Services par téléphone.
            </p>
            <a
              href={company.phone.href}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700"
            >
              <Phone aria-hidden className="h-4 w-4" />
              Appeler le {company.phone.display}
            </a>
          </div>
        )}
        {result?.status === "sent" && (
          <div className="animate-fade-up rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
            <p className="font-display text-lg font-bold">Merci, votre demande a bien été transmise.</p>
            <p className="mt-1 text-sm">ADT Services reviendra vers vous rapidement.</p>
          </div>
        )}
        {result?.status === "error" && (
          <div role="alert" className="animate-fade-up rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
            <p className="font-semibold">{result.message}</p>
            <a href={company.phone.href} className="mt-2 inline-block font-semibold underline">
              {company.phone.display}
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
