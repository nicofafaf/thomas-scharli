import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Ist Supabase ueberhaupt konfiguriert? Solange keine Keys gesetzt sind,
 * faellt die Seite auf Mock-Daten zurueck und bleibt vollstaendig demobar.
 */
export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("xxxx") &&
    SUPABASE_ANON_KEY.length > 20,
);

/**
 * Browser-Client (Client Components). Teilt sich die Session via Cookies
 * mit Server-Components und Middleware (auth-helpers).
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) return null;
  return createClientComponentClient();
}

export const STORAGE_BUCKET = "project-images";
