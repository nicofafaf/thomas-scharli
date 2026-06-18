import type { Metadata } from "next";
import { SeoLanding, type FaqItem } from "@/components/SeoLanding";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vespa Transport Stuttgart – Sicher & Günstig | Thomas Scharli",
  description:
    "Vespa Transport in Stuttgart und Region. Professionell verzurrt, vollständig versichert. Direkt anfragen: 0152 21331526 oder WhatsApp.",
  alternates: { canonical: "/vespa-transport-stuttgart" },
};

const faq: FaqItem[] = [
  {
    q: "Wie viel kostet ein Vespa Transport in Stuttgart?",
    a: "Der Preis hängt von Strecke und Modell ab. Rufen Sie uns an oder schreiben Sie auf WhatsApp – wir nennen Ihnen sofort einen fairen Festpreis: 0152 21331526.",
  },
  {
    q: "Ist der Transport versichert?",
    a: "Ja. Jedes Fahrzeug wird vollständig versichert transportiert. Ihre Vespa ist bei uns in sicheren Händen.",
  },
  {
    q: "Wie weit liefern Sie?",
    a: "Wir sind in der gesamten Region Stuttgart aktiv: Esslingen, Ludwigsburg, Böblingen, Filderstadt, Waiblingen und darüber hinaus.",
  },
  {
    q: "Kann ich eine Vespa beim Kauf abholen lassen?",
    a: "Selbstverständlich. Wir holen Ihre Vespa direkt beim Verkäufer ab und liefern sie zu Ihnen – ideal beim Kauf über eBay Kleinanzeigen.",
  },
];

export default async function VespaTransportPage() {
  const settings = await getSettings();
  return (
    <SeoLanding
      settings={settings}
      eyebrow="Zweiradtransport Stuttgart"
      title="Vespa Transport Stuttgart"
      intro="Sie suchen einen zuverlässigen Anbieter für den Vespa Transport in Stuttgart? Thomas Scharli transportiert Ihre Vespa sicher, versichert und pünktlich – persönlich erreichbar per Telefon und WhatsApp."
      stats={[
        { num: "50+", label: "Vespa-Transporte" },
        { num: "100%", label: "Schadenfrei" },
        { num: "5★", label: "Kundenbewertung" },
      ]}
      faq={faq}
      whatsappText="Hallo, ich möchte eine Vespa transportieren lassen."
    />
  );
}
