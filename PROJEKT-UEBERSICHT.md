# Thomas Scharli – Transport & Umzug · Projektstand (18.06.2026)

## Überblick
Cinematische Marketing-Website (Next.js 14, TypeScript, Tailwind, Framer Motion,
Supabase live, Vercel). Design „Stahl & Licht" mit goldenen Akzenten.
- Live (eigene Domain): https://www.thomas-scharli.de
- Admin: https://www.thomas-scharli.de/admin/login
- Code: https://github.com/nicofafaf/thomas-scharli (public)
- Backend: Supabase (DB + Auth + Storage), Ref teprdyvwyszvkfcwysfu

## Seiten & Features
- Startseite: Hero mit echtem Veo3-Video (Sprinter mit Logo, Nacht-Autobahn,
  720p Loop, autoplay/muted, Poster-Fallback, reduced-motion pausiert),
  Ken-Burns, Stats (Count-Up ohne 0-Flash), Leistungen, Referenzen (Lightbox),
  Bewertungs-Karussell + Score-Pill, Über uns, Kontakt, magnetische CTAs,
  fixer WhatsApp-Button, versteckte SEO-H1.
- /bewertungen (Google-Stil): Statistik-Panel (Schnitt, Verteilung,
  % Weiterempfehlung, Leistungen), Filter (Sterne/Leistung/Suche/Sortierung),
  Masonry-Grid mit Hilfreich-Votes, Direktbewertung ohne Projektbezug.
- /projekte: vollständige Referenz-Galerie mit Lightbox + „Bewerten".
- 4 SEO-Landingpages: /vespa-transport-stuttgart, /zweiradtransport-stuttgart,
  /umzug-stuttgart, /fahrzeugtransport-stuttgart (je mit FAQ + FAQPage-JSON-LD).
- /impressum + /datenschutz: Daten aus Supabase site_settings (im Admin pflegbar),
  auf noindex gesetzt.
- Admin: Login (Supabase Auth), Projekte (CRUD, Drag&Drop, Bild-Upload),
  Bewertungen (Freigabe, Bulk-Aktionen, Statistik), Einstellungen inkl.
  Impressum-Gruppe (Name/Straße/Ort/USt-ID).

## Logo & Video (zuletzt erledigt)
- Echtes TS-Monogramm aus der Markenvorlage (Logo.jpeg) freigestellt und ins
  Marken-Gold gebracht → /public/logo-mark.png (+ bone-Variante). Eingebaut in
  Navbar, Footer, Lade-Screen.
- Hero-Video: Gemini-Wasserzeichen (unten rechts) durch sauberen 16:9-Crop
  entfernt, neues Poster. Versionierte Dateinamen (hero-video-v2.mp4 /
  hero-poster-v2.jpg) gegen Browser-/CDN-Cache.

## SEO-Status (technisch erledigt)
- Kanonische Domain überall: https://www.thomas-scharli.de
  (Vercel-Primärdomain; Apex thomas-scharli.de → 308 auf www).
- Canonical-Tags: Startseite, /bewertungen, /projekte + alle Landingpages.
- sitemap.xml (9 URLs) + robots.txt + LocalBusiness-JSON-LD (Name, Telefon,
  Leistungen, Einzugsgebiete) + gebrandetes OG-Bild — alles auf www-Domain.
- NEXT_PUBLIC_SITE_URL in Vercel = https://www.thomas-scharli.de.

## Bewertungs-Flow (funktioniert)
Kunde bewertet → approved=false → erscheint erst nach Admin-Freigabe öffentlich
(Admin → Bewertungen → Ausstehend → Freigeben). Schutz: 1 Bewertung pro
E-Mail/Projekt bzw. E-Mail/Leistungsart, RLS, Validierung. Live getestet:
Absenden, Freigeben, Hilfreich-Votes — alles OK.

## Datenbank (Supabase, live)
projects (9 Referenzen), reviews, site_settings, review_votes + View
reviews_with_votes, Spalten service_type + would_recommend, Storage-Bucket
project-images, Admin-User angelegt.

## Deployment
Vercel-Deploy läuft manuell über die CLI (`vercel --prod`). Optional: in Vercel
unter Settings → Git das Repo nicofafaf/thomas-scharli verbinden → Auto-Deploy
bei jedem Push. Hinweis: /media/hero ist „immutable" gecacht → bei Video-Wechsel
immer versionierten Dateinamen verwenden.

## Offen / To-do (nur durch Thomas, kein Code)
RANKING „thomas scharli" (entscheidend):
1) Google Search Console: Domain thomas-scharli.de hinzufügen + verifizieren
   (DNS-TXT), Sitemap https://www.thomas-scharli.de/sitemap.xml einreichen,
   Startseite zur Indexierung einreichen.
2) Google Unternehmensprofil anlegen + verifizieren (Name „Thomas Scharli –
   Transport & Umzug", Telefon, Website www.thomas-scharli.de, Region Stuttgart,
   Fotos) → stärkster Hebel für den Namen.
3) Website überall verlinken (Facebook, Instagram, MyHammer, Branchenbücher) –
   gleicher Name + gleiche Telefonnummer.

INHALTE:
4) Live-Stats im Admin auf echte Zahlen setzen.
5) Die 4 alten Demo-Bewertungen im Admin löschen (haben keine Leistungsart).
6) Impressum/Datenschutz im Admin mit echten Daten füllen (Adresse, E-Mail, USt-ID).
7) Echte Kundenbewertungen einsammeln und freigeben.
