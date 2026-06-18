# Thomas Scharli – Facility and More

Eine cinematische Portfolio- & Bewertungsplattform für ein Facility-Management-Unternehmen.
Gebaut mit **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion** und **Supabase**.

> **Design-Sprache:** „Stahl & Licht“ – dunkle Stahltöne, warmes Amber-Gold als Akzent.
> **Signature-Element:** Der „Goldene Scan“ – ein Goldstreifen, der beim Page-Load über die Seite fährt und beim Hover über Projektkarten erneut auftaucht.

---

## Schnellstart

```bash
npm install
cp .env.local.example .env.local   # Werte eintragen (oder leer lassen für Demo-Modus)
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

> **Demo-Modus:** Ohne Supabase-Keys läuft die komplette öffentliche Seite mit
> Mock-Daten. Sobald `.env.local` gültige Keys enthält, werden echte Daten aus
> Supabase geladen.

---

## Umgebungsvariablen (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
ADMIN_EMAIL=thomas@scharli.de
```

---

## Supabase-Setup

1. Projekt auf [supabase.com](https://supabase.com) anlegen.
2. Im **SQL Editor** die Datei [`supabase/schema.sql`](./supabase/schema.sql) ausführen.
   Das erstellt Tabellen, RLS-Policies, den Storage-Bucket `project-images` und Default-Settings.
3. Unter **Authentication → Users** den Admin-Account (Thomas) per E-Mail + Passwort anlegen.
4. URL und Anon-Key aus **Project Settings → API** in `.env.local` eintragen.

---

## Projektstruktur

```
src/
├── app/                # Routen (App Router)
│   ├── page.tsx        # Landing Page
│   ├── projekte/       # Projektgalerie
│   ├── admin/          # Login + Dashboard
│   └── api/reviews/    # Öffentlicher Review-Insert mit Rate-Limit
├── components/
│   ├── sections/       # Hero, Stats, Projects, Reviews, About, Contact
│   └── ...             # Navbar, Footer, Cards, Modal, Scan-Effekte
├── lib/                # supabase, data, auth, animations, constants, utils
└── types/              # zentrale TypeScript-Typen
```

---

## Skripte

| Befehl          | Zweck                       |
| --------------- | --------------------------- |
| `npm run dev`   | Entwicklungsserver          |
| `npm run build` | Produktions-Build           |
| `npm run start` | Produktionsserver           |
| `npm run lint`  | ESLint                      |

---

## Deployment (Vercel)

1. Repository zu Vercel verbinden.
2. Environment-Variablen (siehe oben) im Vercel-Projekt setzen.
3. Deploy. Supabase läuft als gehosteter Service – keine weitere Infrastruktur nötig.
