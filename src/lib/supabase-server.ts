import { cookies } from "next/headers";
import {
  createServerComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { isSupabaseConfigured } from "./supabase";

/**
 * Supabase-Client fuer Server Components / Pages.
 * Gibt null zurueck, wenn keine Keys konfiguriert sind (Mock-Modus).
 */
export function getSupabaseServerClient() {
  if (!isSupabaseConfigured) return null;
  return createServerComponentClient({ cookies });
}

/**
 * Supabase-Client fuer Route Handlers (API Routes).
 */
export function getSupabaseRouteClient() {
  if (!isSupabaseConfigured) return null;
  return createRouteHandlerClient({ cookies });
}
