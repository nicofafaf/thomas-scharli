import type { SiteSettings } from "@/types";

export const SITE = {
  name: "Thomas Scharli",
  tagline: "Transport & Umzug",
  slogan: "Schnell. Sicher. Stressfrei.",
  foundedYear: 2018,
} as const;

export const NAV_LINKS = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#projekte", label: "Referenzen" },
  { href: "/#bewertungen", label: "Bewertungen" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

/**
 * Standardwerte fuer Site-Einstellungen. Werden vom Admin in Supabase
 * gepflegt; diese Defaults greifen im Mock-Modus oder als Fallback.
 */
export const DEFAULT_SETTINGS: SiteSettings = {
  hero_title: "Wir bringen, was zählt.",
  hero_subtitle: "Transport, Umzug und Montage – schnell, sicher, stressfrei.",
  hero_image: "",
  contact_phone: "0152 21331526",
  contact_email: "info@thomas-scharli.de",
  contact_address: "Region Stuttgart",
  stats_projects: "500",
  stats_years: "8",
  stats_satisfaction: "100",
  stats_sectors: "5",
};

export const STATS_LABELS = {
  stats_projects: { label: "Transporte", suffix: "+" },
  stats_years: { label: "Jahre Erfahrung", suffix: "" },
  stats_satisfaction: { label: "Zufriedenheit", suffix: "%" },
  stats_sectors: { label: "Leistungen", suffix: "" },
} as const;

/**
 * Leistungen / Kategorien — entsprechen der Beschriftung des Firmenfahrzeugs:
 * Transport & Umzug · Netzmontagen · Schnell | Sicher | Stressfrei
 */
export const SERVICES = [
  {
    title: "Zweirad-Transport",
    text: "Vespas, Roller und Motorräder – sicher verzurrt und unbeschädigt ans Ziel.",
  },
  {
    title: "Umzüge",
    text: "Möbel und Hausrat sorgfältig verpackt, transportiert und aufgebaut.",
  },
  {
    title: "Fahrzeugtransport",
    text: "Piaggio Ape, E-Mobile und Kleinfahrzeuge – verladen über Rampe, fixiert für jede Strecke.",
  },
  {
    title: "Spezialtransport",
    text: "Mobilitätshilfen, Treppenlifte und sensible Güter mit Fingerspitzengefühl.",
  },
  {
    title: "Netzmontagen",
    text: "Fachgerechte Montagen im Partnerverbund – zuverlässig und termintreu.",
  },
] as const;

export const ABOUT_POINTS = [
  { label: "Schnell", text: "Kurze Reaktionszeiten, flexible Termine." },
  { label: "Sicher", text: "Profi-Verzurrung, vollständig versichert." },
  { label: "Stressfrei", text: "Wir packen an – Sie lehnen sich zurück." },
  { label: "Erfahren", text: "Tausende Kilometer ohne Beanstandung." },
] as const;
