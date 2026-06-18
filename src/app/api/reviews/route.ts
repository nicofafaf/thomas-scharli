import { NextResponse } from "next/server";
import { z } from "zod";
import { reviewSchema } from "@/lib/validation";
import { getSupabaseRouteClient } from "@/lib/supabase-server";
import { isSupabaseConfigured } from "@/lib/supabase";

const payloadSchema = reviewSchema.extend({
  project_id: z.string().uuid("Ungültiges Projekt.").nullable().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message ?? "Eingabe ungültig.";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  const {
    author_name,
    company,
    email,
    rating,
    comment,
    project_id,
    service_type,
    would_recommend,
  } = parsed.data;

  // Demo-Modus ohne Supabase: Erfolg simulieren
  const supabase = getSupabaseRouteClient();
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      {
        ok: true,
        demo: true,
        message:
          "Demo-Modus: Bewertung erfasst (es ist kein Supabase-Backend verbunden).",
      },
      { status: 201 },
    );
  }

  const { error } = await supabase.from("reviews").insert({
    project_id: project_id ?? null,
    author_name,
    company: company || null,
    email: email.toLowerCase(),
    rating,
    comment,
    service_type,
    would_recommend: would_recommend ?? true,
    approved: false,
  });

  if (error) {
    // Unique-Verletzung (Rate Limiting: 1 Bewertung pro E-Mail/Projekt)
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Sie haben dieses Projekt bereits bewertet." },
        { status: 409 },
      );
    }
    console.error("[api/reviews] insert:", error.message);
    return NextResponse.json(
      { error: "Die Bewertung konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
