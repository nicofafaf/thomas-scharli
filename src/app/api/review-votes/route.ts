import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseRouteClient } from "@/lib/supabase-server";
import { isSupabaseConfigured } from "@/lib/supabase";

const voteSchema = z.object({
  review_id: z.string().uuid("Ungültige Bewertung."),
  voter_fp: z.string().min(4).max(64),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = voteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Eingabe ungültig." }, { status: 422 });
  }

  const supabase = getSupabaseRouteClient();
  if (!isSupabaseConfigured || !supabase) {
    // Demo-Modus: Erfolg simulieren
    return NextResponse.json({ ok: true, demo: true }, { status: 201 });
  }

  const { review_id, voter_fp } = parsed.data;
  const { error } = await supabase
    .from("review_votes")
    .insert({ review_id, voter_fp });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Bereits als hilfreich markiert." },
        { status: 409 },
      );
    }
    console.error("[api/review-votes] insert:", error.message);
    return NextResponse.json(
      { error: "Konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reviewId = searchParams.get("review_id");
  if (!reviewId) {
    return NextResponse.json({ error: "review_id fehlt." }, { status: 400 });
  }

  const supabase = getSupabaseRouteClient();
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({ helpful_count: 0 }, { status: 200 });
  }

  const { count, error } = await supabase
    .from("review_votes")
    .select("id", { count: "exact", head: true })
    .eq("review_id", reviewId);

  if (error) {
    return NextResponse.json({ helpful_count: 0 }, { status: 200 });
  }
  return NextResponse.json({ helpful_count: count ?? 0 }, { status: 200 });
}
