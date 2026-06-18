"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FolderKanban,
  Star,
  Settings as SettingsIcon,
  LogOut,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { DEFAULT_SETTINGS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Project, Review, SiteSettings } from "@/types";
import { ProjectsTab } from "./ProjectsTab";
import { ReviewsTab } from "./ReviewsTab";
import { SettingsTab } from "./SettingsTab";

type Tab = "projekte" | "bewertungen" | "einstellungen";

const TABS: { id: Tab; label: string; icon: typeof FolderKanban }[] = [
  { id: "projekte", label: "Projekte", icon: FolderKanban },
  { id: "bewertungen", label: "Bewertungen", icon: Star },
  { id: "einstellungen", label: "Einstellungen", icon: SettingsIcon },
];

export function AdminDashboard({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projekte");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  const loadProjects = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });
    if (data) setProjects(data as Project[]);
  }, []);

  const loadReviews = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { data } = await supabase
      .from("reviews")
      .select("*, project:projects(id, title)")
      .order("created_at", { ascending: false });
    if (data) setReviews(data as unknown as Review[]);
  }, []);

  const loadSettings = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      const merged = { ...DEFAULT_SETTINGS };
      for (const row of data) if (row.value) merged[row.key] = row.value;
      setSettings(merged);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([loadProjects(), loadReviews(), loadSettings()]);
      setLoading(false);
    })();
  }, [loadProjects, loadReviews, loadSettings]);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    toast.success("Abgemeldet.");
    router.replace("/admin/login");
    router.refresh();
  }

  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div className="min-h-screen bg-void">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-mist bg-steel/90 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold text-bone">
              {SITE.name}
            </span>
            <span className="hidden text-xs uppercase tracking-widest2 text-gold sm:inline">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-ash sm:inline">{userEmail}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm text-ash transition-colors hover:text-error"
            >
              <LogOut size={16} />
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:px-8">
        {/* Sidebar */}
        <nav className="flex gap-2 md:w-56 md:flex-col">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "flex flex-1 items-center gap-2.5 rounded-[3px] px-4 py-3 text-sm font-medium transition-colors md:flex-none",
                tab === id
                  ? "bg-iron text-gold"
                  : "text-ash hover:bg-iron/50 hover:text-bone",
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
              {id === "bewertungen" && pendingCount > 0 && (
                <span className="ml-auto rounded-full bg-gold px-1.5 text-xs font-bold text-void">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-ash">
              <Loader2 className="mr-2 animate-spin" size={20} />
              Lädt Daten…
            </div>
          ) : (
            <>
              {tab === "projekte" && (
                <ProjectsTab projects={projects} onChange={loadProjects} />
              )}
              {tab === "bewertungen" && (
                <ReviewsTab reviews={reviews} onChange={loadReviews} />
              )}
              {tab === "einstellungen" && (
                <SettingsTab settings={settings} onChange={loadSettings} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
