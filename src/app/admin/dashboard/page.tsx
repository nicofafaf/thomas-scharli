import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getServerUser } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void px-6">
        <div className="max-w-md rounded-[4px] border border-gold/40 bg-gold-dim p-8 text-center">
          <AlertTriangle size={32} className="mx-auto text-gold-light" />
          <h1 className="mt-4 font-display text-2xl text-bone">
            Supabase nicht konfiguriert
          </h1>
          <p className="mt-2 text-sm text-gold-light">
            Hinterlegen Sie <code className="rounded bg-void px-1">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            und <code className="rounded bg-void px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code className="rounded bg-void px-1">.env.local</code>, um das
            Dashboard zu nutzen.
          </p>
          <Link href="/" className="btn-ghost mt-6 inline-flex">
            Zur Website
          </Link>
        </div>
      </div>
    );
  }

  const user = await getServerUser();
  if (!user) redirect("/admin/login");

  return <AdminDashboard userEmail={user.email ?? "Admin"} />;
}
