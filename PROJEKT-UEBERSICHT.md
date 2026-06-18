# 📋 Thomas Scharli – Transport & Umzug · KOMPLETTE PROJEKT-ÜBERSICHT

> Diese Datei beschreibt **vollständig**, wie die Website aktuell aufgebaut ist –
> jede Datei, jeder Datenfluss, das Design-System, die Datenbank und was für
> „AAA-Niveau" (Premium / Gänsehaut) noch fehlt. Zum Kopieren: `Strg+A`, `Strg+C`.

---

## 1. WAS IST DAS?

Cinematische Firmen-Website für **Thomas Scharli – Transport & Umzug** (Region Stuttgart).
Leistungen laut Firmenfahrzeug: *Transport & Umzug · Netzmontagen · „Schnell | Sicher | Stressfrei"*.

Inhalt basiert auf **echten Fotos** (14 Stück) der echten Aufträge: Vespa-/Motorrad-/
Roller-Transporte, Piaggio Ape & E-Mobile, Mobilitätshilfen, Treppenlift, Möbel/Umzüge.

**Besonderheit:** Die Seite läuft auch **ohne Backend** (Demo-Modus mit Mock-Daten),
und schaltet automatisch auf echte Daten um, sobald Supabase-Keys vorhanden sind.

---

## 2. TECH-STACK

| Schicht | Technologie |
|---|---|
| Framework | **Next.js 14** (App Router) |
| Sprache | **TypeScript** (strict) |
| Styling | **Tailwind CSS** + CSS Custom Properties |
| Animationen | **Framer Motion** |
| Icons | **lucide-react** |
| Backend/DB/Auth/Storage | **Supabase** (optional, Fallback = Mock) |
| Formular-Validierung | **Zod** |
| Toasts | **react-hot-toast** |
| Fonts | Google Fonts: **Cormorant Garamond** (Display) + **DM Sans** (Body) |
| Hosting | **Vercel** (Code auf GitHub + GitLab, beide public) |

**Repos:**
- GitHub (public): https://github.com/nicofafaf/thomas-scharli
- GitLab (public): https://gitlab.com/nicofafaf/thomas-scharli

---

## 3. KOMPLETTE DATEISTRUKTUR

