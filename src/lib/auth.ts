import { getSupabaseServerClient } from "./supabase-server";

/**
 * Liefert die aktuelle Session serverseitig (oder null im Mock-Modus
 * bzw. wenn kein Nutzer eingeloggt ist).
 */
export async function getServerSession() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
