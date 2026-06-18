-- ============================================================================
--  Thomas Scharli – Facility and More
--  Supabase Schema  (im SQL Editor des Projekts ausfuehren)
-- ============================================================================

-- ---------------------------------------------------------------------------
--  PROJEKTE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,          -- z.B. "Gebäudereinigung", "Haustechnik"
  description TEXT,
  location    TEXT,
  year        INTEGER,
  image_url   TEXT,                   -- Supabase Storage URL (Admin-Upload, hat Vorrang)
  image_key   TEXT,                   -- lokaler Dateiname ohne Extension, z.B. "1" -> /media/projekte/1.jpg
  featured    BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Falls die Tabelle bereits existierte: image_key nachruesten
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_key TEXT;

-- ---------------------------------------------------------------------------
--  BEWERTUNGEN
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID REFERENCES projects(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  company     TEXT,
  email       TEXT NOT NULL,
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT NOT NULL,
  approved    BOOLEAN DEFAULT false,   -- muss vom Admin freigegeben werden
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Rate Limiting: max. 1 Bewertung pro E-Mail pro Projekt
CREATE UNIQUE INDEX IF NOT EXISTS reviews_email_project_unique
  ON reviews (project_id, lower(email));

CREATE INDEX IF NOT EXISTS reviews_approved_idx ON reviews (approved);

-- ---------------------------------------------------------------------------
--  SITE EINSTELLUNGEN
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Standard-Werte
INSERT INTO site_settings (key, value) VALUES
  ('hero_title', 'Wir bringen, was zählt.'),
  ('hero_subtitle', 'Transport, Umzug und Montage – schnell, sicher, stressfrei.'),
  ('hero_image', ''),
  ('contact_phone', '0152 21331526'),
  ('contact_email', 'info@thomas-scharli.de'),
  ('contact_address', 'Region Stuttgart'),
  ('stats_projects', '500'),
  ('stats_years', '2'),
  ('stats_satisfaction', '100'),
  ('stats_sectors', '5')
ON CONFLICT (key) DO NOTHING;

-- ---------------------------------------------------------------------------
--  ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Projekte: alle lesen, nur auth schreiben
DROP POLICY IF EXISTS "public read projects" ON projects;
CREATE POLICY "public read projects" ON projects
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "auth write projects" ON projects;
CREATE POLICY "auth write projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Reviews: alle koennen einfuegen, nur approved sind oeffentlich sichtbar
DROP POLICY IF EXISTS "public read approved reviews" ON reviews;
CREATE POLICY "public read approved reviews" ON reviews
  FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS "public insert reviews" ON reviews;
CREATE POLICY "public insert reviews" ON reviews
  FOR INSERT WITH CHECK (approved = false);

DROP POLICY IF EXISTS "auth manage reviews" ON reviews;
CREATE POLICY "auth manage reviews" ON reviews
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Settings: alle lesen, nur auth schreiben
DROP POLICY IF EXISTS "public read settings" ON site_settings;
CREATE POLICY "public read settings" ON site_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "auth write settings" ON site_settings;
CREATE POLICY "auth write settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
--  STORAGE  (Bucket "project-images")
--  Hinweis: Bucket im Dashboard anlegen ODER folgenden Aufruf nutzen.
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880,                                  -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Public read fuer den Bucket
DROP POLICY IF EXISTS "public read project images" ON storage.objects;
CREATE POLICY "public read project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

-- Authenticated write/update/delete
DROP POLICY IF EXISTS "auth write project images" ON storage.objects;
CREATE POLICY "auth write project images" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');
