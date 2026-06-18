import type { Metadata } from "next";
import { SeoLanding, type FaqItem } from "@/components/SeoLanding";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Umzug Stuttgart – Wohnung, Büro, Möbeltransport | Thomas Scharli",
  description:
    "Umzug in Stuttgart und Region: Wohnungsumzug, Büroumzug und Möbeltransport – sorgfältig verpackt und pünktlich. Jetzt anfragen: 0152 21331526.",
  alternates: { canonical: "/umzug-stuttgart" },
};

const faq: FaqItem[] = [
  {
    q: "Was kostet ein Umzug in Stuttgart?",
    a: "Der Preis hängt von Umfang, Stockwerk und Entfernung ab. Sie erhalten vorab einen transparenten Festpreis – einfach anrufen oder per WhatsApp anfragen.",
  },
  {
    q: "Verpacken Sie auch die Möbel?",
    a: "Auf Wunsch übernehmen wir das Verpacken, den Transport und den Wiederaufbau – Sie müssen sich um nichts kümmern.",
  },
  {
    q: "Machen Sie auch Büroumzüge?",
    a: "Ja. Wir organisieren Wohnungs- und Büroumzüge in der Region Stuttgart, termintreu und mit der nötigen Sorgfalt.",
  },
  {
    q: "Wie kurzfristig sind Termine möglich?",
    a: "Oft sehr kurzfristig. Fragen Sie einfach an – wir finden gemeinsam einen passenden Termin.",
  },
];

export default async function UmzugStuttgartPage() {
  const settings = await getSettings();
  return (
    <SeoLanding
      settings={settings}
      eyebrow="Wohnung · Büro · Möbel"
      title="Umzug Stuttgart & Region"
      intro="Stressfreier Umzug in Stuttgart: Wohnungsumzüge, Büroumzüge und Möbeltransporte – sorgfältig verpackt, sicher transportiert und pünktlich am Ziel. Wir packen an, Sie lehnen sich zurück."
      stats={[
        { num: "50+", label: "Umzüge" },
        { num: "100%", label: "Schadenfrei" },
        { num: "5★", label: "Kundenbewertung" },
      ]}
      faq={faq}
      whatsappText="Hallo, ich möchte einen Umzug anfragen."
    />
  );
}