```
thomas-scharli/
├── src/
│   ├── app/                          # Routen (App Router)
│   │   ├── layout.tsx                # Root-Layout: Fonts, Metadaten, PageLoadScan, Toaster
│   │   ├── globals.css               # Design-Tokens (CSS-Variablen) + Basis-Styles + Utilities
│   │   ├── page.tsx                  # STARTSEITE (/) – setzt alle Sections zusammen
│   │   ├── loading.tsx               # Lade-Animation (Suspense)
│   │   ├── error.tsx                 # Fehler-Boundary (Client)
│   │   ├── not-found.tsx             # 404-Seite
│   │   ├── projekte/page.tsx         # /projekte – komplette Referenz-Galerie
│   │   ├── admin/
│   │   │   ├── login/page.tsx        # /admin/login – Supabase-Login
│   │   │   └── dashboard/page.tsx    # /admin/dashboard – geschützt, lädt AdminDashboard
│   │   └── api/
│   │       └── reviews/route.ts      # POST-Endpoint: Bewertung speichern (+ Rate-Limit)
│   │
│   ├── components/
│   │   ├── PageLoadScan.tsx          # SIGNATURE: goldener Scan-Strich beim Laden (vertikal)
│   │   ├── Navbar.tsx                # Sticky-Navi, transparent→solid beim Scrollen, Mobile-Menü
│   │   ├── Footer.tsx                # Footer mit Navigation + Kontakt + Admin-Link
│   │   ├── SectionHeading.tsx        # Wiederverwendbare Abschnitts-Überschrift (Eyebrow+Titel)
│   │   ├── CountUp.tsx               # Hochzähl-Animation für Statistiken (bei Sichtbarkeit)
│   │   ├── StarRating.tsx            # Sterne-Bewertung (interaktiv + nur-Anzeige)
│   │   ├── ProjectCard.tsx           # Projektkarte mit Hover-Gold-Scan + Bewerten-Button
│   │   ├── ReviewCard.tsx            # Einzelne Bewertungs-Karte (Karussell)
│   │   ├── ReviewModal.tsx           # Pop-up-Formular „Projekt bewerten" (Zod-validiert)
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Vollbild-Hero: Bild/Video + Parallax + Titel + Mini-Stats
│   │   │   ├── StatsSection.tsx      # 4 Kennzahlen mit Count-Up + goldener Trennlinie
│   │   │   ├── ServicesSection.tsx   # 5 Leistungen (Zweirad, Umzug, Fahrzeug, Spezial, Netz)
│   │   │   ├── ProjectsSection.tsx   # Referenz-Grid (Masonry) + steuert das ReviewModal
│   │   │   ├── ReviewsSection.tsx    # Horizontales Bewertungs-Karussell (nur freigegebene)
│   │   │   ├── AboutSection.tsx      # „Handwerk mit Haltung." + Foto + Eck-Akzente
│   │   │   └── ContactSection.tsx    # Kontakt (KEINE Preise) – Telefon/E-Mail/Region
│   │   └── admin/
│   │       ├── AdminDashboard.tsx    # Dashboard-Rahmen: Sidebar + Tabs + Datenladen + Logout
│   │       ├── ProjectsTab.tsx       # Projekte: Liste, Drag&Drop-Sortierung, Löschen
│   │       ├── ProjectFormModal.tsx  # Projekt anlegen/bearbeiten + Bild-Upload (Storage)
│   │       ├── ReviewsTab.tsx        # Bewertungen: Ausstehend/Freigegeben, freigeben/löschen
│   │       └── SettingsTab.tsx       # Einstellungen: Hero-Text, Kontakt, Stats, Hero-Bild
│   │
│   ├── lib/
│   │   ├── constants.ts              # Marke, Navigation, Default-Settings, Leistungen, Stats-Labels
│   │   ├── animations.ts             # Framer-Motion-Varianten (fadeUp, stagger, goldScan …)
│   │   ├── utils.ts                  # cn(), formatDate(), parseStat(), projectImageSrc()
│   │   ├── validation.ts             # Zod-Schema für Bewertungs-Formular
│   │   ├── mock-data.ts              # 9 echte Referenzen + 4 Beispiel-Bewertungen (Demo-Modus)
│   │   ├── data.ts                   # Datenzugriff: Supabase ODER Mock (Server-seitig)
│   │   ├── supabase.ts               # Browser-Client + isSupabaseConfigured-Flag
│   │   ├── supabase-server.ts        # Server-/Route-Clients (Cookies)
│   │   └── auth.ts                   # getServerSession() / getServerUser()
│   │
│   ├── types/index.ts                # Zentrale Typen: Project, Review, SiteSettings, Database
│   └── middleware.ts                 # Schützt /admin/dashboard (Redirect zu Login)
│
├── public/media/                     # EIGENE MEDIEN (keine Stock-Bilder)
│   ├── hero/hero-poster.jpg          # Hero-Hintergrund (= gebrandetes Firmenfahrzeug, Bild 4)
│   ├── about/einsatz.jpg             # Über-uns-Foto (Bild 13)
│   ├── og/og-image.jpg               # Social-Share-Bild
│   └── projekte/1.jpg … 14.jpg       # deine 14 Transportfotos
│
├── supabase/schema.sql               # Komplettes DB-Schema + RLS + Storage-Bucket
├── tailwind.config.ts                # Farb-Tokens + Fonts + Keyframes
├── next.config.mjs                   # Bild-Domains (Supabase Storage)
├── tsconfig.json · postcss.config.mjs
├── package.json · package-lock.json
├── .env.local.example                # Vorlage für Supabase-Keys
└── README.md
```

---

## 4. SEITEN / ROUTEN

| Route | Typ | Inhalt |
|---|---|---|
| `/` | öffentlich | Hero → Stats → Leistungen → Referenzen (5) → Bewertungen → Über uns → Kontakt → Footer |
| `/projekte` | öffentlich | Alle Referenzen, jede Karte mit „Projekt bewerten" |
| `/admin/login` | öffentlich | Login (Supabase Auth) |
| `/admin/dashboard` | **geschützt** | Tabs: Projekte · Bewertungen · Einstellungen |
| `/api/reviews` | API (POST) | Speichert Bewertung (approved=false) + Duplikat-/Rate-Limit |
| 404 / Fehler / Laden | system | not-found / error / loading |

---

## 5. DESIGN-SYSTEM („Stahl & Licht")

**Farben (CSS-Variablen in `globals.css` + Tailwind-Tokens):**
```
--void  #0A0A0B   Haupt-Hintergrund (Fast-Schwarz)
--steel #141416   Sektionen
--iron  #1E1E22   Karten
--mist  #2C2C32   Ränder/Linien
--bone  #F2EDE6   Primäre Schrift
--ash   #8A8A96   Sekundäre Schrift
--gold  #C8922A   Akzent (CTA)
--gold-light #E8B84B   Hover
--gold-dim   rgba(200,146,42,0.12)   Badges/Glows
```
**Schrift:** Cormorant Garamond (Headlines, kursiv für emotionale Wörter) · DM Sans (Fließtext).

**Signature-Element „Goldener Scan":**
- Beim Laden fährt ein goldener Lichtstrich vertikal über die Seite (`PageLoadScan.tsx`).
- Beim Hover über Projektkarten fährt derselbe Strich horizontal durchs Bild.

**Animationen:** Hero-Text gestaffelt von unten, Hintergrund-Parallax, Count-Up bei Stats,
Karten reveal-on-scroll, alle respektieren `prefers-reduced-motion`.

---

## 6. DATENFLUSS (wichtig!)

```
Anfrage → lib/data.ts
            │
            ├─ Supabase konfiguriert?  → JA  → echte Daten aus Supabase
            │                            NEIN → Mock-Daten (lib/mock-data.ts)
            ▼
       Server Component (page.tsx) rendert mit den Daten
```

