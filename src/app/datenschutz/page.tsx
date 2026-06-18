import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false, follow: true },
};

export default async function DatenschutzPage() {
  const settings = await getSettings();
  const email = settings.contact_email || "[ECHTE E-MAIL EINTRAGEN]";
  const phone = settings.contact_phone || SITE.phoneDisplay;

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
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-sm leading-relaxed text-ash">
            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                1. Datenschutz auf einen Blick
              </h2>
              <p className="mb-3">
                <strong className="text-bone/70">Allgemeine Hinweise:</strong>{" "}
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>
              <p>
                <strong className="text-bone/70">
                  Verantwortliche Stelle:
                </strong>{" "}
                Thomas Scharli, [ADRESSE], Telefon: {phone}, E-Mail: {email}.
                Die verantwortliche Stelle entscheidet allein oder gemeinsam mit
                anderen über die Zwecke und Mittel der Verarbeitung von
                personenbezogenen Daten.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                2. Hosting
              </h2>
              <p>
                Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701,
                San Francisco, CA 94104, USA gehostet. Beim Besuch der Website
                erfasst Vercel verschiedene Logfiles inklusive Ihrer
                IP-Adressen. Die Verarbeitung erfolgt auf Grundlage von Art. 6
                Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren,
                stabilen Bereitstellung).
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <p className="mb-3">
                <strong className="text-bone/70">Datenschutz (DSGVO):</strong>{" "}
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend der gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p>
                <strong className="text-bone/70">Widerrufsrecht:</strong> Viele
                Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
                Einwilligung möglich. Sie können eine bereits erteilte
                Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis
                zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
                unberührt.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                4. Datenerfassung auf dieser Website
              </h2>
              <p className="mb-3">
                <strong className="text-bone/70">Cookies:</strong> Diese Website
                verwendet keine Tracking-Cookies.
              </p>
              <p>
                <strong className="text-bone/70">Bewertungen:</strong> Wenn Sie
                eine Bewertung abgeben, werden Name, E-Mail-Adresse und Ihr
                Kommentar gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a
                DSGVO (Einwilligung). Die Daten werden bis zur Löschung durch den
                Administrator gespeichert. Eine Veröffentlichung erfolgt erst
                nach manueller Freigabe.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-medium text-bone">
                5. Ihre Rechte
              </h2>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
                Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
                Empfänger sowie den Zweck der Datenverarbeitung und ggf. ein
                Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie
                zu weiteren Fragen zum Thema Datenschutz können Sie sich
                jederzeit unter {email} an uns wenden.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
