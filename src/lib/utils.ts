import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Project } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Bildquelle eines Projekts. Prioritaet: Supabase-Upload (image_url) vor
 * lokalem Medienpfad (image_key -> /media/projekte/{key}.jpg). Sonst null
 * (Karte zeigt dann einen Platzhalter).
 */
export function projectImageSrc(
  project: Pick<Project, "image_url" | "image_key">,
): string | null {
  if (project.image_url) return project.image_url;
  if (project.image_key) return `/media/projekte/${project.image_key}.jpg`;
  return null;
}

export function formatDate(value: string | Date, locale = "de-DE"): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

// "47" -> 47, "100%" -> 100, fehlertolerant
export function parseStat(value: string | undefined, fallback = 0): number {
  if (!value) return fallback;
  const parsed = parseInt(value.replace(/[^0-9-]/g, ""), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}
