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
    .select("*, project:projects(id, title)")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("[data] getApprovedReviews:", error?.message);
    return MOCK_REVIEWS;
  }
  return data as unknown as Review[];
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
