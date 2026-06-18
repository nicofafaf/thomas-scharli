"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";
import { SITE } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      toast.error("Supabase ist nicht konfiguriert.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      toast.error("Anmeldung fehlgeschlagen. Bitte Daten prüfen.");
      return;
    }
    toast.success("Willkommen zurück, Thomas.");
    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block text-center">
          <p className="font-display text-3xl font-semibold text-bone">
            {SITE.name}
          </p>
          <p className="text-xs uppercase tracking-widest2 text-gold">
            Admin-Bereich
          </p>
        </Link>

        {!isSupabaseConfigured && (
          <div className="mb-6 flex items-start gap-3 rounded-[3px] border border-gold/40 bg-gold-dim p-4 text-sm text-gold-light">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <p>
              Supabase ist nicht konfiguriert. Hinterlegen Sie die Keys in
              <code className="mx-1 rounded bg-void px-1">.env.local</code>, um
              sich anzumelden.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[4px] border border-mist bg-steel p-6 shadow-card"
        >
          <div className="mb-2 flex items-center gap-2 text-bone">
            <Lock size={18} className="text-gold" />
            <span className="font-display text-xl">Anmelden</span>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-bone">
              E-Mail
            </span>
            <input
              type="email"
              required
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="thomas@scharli.de"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-bone">
              Passwort
            </span>
            <input
              type="password"
              required
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Anmelden…
              </>
            ) : (
              "Anmelden"
            )}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-ash transition-colors hover:text-bone"
        >
          ← Zurück zur Website
        </Link>
      </div>
    </div>
  );
}
