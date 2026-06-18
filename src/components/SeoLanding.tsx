import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE, whatsappLink } from "@/lib/constants";
import type { SiteSettings } from "@/types";

export interface FaqItem {
  q: string;
  a: string;
}

interface SeoLandingProps {
  settings: SiteSettings;
  eyebrow: string;
  title: string;
  intro: string;
  stats: { num: string; label: string }[];
  faq: FaqItem[];
  whatsappText: string;
}

export function SeoLanding({
  settings,
  eyebrow,
  title,
  intro,
  stats,
  faq,
  whatsappText,
}: SeoLandingProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-void pb-20 pt-28">
        <div className="container-tight">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-light"
          >
            <ArrowLeft size={16} />
            Zurück zur Startseite
          </Link>

          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="mb-6 font-display text-5xl font-semibold leading-tight text-bone">
            {title}
          </h1>
          <p className="mb-14 max-w-2xl text-lg leading-relaxed text-ash">
            {intro}
          </p>

          <div className="mb-16 grid max-w-lg grid-cols-3 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border border-mist bg-iron p-5 text-center"
              >
                <div className="font-display text-3xl font-semibold text-gold">
                  {s.num}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-ash">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-8 font-display text-3xl font-semibold text-bone">
            Häufige Fragen
          </h2>
          <div className="mb-16 max-w-2xl">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-mist py-6">
                <h3 className="mb-2 font-medium text-bone">{item.q}</h3>
                <p className="text-sm leading-relaxed text-ash">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href={`tel:${SITE.phoneTel}`} className="btn-gold">
              <Phone size={16} />
              {SITE.phoneDisplay} anrufen
            </a>
            <a
              href={whatsappLink(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#25D366] px-8 py-4 text-sm font-medium uppercase tracking-widest2 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-void"
            >
              Per WhatsApp anfragen
            </a>
          </div>
        </div>
      </main>
      <Footer settings={settings} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
