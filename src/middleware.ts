import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Ohne Supabase-Konfiguration koennen wir keine Session pruefen.
  // Die Dashboard-Seite selbst zeigt dann einen entsprechenden Hinweis.
  if (!url || !key || url.includes("xxxx")) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.startsWith("/admin/dashboard")) {
    const redirectUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
