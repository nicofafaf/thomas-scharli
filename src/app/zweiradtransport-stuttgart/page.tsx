import type { Metadata } from "next";
import { SeoLanding, type FaqItem } from "@/components/SeoLanding";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Zweiradtransport Stuttgart – Motorrad, Roller, Moped | Thomas Scharli",
  description:
    "Zweiradtransport in Stuttgart: Motorräder, Roller und Mopeds sicher verzurrt und versichert. Schnelle Anfrage: 0152 21331526 oder WhatsApp.",
  alternates: { canonical: "/zweiradtransport-stuttgart" },
};

const faq: FaqItem[] = [
  {
    q: "Welche Zweiräder transportieren Sie?",
    a: "Motorräder, Roller, Mopeds, Vespas und E-Bikes – vom Kleinkraftrad bis zur schweren Maschine. Alles wird fachgerecht verzurrt.",
  },
  {
    q: "Wie wird mein Motorrad gesichert?",
    a: "Mit Profi-Zurrgurten und Montageständer auf einer rutschfesten Fläche. So kommt Ihr Zweirad ohne Kratzer ans Ziel.",
  },
  {
    q: "Was kostet ein Zweiradtransport in Stuttgart?",
    a: "Der Preis richtet sich nach Strecke und Fahrzeug. Sie erhalten vorab einen fairen Festpreis – einfach anrufen oder per WhatsApp anfragen.",
  },
  {
    q: "Transportieren Sie auch deutschlandweit?",
    a: "Ja. Schwerpunkt ist die Region Stuttgart, längere Strecken sind nach Absprache jederzeit möglich.",
  },
];

export default async function ZweiradTransportPage() {
  const settings = await getSettings();
  return (
    <SeoLanding
      settings={settings}
      eyebrow="Motorrad · Roller · Moped"
      title="Zweiradtransport Stuttgart"
      intro="Zuverlässiger Zweiradtransport in Stuttgart und Region: Motorräder, Roller und Mopeds werden sicher verzurrt, vollständig versichert und pünktlich geliefert – persönlich erreichbar per Telefon und WhatsApp."
      stats={[
        { num: "50+", label: "Transporte" },
        { num: "100%", label: "Schadenfrei" },
        { num: "5★", label: "Kundenbewertung" },
      ]}
      faq={faq}
      whatsappText="Hallo, ich möchte ein Zweirad transportieren lassen."
    />
  );
}
