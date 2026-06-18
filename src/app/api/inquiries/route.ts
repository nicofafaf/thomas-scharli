import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { getSupabaseRouteClient } from "@/lib/supabase-server";
import { isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message ?? "Eingabe ungültig.";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  const { name, phone, email, service_type, from_location, to_location, date_wished, message } =
    parsed.data;

  // Demo-Modus ohne Supabase: Erfolg simulieren
  const supabase = getSupabaseRouteClient();
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      {
        ok: true,
        demo: true,
        message:
          "Demo-Modus: Anfrage erfasst (es ist kein Supabase-Backend verbunden).",
      },
      { status: 201 },
    );
  }

  const { error } = await supabase.from("inquiries").insert({
    name,
    phone,
    email: email ? email.toLowerCase() : null,
    service_type,
    from_location: from_location || null,
    to_location: to_location || null,
    date_wished: date_wished || null,
    message: message || null,
    status: "neu",
  });

  if (error) {
    console.error("[api/inquiries] insert:", error.message);
    return NextResponse.json(
      { error: "Die Anfrage konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
