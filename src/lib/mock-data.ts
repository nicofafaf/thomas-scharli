import type { Project, Review } from "@/types";

/**
 * Mock-Daten fuer den Demo-Modus (ohne Supabase) – basierend auf den echten
 * Auftraegen von Thomas Scharli (Transport & Umzug). image_key verweist auf
 * /public/media/projekte/{key}.jpg. Sobald Supabase konfiguriert ist, werden
 * diese durch echte Daten ersetzt.
 */
export const MOCK_PROJECTS: Project[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Vespa sicher überführt",
    category: "Zweirad-Transport",
    description:
      "Klassische Vespa, professionell verzurrt und ohne einen Kratzer ans Ziel gebracht. Standsicher fixiert für die gesamte Strecke.",
    location: "Stuttgart",
    year: 2024,
    image_url: null,
    image_key: "11",
    featured: true,
    order_index: 0,
    created_at: "2024-04-10T10:00:00Z",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "Wohnungsumzug komplett",
    category: "Umzug",
    description:
      "Möbel und Hausrat sorgfältig in Decken und Folie verpackt, transportiert und am neuen Wohnort wieder aufgebaut.",
    location: "Esslingen",
    year: 2024,
    image_url: null,
    image_key: "5",
    featured: true,
    order_index: 1,
    created_at: "2024-02-18T10:00:00Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "Piaggio Ape Überführung",
    category: "Fahrzeugtransport",
    description:
      "Kult-Dreirad über die Auffahrrampe verladen, mittig fixiert und schonend zum neuen Besitzer gebracht.",
    location: "Ludwigsburg",
    year: 2023,
    image_url: null,
    image_key: "9",
    featured: false,
    order_index: 2,
    created_at: "2023-09-12T10:00:00Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    title: "Motorradtransport über Land",
    category: "Zweirad-Transport",
    description:
      "Motorrad fachgerecht im Vorderradständer gesichert – komfortabel und sicher, auch über längere Distanzen.",
    location: "Region Stuttgart",
    year: 2024,
    image_url: null,
    image_key: "13",
    featured: true,
    order_index: 3,
    created_at: "2024-05-02T10:00:00Z",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    title: "Mobilitätshilfe transportiert",
    category: "Spezialtransport",
    description:
      "Elektro-Mobil mit Sorgfalt verladen und sicher fixiert. Mobilität, die zuverlässig ankommt.",
    location: "Böblingen",
    year: 2023,
    image_url: null,
    image_key: "12",
    featured: false,
    order_index: 4,
    created_at: "2023-11-20T10:00:00Z",
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    title: "Treppenlift-Transport bei Nacht",
    category: "Spezialtransport",
    description:
      "Hebebühne und Liftmodul nachts über die Rampe verladen – termingerecht und millimetergenau gesichert.",
    location: "Stuttgart",
    year: 2024,
    image_url: null,
    image_key: "7",
    featured: false,
    order_index: 5,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "77777777-7777-7777-7777-777777777777",
    title: "E-Mobil Überführung",
    category: "Fahrzeugtransport",
    description:
      "Elektrisches Leichtfahrzeug verladen, verzurrt und sauber überführt – emissionsfrei am Ziel.",
    location: "Tübingen",
    year: 2024,
    image_url: null,
    image_key: "14",
    featured: false,
    order_index: 6,
    created_at: "2024-06-01T10:00:00Z",
  },
  {
    id: "88888888-8888-8888-8888-888888888888",
    title: "Roller-Sammeltransport",
    category: "Zweirad-Transport",
    description:
      "Mehrere Roller in einer Fahrt – platzsparend geladen und einzeln gesichert. Effizient und schonend.",
    location: "Stuttgart",
    year: 2023,
    image_url: null,
    image_key: "10",
    featured: false,
    order_index: 7,
    created_at: "2023-07-28T10:00:00Z",
  },
  {
    id: "99999999-9999-9999-9999-999999999999",
    title: "Sofa & Möbeltransport",
    category: "Umzug",
    description:
      "Polstermöbel in Luftpolsterfolie geschützt, sicher verzurrt und ohne Druckstellen geliefert.",
    location: "Waiblingen",
    year: 2023,
    image_url: null,
    image_key: "6",
    featured: false,
    order_index: 8,
    created_at: "2023-10-09T10:00:00Z",
  },
];

// Bewusst leer: keine erfundenen Bewertungen. Echte Bewertungen kommen aus
// Supabase und werden erst nach Freigabe oeffentlich angezeigt.
export const MOCK_REVIEWS: Review[] = [];
