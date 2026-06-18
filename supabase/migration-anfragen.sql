-- ============================================================================
--  Thomas Scharli - Transport & Umzug
--  Migration: Auftrags-/Kontaktanfragen (inquiries)
--  NACH schema.sql ausfuehren. Idempotent.
-- ============================================================================

CREATE TABLE IF NOT EXISTS inquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  service_type  TEXT NOT NULL,
  from_location TEXT,
  to_location   TEXT,
  date_wished   TEXT,
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'neu',   -- 'neu' | 'gesehen' | 'erledigt'
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_created_idx ON inquiries (created_at DESC);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Jeder darf eine Anfrage absenden (oeffentlich)
DROP POLICY IF EXISTS "public insert inquiries" ON inquiries;
CREATE POLICY "public insert inquiries"
  ON inquiries FOR INSERT WITH CHECK (true);

-- Nur Admin (eingeloggt) darf lesen
DROP POLICY IF EXISTS "auth read inquiries" ON inquiries;
CREATE POLICY "auth read inquiries"
  ON inquiries FOR SELECT USING (auth.role() = 'authenticated');

-- Nur Admin darf Status aendern
DROP POLICY IF EXISTS "auth update inquiries" ON inquiries;
CREATE POLICY "auth update inquiries"
  ON inquiries FOR UPDATE USING (auth.role() = 'authenticated');

-- Nur Admin darf loeschen
DROP POLICY IF EXISTS "auth delete inquiries" ON inquiries;
CREATE POLICY "auth delete inquiries"
  ON inquiries FOR DELETE USING (auth.role() = 'authenticated');
