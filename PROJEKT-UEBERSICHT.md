# Thomas Scharli – Transport & Umzug · Projektstand

_Stand: 18.06.2026 · Next.js 14 · TypeScript · Tailwind · Framer Motion · Supabase (live) · Vercel_

---

## 1. Überblick

Cinematische, emotionale Marketing-Website für **Thomas Scharli – Transport & Umzug**
(Region Stuttgart) mit Referenz-Galerie, vollwertigem Bewertungssystem (inkl. eigener
Bewertungsseite) und einem geschützten Admin-Bereich. Design-System „Stahl & Licht"
mit goldenen Akzenten; Signature-Element „Goldener Scan".

- **Live (öffentlich):** https://thomas-scharli.vercel.app
- **Admin-Login:** https://thomas-scharli.vercel.app/admin/login
- **Code (GitHub, public):** https://github.com/nicofafaf/thomas-scharli
- **Backend:** Supabase (PostgreSQL + Auth + Storage), Projekt-Ref `teprdyvwyszvkfcwysfu`

---

## 2. Technik

| Bereich | Wahl |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript strict |
| Styling | Tailwind CSS + CSS-Variablen, Design-System „Stahl & Licht" |
| Animationen | Framer Motion (reduced-motion respektiert), Lenis Smooth-Scroll, Seitenübergänge |
| Backend | Supabase (DB + Auth + Storage), RLS aktiv |
| Deployment | Vercel (Auto-Deploy bei Push auf `main`) |
| Fonts | Cormorant Garamond (Display) + DM Sans (Text) |

---

## 3. Seiten & Features

**Startseite (`/`)**
- Hero (Standbild mit Ken-Burns-Zoom; Video-System vorbereitet via `HAS_HERO_VIDEO`)
- Stats, Leistungen, Referenzen (mit Lightbox), Bewertungs-Karussell (+ Score-Pill), Über uns, Kontakt
- Magnetische Haupt-CTAs, WhatsApp-Button (fixed)

**Referenzen (`/projekte`)** – vollständige Galerie, Bilder per Lightbox, „Bewerten"-Funktion

**Bewertungen (`/bewertungen`)** – eigene öffentliche Seite (Google-Stil)
- Statistik-Panel: Schnitt + Sterne, Verteilung, „% Weiterempfehlung", Leistungs-Übersicht
- Filter ohne Reload: Sterne, Leistungsart, Suche, Sortierung
- Masonry-Grid: Initialen-Avatar, Leistungs-Badge, „Mehr lesen", „Hilfreich"-Votes, Highlight-Karte
- Direktbewertung möglich (ohne Projektbezug)

**Recht:** `/impressum` + `/datenschutz` (Platzhalter für echte Daten)

**Admin (`/admin`)** – Login (Supabase Auth), Projekte (CRUD, Drag&Drop, Bild-Upload),
Bewertungen (Freigabe, Bulk-Aktionen, Statistik), Einstellungen (Texte, Kontakt, Stats)

**SEO/Branding:** Metadata, OpenGraph/Twitter, `sitemap.xml`, `robots.txt`,
LocalBusiness-JSON-LD, generiertes „TS"-Favicon + Apple-Icon.

---

## 4. Bewertungs-Flow (Moderation)

Kunde bewertet (Projektkarte **oder** `/bewertungen`) → Speicherung mit `approved = false`
→ **erst nach Freigabe durch Admin** öffentlich sichtbar. Schutz: 1 Bewertung pro
E-Mail/Projekt bzw. E-Mail/Leistungsart, serverseitige Validierung, RLS in Supabase.

---

## 5. Datenbank (Supabase, live)

- `projects` (9 Referenzen geseedet), `reviews`, `site_settings`
- `review_votes` (Hilfreich-Stimmen) + View `reviews_with_votes`
- Spalten `service_type` + `would_recommend` an `reviews`
- Storage-Bucket `project-images` für Admin-Uploads
- Admin-User in Supabase Auth angelegt

---

## 6. Erledigt (zuletzt)

- ✅ Komplettes AAA-Finish: Recht, SEO, Logo/Favicon, WhatsApp, Lightbox, Smooth-Scroll,
  Seitenübergänge, magnetische Buttons, Bildoptimierung
- ✅ Supabase live verbunden (lokal + Vercel) inkl. Seed-Daten & Admin-User
- ✅ Öffentliche Bewertungsseite `/bewertungen` + Direktbewertungen + Hilfreich-Votes
- ✅ Gründungsjahr auf **2024** korrigiert
- ✅ Auf GitHub gepusht & auf Vercel deployt

---

## 7. Offen / To-do

**🔴 Muss (vor „echtem" Launch):**
1. Impressum/Datenschutz mit echten Daten füllen (Adresse, E-Mail, ggf. USt-ID)
2. Demo-Bewertungen durch echte ersetzen oder entfernen (aktuell Beispieldaten)
3. Echte E-Mail-Adresse hinterlegen (Footer/Kontakt/JSON-LD)

**🟡 Sollte:**
4. Hero-Video (`public/media/hero/hero-video.mp4` + `HAS_HERO_VIDEO = true`)
5. Eigene Domain statt `…vercel.app` (in `SITE.url` eintragen)
6. Bildqualität (Originale ohne schwarze Balken)
7. Realistische Statistik-Zahlen prüfen (z. B. „500+ Transporte")

**🟢 Nice:**
8. Echtes Logo/Favicon, OG-Bild 1200×630
9. Google Search Console + echte Google-Bewertungen
