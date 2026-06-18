-- ============================================================================
--  Thomas Scharli – Transport & Umzug
--  Migration: Öffentliche Bewertungsseite + Direktbewertungen
--  NACH schema.sql / seed.sql im SQL-Editor ausführen. Idempotent.
-- ============================================================================

-- 1) reviews: project_id optional (Direktbewertung ohne Projektbezug)
ALTER TABLE reviews ALTER COLUMN project_id DROP NOT NULL;

-- 2) Neue Spalten
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS service_type TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS would_recommend BOOLEAN DEFAULT true;

-- 3) Rate-Limit für Direktbewertungen (1 pro E-Mail + Leistungsart, wenn kein Projekt)
CREATE UNIQUE INDEX IF NOT EXISTS reviews_email_service_unique
  ON reviews (lower(email), service_type)
  WHERE project_id IS NULL;

-- 4) Hilfreich-Votes
CREATE TABLE IF NOT EXISTS review_votes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id  UUID REFERENCES reviews(id) ON DELETE CASCADE,
  voter_fp   TEXT NOT NULL,                 -- anonymer Browser-Fingerprint (kein PII)
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (review_id, voter_fp)
);

ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read votes" ON review_votes;
CREATE POLICY "public read votes" ON review_votes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public insert votes" ON review_votes;
CREATE POLICY "public insert votes" ON review_votes
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "auth delete votes" ON review_votes;
CREATE POLICY "auth delete votes" ON review_votes
  FOR DELETE USING (auth.role() = 'authenticated');

-- 5) View mit Hilfreich-Count (nur freigegebene Bewertungen)
CREATE OR REPLACE VIEW reviews_with_votes AS
  SELECT r.*, COUNT(rv.id)::int AS helpful_count
  FROM reviews r
  LEFT JOIN review_votes rv ON rv.review_id = r.id
  WHERE r.approved = true
  GROUP BY r.id;

GRANT SELECT ON reviews_with_votes TO anon, authenticated;
