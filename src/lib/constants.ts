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

/** Verifiziertes MyHammer-Profil (266 Bewertungen, 4.9★). */
export const MYHAMMER = {
  url: "https://www.my-hammer.de/auftragnehmer/thomas-16",
  reviewsUrl: "https://www.my-hammer.de/auftragnehmer/thomas-16/bewertungen",
  rating: "4.9",
  reviewCount: "266",
} as const;

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
  stats_reviews: "266",
  stats_rating: "4.9",
  stats_satisfaction: "100",
  stats_cities: "27",
  impressum_name: "Thomas Scharli",
  impressum_street: "",
  impressum_city: "",
  impressum_vatid: "",
};

export type StatMeta = {
  label: string;
  suffix: string;
  decimals?: number;
  desc?: string;
};

export const STATS_LABELS: Record<string, StatMeta> = {
  stats_reviews: { label: "Bewertungen", suffix: "+", desc: "verifiziert auf MyHammer" },
  stats_rating: {
    label: "Kundenbewertung",
    suffix: "★",
    decimals: 1,
    desc: "von 5 Sternen",
  },
  stats_satisfaction: {
    label: "Zufriedenheit",
    suffix: "%",
    desc: "kein Transport mit Schaden",
  },
  stats_cities: { label: "Städte", suffix: "+", desc: "Stuttgart bis Berlin" },
};

/**
 * Leistungen / Kategorien — entsprechen der Beschriftung des Firmenfahrzeugs:
 * Transport & Umzug · Netzmontagen · Schnell | Sicher | Stressfrei
 */
export const SERVICES = [
  {
    title: "Vespa & Zweiradtransport Stuttgart",
    text: "Vespas, Motorräder, Roller und Mopeds – sicher verzurrt, vollständig versichert. Region Stuttgart und deutschlandweit.",
    area: "Stuttgart · München · Berlin · und ganz Deutschland",
  },
  {
    title: "Umzug Stuttgart & Region",
    text: "Wohnungsumzüge, Büroumzüge und Möbeltransporte – sorgfältig verpackt und pünktlich am Ziel.",
    area: "Region Stuttgart · Deutschlandweit auf Anfrage",
  },
  {
    title: "Fahrzeugtransport Stuttgart",
    text: "Piaggio Ape, E-Mobile und Kleinstfahrzeuge – über Auffahrrampe verladen, sicher fixiert.",
    area: "Stuttgart · Köln · Berlin · deutschlandweit",
  },
  {
    title: "Spezialtransport & Seniorenmobilität",
    text: "Treppenlifte, Elektromobile und Mobilitätshilfen – mit Fingerspitzengefühl transportiert.",
    area: "Region Stuttgart · Deutschlandweit auf Anfrage",
  },
  {
    title: "Netzmontagen Stuttgart",
    text: "Fachgerechte Montagen im Partnerverbund – zuverlässig und termintreu.",
    area: "Region Stuttgart",
  },
] as const;

export const ABOUT_POINTS = [
  {
    label: "Deutschlandweit",
    text: "Stuttgart · Berlin · München · Köln · und mehr",
  },
  {
    label: "Persönlich erreichbar",
    text: "Thomas selbst – kein Callcenter, kein Subunternehmer",
  },
  {
    label: "266 verifizierte Bewertungen",
    text: "4.9★ auf MyHammer – unabhängig geprüft",
  },
  {
    label: "Kein Schaden, je",
    text: "Jedes Transportgut versichert und sicher fixiert",
  },
] as const;
