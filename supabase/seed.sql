-- ============================================================================
--  Thomas Scharli – Transport & Umzug
--  Seed-Daten  (NACH schema.sql im SQL Editor ausfuehren)
--  Befuellt die Galerie mit den 9 echten Referenzen + 4 Bewertungen.
--  Bilder liegen lokal unter /public/media/projekte/{image_key}.jpg
-- ============================================================================

-- --- PROJEKTE -------------------------------------------------------------
INSERT INTO projects (id, title, category, description, location, year, image_url, image_key, featured, order_index, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Vespa sicher überführt', 'Zweirad-Transport', 'Klassische Vespa, professionell verzurrt und ohne einen Kratzer ans Ziel gebracht. Standsicher fixiert für die gesamte Strecke.', 'Stuttgart', 2024, NULL, '11', true, 0, '2024-04-10T10:00:00Z'),
  ('22222222-2222-2222-2222-222222222222', 'Wohnungsumzug komplett', 'Umzug', 'Möbel und Hausrat sorgfältig in Decken und Folie verpackt, transportiert und am neuen Wohnort wieder aufgebaut.', 'Esslingen', 2024, NULL, '5', true, 1, '2024-02-18T10:00:00Z'),
  ('33333333-3333-3333-3333-333333333333', 'Piaggio Ape Überführung', 'Fahrzeugtransport', 'Kult-Dreirad über die Auffahrrampe verladen, mittig fixiert und schonend zum neuen Besitzer gebracht.', 'Ludwigsburg', 2023, NULL, '9', false, 2, '2023-09-12T10:00:00Z'),
  ('44444444-4444-4444-4444-444444444444', 'Motorradtransport über Land', 'Zweirad-Transport', 'Motorrad fachgerecht im Vorderradständer gesichert – komfortabel und sicher, auch über längere Distanzen.', 'Region Stuttgart', 2024, NULL, '13', true, 3, '2024-05-02T10:00:00Z'),
  ('55555555-5555-5555-5555-555555555555', 'Mobilitätshilfe transportiert', 'Spezialtransport', 'Elektro-Mobil mit Sorgfalt verladen und sicher fixiert. Mobilität, die zuverlässig ankommt.', 'Böblingen', 2023, NULL, '12', false, 4, '2023-11-20T10:00:00Z'),
  ('66666666-6666-6666-6666-666666666666', 'Treppenlift-Transport bei Nacht', 'Spezialtransport', 'Hebebühne und Liftmodul nachts über die Rampe verladen – termingerecht und millimetergenau gesichert.', 'Stuttgart', 2024, NULL, '7', false, 5, '2024-01-15T10:00:00Z'),
  ('77777777-7777-7777-7777-777777777777', 'E-Mobil Überführung', 'Fahrzeugtransport', 'Elektrisches Leichtfahrzeug verladen, verzurrt und sauber überführt – emissionsfrei am Ziel.', 'Tübingen', 2024, NULL, '14', false, 6, '2024-06-01T10:00:00Z'),
  ('88888888-8888-8888-8888-888888888888', 'Roller-Sammeltransport', 'Zweirad-Transport', 'Mehrere Roller in einer Fahrt – platzsparend geladen und einzeln gesichert. Effizient und schonend.', 'Stuttgart', 2023, NULL, '10', false, 7, '2023-07-28T10:00:00Z'),
  ('99999999-9999-9999-9999-999999999999', 'Sofa & Möbeltransport', 'Umzug', 'Polstermöbel in Luftpolsterfolie geschützt, sicher verzurrt und ohne Druckstellen geliefert.', 'Waiblingen', 2023, NULL, '6', false, 8, '2023-10-09T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- --- BEWERTUNGEN (bereits freigegeben) ------------------------------------
INSERT INTO reviews (id, project_id, author_name, company, email, rating, comment, approved, created_at) VALUES
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Markus Weber', NULL, 'm.weber@example.com', 5, 'Meine Vespa wurde absolut professionell verzurrt und kam ohne einen einzigen Kratzer an. Pünktlich, freundlich, top.', true, '2024-04-12T10:00:00Z'),
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Sabine Hofmann', NULL, 's.hofmann@example.com', 5, 'Unser kompletter Umzug lief stressfrei. Alles sauber verpackt, nichts beschädigt und am Ende sogar wieder aufgebaut. Klare Empfehlung!', true, '2024-02-22T10:00:00Z'),
  ('a3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Thomas Bauer', 'Bauer Oldtimer', 't.bauer@example.com', 5, 'Die Ape ist ein seltenes Stück – hier wurde mit echtem Fingerspitzengefühl gearbeitet. So muss Fahrzeugtransport sein.', true, '2023-09-15T10:00:00Z'),
  ('a4444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555', 'Julia Roth', NULL, 'j.roth@example.com', 5, 'Das Elektromobil meiner Mutter wurde super sicher transportiert. Sehr rücksichtsvoll und zuverlässig – vielen Dank!', true, '2023-11-23T10:00:00Z')
ON CONFLICT (id) DO NOTHING;
