import { MapPin, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company, fullAddress, nearbyTowns } from "@/content/company";

/**
 * Positions schématiques (non cartographiques) des communes autour de Quetigny,
 * dans un repère 400×400 centré sur l'entreprise. Orientation nord en haut.
 */
const mapPoints: { name: string; x: number; y: number; label?: "left" | "right" }[] = [
  { name: "Dijon", x: 128, y: 196, label: "left" },
  { name: "Saint-Apollinaire", x: 188, y: 142, label: "right" },
  { name: "Varois-et-Chaignot", x: 246, y: 174, label: "right" },
  { name: "Chevigny-St-Sauveur", x: 236, y: 262, label: "right" },
  { name: "Sennecey-lès-Dijon", x: 178, y: 258, label: "left" },
  { name: "Longvic", x: 142, y: 282, label: "left" },
  { name: "Talant", x: 76, y: 168, label: "left" },
  { name: "Couternon", x: 296, y: 214, label: "right" },
];

export function ServiceZone() {
  return (
    <section className="bg-mist py-20 md:py-28" aria-labelledby="zone-title">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Zone d'intervention"
            title={
              <span id="zone-title">
                Implantés à Quetigny, aux portes de Dijon
              </span>
            }
            intro="Notre entreprise est installée à Quetigny, dans la métropole dijonnaise. Nous intervenons auprès des particuliers de Quetigny et des communes voisines."
          />
          <Reveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {nearbyTowns.map((town) => (
                <li
                  key={town}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink/80"
                >
                  {town}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Votre commune n&apos;apparaît pas ? Contactez-nous pour vérifier si nous pouvons
              intervenir.
            </p>
          </Reveal>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <MapPin aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-ink">{company.name}</p>
              <p className="text-sm text-muted">{fullAddress}</p>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
              >
                <Navigation aria-hidden className="h-3.5 w-3.5" />
                Itinéraire
                <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
              </a>
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <figure className="relative mx-auto aspect-square w-full max-w-[520px]">
            <svg
              viewBox="0 0 400 400"
              className="h-full w-full"
              role="img"
              aria-labelledby="zone-map-title"
            >
              <title id="zone-map-title">
                Schéma : Quetigny au centre, entouré des communes voisines de l&apos;agglomération
                dijonnaise
              </title>
              <defs>
                <radialGradient id="zone-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0F8BEF" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#0F8BEF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="400" height="400" rx="32" fill="#FFFFFF" />
              <g stroke="#E3E6EE" strokeWidth="1">
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`v${i}`} x1={40 + i * 40} y1="16" x2={40 + i * 40} y2="384" />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`h${i}`} x1="16" y1={40 + i * 40} x2="384" y2={40 + i * 40} />
                ))}
              </g>
              <circle cx="220" cy="208" r="170" fill="url(#zone-glow)" />
              {[150, 105, 60].map((r) => (
                <circle
                  key={r}
                  cx="220"
                  cy="208"
                  r={r}
                  fill="none"
                  stroke="#0B3D91"
                  strokeOpacity=".18"
                  strokeDasharray="4 6"
                />
              ))}
              {mapPoints.map((p) => (
                <g key={p.name}>
                  <line
                    x1="220"
                    y1="208"
                    x2={p.x}
                    y2={p.y}
                    stroke="#0B3D91"
                    strokeOpacity=".14"
                  />
                  <circle cx={p.x} cy={p.y} r="5" fill="#0B3D91" />
                  <text
                    x={p.label === "left" ? p.x - 10 : p.x + 10}
                    y={p.y + 4}
                    textAnchor={p.label === "left" ? "end" : "start"}
                    fontSize="11.5"
                    fontWeight="600"
                    fill="#0A1F44"
                    fillOpacity=".75"
                  >
                    {p.name}
                  </text>
                </g>
              ))}
              <circle cx="220" cy="208" r="22" fill="#FF7A00" fillOpacity=".18">
                <animate attributeName="r" values="16;30;16" dur="3s" repeatCount="indefinite" />
                <animate
                  attributeName="fill-opacity"
                  values=".3;0;.3"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="220" cy="208" r="11" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="3" />
              <rect x="172" y="226" width="96" height="26" rx="13" fill="#0B3D91" />
              <text
                x="220"
                y="243"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Quetigny
              </text>
              <g transform="translate(352 52)" fill="#0A1F44" fillOpacity=".5">
                <path d="M0 -14 L6 4 L0 0 L-6 4 Z" />
                <text y="20" textAnchor="middle" fontSize="10" fontWeight="700">
                  N
                </text>
              </g>
            </svg>
            <figcaption className="mt-3 text-center text-xs text-muted">
              Représentation schématique, non à l&apos;échelle.
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
