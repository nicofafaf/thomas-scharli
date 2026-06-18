import { getSupabaseServerClient } from "./supabase-server";
import { DEFAULT_SETTINGS } from "./constants";
import { MOCK_PROJECTS, MOCK_REVIEWS } from "./mock-data";
import type { Project, Review, SiteSettings } from "@/types";

/**
 * Datenzugriffsschicht. Jede Funktion nutzt Supabase, wenn konfiguriert,
 * und faellt sonst transparent auf Mock-Daten zurueck. So bleibt die
 * Seite jederzeit demobar und stuerzt nie wegen fehlendem Backend ab.
 */

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return MOCK_PROJECTS;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("[data] getProjects:", error?.message);
    return MOCK_PROJECTS;
  }
  return data as Project[];
}

export async function getApprovedReviews(): Promise<Review[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return MOCK_REVIEWS;

  const { data, error } = await supabase
    .from("reviews")
    .select("*, project:projects(id, title, category)")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("[data] getApprovedReviews:", error?.message);
    return MOCK_REVIEWS;
  }
  return data as unknown as Review[];
}

/**
 * Alle freigegebenen Bewertungen inkl. Hilfreich-Count (View reviews_with_votes)
 * und Projekt-Titel. Filtern/Sortieren passiert clientseitig auf /bewertungen.
 * Faellt robust zurueck, falls die View (Migration) noch nicht existiert.
 */
export async function getAllApprovedReviews(): Promise<Review[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return MOCK_REVIEWS;

  // Projekt-Titel-Map fuer die optionale Projektreferenz
  const { data: projectRows } = await supabase
    .from("projects")
    .select("id, title, category");
  const projectMap = new Map(
    (projectRows ?? []).map((p) => [p.id, p as Project]),
  );

  // Bevorzugt die View (mit helpful_count); sonst Fallback auf reviews
  let rows: Review[] | null = null;
  const view = await supabase
    .from("reviews_with_votes")
    .select("*")
    .order("created_at", { ascending: false });

  if (!view.error && view.data) {
    rows = view.data as unknown as Review[];
  } else {
    const fallback = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (fallback.error || !fallback.data) {
      console.error("[data] getAllApprovedReviews:", fallback.error?.message);
      return MOCK_REVIEWS;
    }
    rows = fallback.data as unknown as Review[];
  }

  return rows.map((r) => {
    const project = r.project_id ? projectMap.get(r.project_id) : null;
    return {
      ...r,
      helpful_count: r.helpful_count ?? 0,
      would_recommend: r.would_recommend ?? true,
      project: project
        ? { id: project.id, title: project.title, category: project.category }
        : null,
    };
  });
}

export async function getSettings(): Promise<SiteSettings> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return DEFAULT_SETTINGS;

  const { data, error } = await supabase.from("site_settings").select("*");

  if (error || !data) {
    console.error("[data] getSettings:", error?.message);
    return DEFAULT_SETTINGS;
  }

  const merged: SiteSettings = { ...DEFAULT_SETTINGS };
  for (const row of data) {
    if (row.value) merged[row.key] = row.value;
  }
  return merged;
}
