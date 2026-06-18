import type { Metadata } from "next";
import { SeoLanding, type FaqItem } from "@/components/SeoLanding";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title:
    "Fahrzeugtransport Stuttgart – Piaggio Ape, E-Mobile | Thomas Scharli",
  description:
    "Fahrzeugtransport in Stuttgart: Piaggio Ape, E-Mobile und Kleinstfahrzeuge – über Rampe verladen, sicher fixiert. Anfrage: 0152 21331526 oder WhatsApp.",
  alternates: { canonical: "/fahrzeugtransport-stuttgart" },
};

const faq: FaqItem[] = [
  {
    q: "Welche Fahrzeuge transportieren Sie?",
    a: "Piaggio Ape, Elektromobile, Kleinstfahrzeuge und ähnliche Gefährte – über eine Auffahrrampe verladen und sicher fixiert.",
  },
  {
    q: "Wie wird das Fahrzeug verladen?",
    a: "Über eine Auffahrrampe und mit Profi-Zurrgurten gesichert. So bleibt Ihr Fahrzeug während des gesamten Transports unbeschädigt.",
  },
  {
    q: "Was kostet ein Fahrzeugtransport in Stuttgart?",
    a: "Der Preis richtet sich nach Strecke und Fahrzeug. Sie bekommen vorab einen fairen Festpreis – einfach anrufen oder per WhatsApp anfragen.",
  },
  {
    q: "Holen Sie das Fahrzeug auch ab?",
    a: "Ja. Wir holen Ihr Fahrzeug direkt am gewünschten Ort ab und liefern es sicher zu Ihnen.",
  },
];

export default async function FahrzeugTransportPage() {
  const settings = await getSettings();
  return (
    <SeoLanding
      settings={settings}
      eyebrow="Piaggio Ape · E-Mobile · Kleinfahrzeuge"
      title="Fahrzeugtransport Stuttgart"
      intro="Sicherer Fahrzeugtransport in Stuttgart und Region: Piaggio Ape, E-Mobile und Kleinstfahrzeuge werden über eine Auffahrrampe verladen, sicher fixiert und zuverlässig geliefert – persönlich erreichbar per Telefon und WhatsApp."
      stats={[
        { num: "50+", label: "Transporte" },
        { num: "100%", label: "Schadenfrei" },
        { num: "5★", label: "Kundenbewertung" },
      ]}
      faq={faq}
      whatsappText="Hallo, ich möchte ein Fahrzeug transportieren lassen."
    />
  );
}
