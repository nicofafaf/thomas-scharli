-- ============================================================================
--  Thomas Scharli - Transport & Umzug
--  Migration: Echte MyHammer-Bewertungen + korrekte Stats (266 / 4.9 / 27)
--  Ersetzt NUR die 4 bekannten Demo-Bewertungen (feste IDs) - echte
--  Kundenbewertungen mit zufaelligen UUIDs bleiben unangetastet. Idempotent.
-- ============================================================================

-- 1) Demo-/Seed-Bewertungen entfernen (nur diese festen IDs)
DELETE FROM reviews WHERE id IN (
  'a1111111-1111-1111-1111-111111111111',
  'a2222222-2222-2222-2222-222222222222',
  'a3333333-3333-3333-3333-333333333333',
  'a4444444-4444-4444-4444-444444444444'
);

-- 2) Echte, oeffentlich einsehbare MyHammer-Bewertungen einfuegen
INSERT INTO reviews (id, project_id, author_name, company, email, rating, comment, service_type, would_recommend, approved, created_at) VALUES
  ('b0000001-0000-0000-0000-000000000001', NULL, 'Bernd aus Calw', NULL, 'myhammer-1@import.local', 5, 'Sehr zuverlässig, ein Unternehmer der selbstständig handelt. Bin sehr glücklich – meine erste MyHammer-Erfahrung ist absolut positiv. Thomas ist weiter zu empfehlen.', 'Fahrzeugtransport', true, true, '2025-10-29T10:00:00Z'),
  ('b0000002-0000-0000-0000-000000000002', NULL, 'Kunde aus Memmingen', NULL, 'myhammer-2@import.local', 5, 'Es ging alles sehr schnell, sofort und zuverlässig reagiert und geliefert. Alles perfekt! Wir haben eine Matratze von Berlin nach Bayern transportieren lassen – war innerhalb von 2 Tagen da!', 'Umzug', true, true, '2025-10-30T09:00:00Z'),
  ('b0000003-0000-0000-0000-000000000003', NULL, 'E. aus Hasloch', NULL, 'myhammer-3@import.local', 5, 'Sehr gute Kommunikation im Vorfeld des Transports, faires Preisangebot, alles eingehalten und den Schrank ohne Schaden transportiert. Vielen Dank!', 'Umzug', true, true, '2025-11-05T14:00:00Z'),
  ('b0000004-0000-0000-0000-000000000004', NULL, 'Kunde aus Bürstadt', NULL, 'myhammer-4@import.local', 5, 'Guter freundlicher Kontakt, direkte Auslieferung, alles super – immer wieder!', 'Fahrzeugtransport', true, true, '2025-10-28T11:00:00Z'),
  ('b0000005-0000-0000-0000-000000000005', NULL, 'Barbara Kaiser, München', NULL, 'myhammer-5@import.local', 5, 'Thomas war nett und flexibel – ich danke ihm für den Transport und alles!', 'Umzug', true, true, '2025-11-06T08:00:00Z'),
  ('b0000006-0000-0000-0000-000000000006', NULL, 'Kunde aus Buchbach', NULL, 'myhammer-6@import.local', 5, 'Zuverlässig, pünktlich, geht pfleglich mit den Sachen um.', 'Umzug', true, true, '2025-11-01T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- 3) Stats + Hero-Subtitle auf die echte Realitaet setzen
INSERT INTO site_settings (key, value) VALUES
  ('stats_reviews', '266'),
  ('stats_rating', '4.9'),
  ('stats_satisfaction', '100'),
  ('stats_cities', '27'),
  ('hero_subtitle', 'Von Stuttgart bis Berlin – Zweiräder, Fahrzeuge, Umzüge. Über 266 zufriedene Kunden sprechen für sich.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
