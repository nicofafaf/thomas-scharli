# Thomas Scharli – Transport & Umzug · Projektstand (18.06.2026)

## Überblick
Cinematische Marketing-Website (Next.js 14, TypeScript, Tailwind, Framer Motion,
Supabase live, Vercel). Design „Stahl & Licht" mit goldenen Akzenten.
- Live: https://thomas-scharli.vercel.app
- Admin: https://thomas-scharli.vercel.app/admin/login
- Code: https://github.com/nicofafaf/thomas-scharli (public)
- Backend: Supabase (DB + Auth + Storage), Ref teprdyvwyszvkfcwysfu

## Seiten & Features
- Startseite: Hero mit echtem Hintergrund-Video (Nacht-Autobahn, 720p, 2.9MB Loop,
  autoplay/muted, Poster-Fallback, reduced-motion pausiert), Ken-Burns, Stats
  (Count-Up ohne 0-Flash), Leistungen, Referenzen (Lightbox), Bewertungs-Karussell
  + Score-Pill, Über uns, Kontakt, magnetische CTAs, fixer WhatsApp-Button.
- /bewertungen (Google-Stil): Statistik-Panel (Schnitt, Verteilung,
  % Weiterempfehlung, Leistungen), Filter (Sterne/Leistung/Suche/Sortierung),
  Masonry-Grid mit Hilfreich-Votes, Direktbewertung ohne Projektbezug.
- /projekte: vollständige Referenz-Galerie mit Lightbox + „Bewerten".
- /impressum + /datenschutz: Daten kommen aus Supabase site_settings,
  im Admin pflegbar.
- Admin: Login (Supabase Auth), Projekte (CRUD, Drag&Drop, Bild-Upload),
  Bewertungen (Freigabe, Bulk-Aktionen, Statistik), Einstellungen inkl.
  Impressum-Gruppe (Name/Straße/Ort/USt-ID).
- SEO/Branding: Metadata, OpenGraph (gebrandetes OG-Bild on-the-fly via
  opengraph-image.tsx), sitemap.xml, robots.txt, LocalBusiness-JSON-LD,
  TS-Favicon + Apple-Icon, cinematischer Lade-Screen.

## Bewertungs-Flow
Kunde bewertet → approved=false → erst nach Admin-Freigabe öffentlich.
Schutz: 1 Bewertung pro E-Mail/Projekt bzw. E-Mail/Leistungsart, RLS, Validierung.

## Datenbank (Supabase, live)
projects (9 Referenzen), reviews, site_settings, review_votes + View
reviews_with_votes, Spalten service_type + would_recommend, Storage-Bucket
project-images, Admin-User angelegt.

## Deployment (WICHTIG)
Vercel ist aktuell NICHT mit GitHub verbunden → git push deployt NICHT automatisch.
Deploy läuft manuell über die Vercel-CLI (`vercel --prod`). Empfehlung: in Vercel
unter Settings → Git das Repo nicofafaf/thomas-scharli verbinden, dann deployt
jeder Push automatisch.

## Erledigt (zuletzt – FINAL-AAA-Sprint)
- Echtes Hero-Video eingebaut (von Pexels geladen, 46MB → 2.9MB komprimiert/getrimmt).
- Navbar: Text-Shadow auf Links/Logo (transparent bleibt).
- Count-Up ohne 0-Flash; Stats-Defaults realistischer (50+/1/100/5).
- Demo-Bewertungen aus Code entfernt + Leer-State mit CTA.
- Bilder: object-position center 20% (keine schwarzen Balken).
- Cinematischer Lichtanimation-Canvas als Foto-Fallback (wenn kein Video).
- OG-Bild on-the-fly, metadataBase auf Vercel-URL, Lade-Screen, Impressum aus DB.
- Manuell auf Vercel Production deployt (Build OK), live verifiziert.

## Offen / To-do (nur durch Thomas, kein Code)
MUSS:
1) Live-Stats im Admin auf echte Zahlen setzen (DB hat noch alte Werte).
2) Die 4 alten Demo-Bewertungen im Admin → Bewertungen löschen.
3) Impressum/Datenschutz im Admin mit echten Daten füllen (Adresse, E-Mail, USt-ID).
SOLLTE:
4) Vercel ↔ GitHub verbinden (Auto-Deploy).
5) NEXT_PUBLIC_SITE_URL in Vercel setzen (fürs Teilen-Vorschaubild).
6) Eigene Domain statt …vercel.app (in SITE.url + Env eintragen).
NICE:
7) Echtes Logo/Favicon, Google Search Console, echte Google-Bewertungen.