- **isSupabaseConfigured** (in `lib/supabase.ts`) prüft, ob gültige Keys da sind.
- **Bildquelle eines Projekts** (`projectImageSrc` in `utils.ts`):
  `image_url` (Supabase-Upload) **hat Vorrang vor** `image_key` (lokal `/media/projekte/{key}.jpg`),
  sonst Platzhalter „TS".
- **Bewertung absenden:** Formular → `/api/reviews` → Insert mit `approved=false`
  (im Demo-Modus nur simuliert). Erscheint öffentlich erst nach Admin-Freigabe.

---

## 7. DATENBANK (supabase/schema.sql)

**Tabellen:**
- `projects` (id, title, category, description, location, year, **image_url**, **image_key**, featured, order_index, created_at)
- `reviews` (id, project_id→projects, author_name, company, email, rating 1–5, comment, **approved**, created_at) · Unique-Index (project_id, email) = Rate-Limit
- `site_settings` (key, value) – Hero-Texte, Kontakt, Stats

**Sicherheit (RLS):** öffentlich nur lesen (Projekte, freigegebene Bewertungen, Settings);
schreiben nur eingeloggt; Bewertungen darf jeder mit `approved=false` einfügen.

**Storage:** Bucket `project-images` (public read, auth write, 5 MB, JPG/PNG/WebP).

---

## 8. AKTUELLE INHALTE (Platzhalter → bitte ersetzen)

| Feld | Aktueller Wert | Status |
|---|---|---|
| Hero-Titel | „Wir bringen, was zählt." | ok |
| Hero-Untertitel | „Transport, Umzug und Montage – schnell, sicher, stressfrei." | ok |
| Telefon | **0152 21331526** (vom Fahrzeug) | echt |
| E-Mail | info@thomas-scharli.de | **Platzhalter** |
| Region | Region Stuttgart | prüfen |
| Gegründet/seit | 2018 | **Platzhalter** |
| Stats | 500+ Transporte · 8 Jahre · 100 % · 5 Leistungen | **Platzhalter** |
| 9 Referenzen | aus echten Fotos benannt | Texte fiktiv, Fotos echt |
| 4 Bewertungen | Beispiele (Demo) | **fiktiv** |

---

## 9. WAS FEHLT FÜR AAA-NIVEAU (priorisiert)

### 🟥 MUSS (Recht & Glaubwürdigkeit)
1. **Impressum + Datenschutzerklärung** – in DE gesetzlich Pflicht (fehlt komplett, Abmahn-Risiko).
2. **Echte Daten** statt Platzhalter (E-Mail, Gründungsjahr, echte Stats, echte Bewertungen).
3. **Hero-Video** – größter Gänsehaut-Hebel; Technik ist vorbereitet (`HAS_HERO_VIDEO`-Flag in `HeroSection.tsx`, Datei nach `public/media/hero/hero-video.mp4`).
4. **Custom Domain** statt `…vercel.app`.
5. **Supabase live** schalten (Admin, echte Bewertungen, Uploads).

### 🟧 SOLLTE (Premium-Politur)
6. **Bildqualität** – Handy-Schnappschüsse: schwarze Balken wegschneiden, einheitliches Format, leichtes Cinematic-Grading (bei Bild 11 ist ein Finger im Bild).
7. **Echtes Logo + Favicon** (TS-Logo vom Fahrzeug als SVG; aktuell Next.js-Standard-Icon).
8. **SEO-Paket** – OG-Bild exakt 1200×630, `sitemap.xml`, `robots.txt`, **LocalBusiness-JSON-LD** (lokale Google-Sichtbarkeit).
9. **WhatsApp-Direktbutton** (Nummer ist Handy → starke Conversion).

### 🟦 NICE (das letzte 1 %)
10. Smooth-Scroll (Lenis) + Seitenübergänge.
11. Lightbox/Galerie für Projektfotos.
12. Magnetische Buttons / Cursor-Mikrointeraktionen.
13. Echte Google-Bewertungen einbinden.

---

## 10. ENTWICKLUNG / BEFEHLE

```bash
npm install          # einmalig
npm run dev          # lokal testen → http://localhost:3000
npm run build        # Produktions-Build prüfen
npm run start        # Produktionsserver lokal
```

**Supabase aktivieren:** `.env.local` anlegen (Vorlage `.env.local.example`):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
Dann `supabase/schema.sql` im Supabase-SQL-Editor ausführen + Admin-User anlegen.

---

## 11. KURZ-EINSCHÄTZUNG

**Fundament & Architektur sind bereits AAA** (Struktur, Animationen, Design-System, Admin, Demo-Modus).
**Für den „Gänsehaut-Moment" fehlen vor allem:** Hero-Video, professionellere/zugeschnittene Fotos,
echtes Logo/Branding und echte Inhalte. **Rechtlich Pflicht:** Impressum + Datenschutz.
