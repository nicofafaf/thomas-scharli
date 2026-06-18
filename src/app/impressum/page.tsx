import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default async function ImpressumPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-void pb-20 pt-28">
        <div className="mx-auto max-w-2xl px-6">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-light"
          >
            <ArrowLeft size={16} />
            Zurück zur Startseite
          </Link>

          <h1 className="mb-10 font-display text-4xl font-semibold text-bone">
            Impressum
          </h1>

          <div className="space-y-8 text-sm leading-relaxed text-ash">
            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                Thomas Scharli
                <br />
                [STRASSE + HAUSNUMMER]
                <br />
                [PLZ] [ORT]
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">Kontakt</h2>
              <p>
                Telefon: {settings.contact_phone || SITE.phoneDisplay}
                <br />
                E-Mail: {settings.contact_email || "[ECHTE E-MAIL EINTRAGEN]"}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
                <br />
                [UST-ID EINTRAGEN — falls vorhanden, sonst diesen Abschnitt
                löschen]
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p>
                Thomas Scharli
                <br />
                [ADRESSE]
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                Haftungsausschluss
              </h2>
              <p className="mb-3">
                <strong className="text-bone/70">Haftung für Inhalte:</strong>{" "}
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen.
              </p>
              <p>
                <strong className="text-bone/70">Haftung für Links:</strong>{" "}
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder
                Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                Urheberrecht
              </h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
