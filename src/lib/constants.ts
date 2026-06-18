import type { SiteSettings } from "@/types";

export const SITE = {
  name: "Thomas Scharli",
  tagline: "Transport & Umzug",
  slogan: "Schnell. Sicher. Stressfrei.",
  foundedYear: 2024,
  // Zentral pflegbar – bei eigener Domain hier anpassen
  url: "https://www.thomas-scharli.de",
  phoneDisplay: "0152 21331526",
  phoneTel: "+4915221331526",
  phoneIntl: "4915221331526", // fuer wa.me-Links (ohne + und Leerzeichen)
} as const;

export const WHATSAPP_MESSAGE =
  "Hallo Thomas, ich hätte eine Anfrage bezüglich Transport/Umzug.";

export function whatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#projekte", label: "Referenzen" },
  { href: "/bewertungen", label: "Bewertungen" },
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
  stats_projects: "50",
  stats_years: "1",
  stats_satisfaction: "100",
  stats_sectors: "5",
  impressum_name: "Thomas Scharli",
  impressum_street: "",
  impressum_city: "",
  impressum_vatid: "",
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
    title: "Vespa & Zweiradtransport Stuttgart",
    text: "Vespas, Motorräder, Roller und Mopeds – sicher verzurrt, vollständig versichert. Region Stuttgart und deutschlandweit.",
  },
  {
    title: "Umzug Stuttgart & Region",
    text: "Wohnungsumzüge, Büroumzüge und Möbeltransporte – sorgfältig verpackt und pünktlich am Ziel.",
  },
  {
    title: "Fahrzeugtransport Stuttgart",
    text: "Piaggio Ape, E-Mobile und Kleinstfahrzeuge – über Auffahrrampe verladen, sicher fixiert.",
  },
  {
    title: "Spezialtransport & Seniorenmobilität",
    text: "Treppenlifte, Elektromobile und Mobilitätshilfen – mit Fingerspitzengefühl transportiert.",
  },
  {
    title: "Netzmontagen Stuttgart",
    text: "Fachgerechte Montagen im Partnerverbund – zuverlässig und termintreu.",
  },
] as const;

export const ABOUT_POINTS = [
  { label: "Schnell", text: "Kurze Reaktionszeiten, flexible Termine." },
  { label: "Sicher", text: "Profi-Verzurrung, vollständig versichert." },
  { label: "Stressfrei", text: "Wir packen an – Sie lehnen sich zurück." },
  { label: "Erfahren", text: "Tausende Kilometer ohne Beanstandung." },
] as const;
