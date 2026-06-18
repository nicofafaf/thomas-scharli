"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Save, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { getSupabaseBrowserClient, STORAGE_BUCKET } from "@/lib/supabase";
import type { SiteSettings } from "@/types";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export function SettingsTab({
  settings,
  onChange,
}: {
  settings: SiteSettings;
  onChange: () => void | Promise<void>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED.includes(file.type)) {
      toast.error("Nur JPG, PNG oder WebP erlaubt.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Maximale Dateigröße: 5 MB.");
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `hero/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: false });
    if (error) {
      toast.error("Upload fehlgeschlagen.");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    set("hero_image", data.publicUrl);
    setUploading(false);
    toast.success("Hero-Bild hochgeladen.");
  }

  async function save() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setSaving(true);
    const rows = Object.entries(values).map(([key, value]) => ({
      key,
      value: value ?? "",
    }));
    const { error } = await supabase.from("site_settings").upsert(rows);
    setSaving(false);
    if (error) {
      toast.error("Speichern fehlgeschlagen.");
      return;
    }
    toast.success("Einstellungen gespeichert.");
    await onChange();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-bone">Einstellungen</h1>
          <p className="text-sm text-ash">
            Inhalte der Website pflegen.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="btn-gold text-sm disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Speichert…
            </>
          ) : (
            <>
              <Save size={16} /> Speichern
            </>
          )}
        </button>
      </div>

      <div className="space-y-8">
        <Group title="Hero">
          <Field label="Haupttitel">
            <input
              className="field"
              value={values.hero_title ?? ""}
              onChange={(e) => set("hero_title", e.target.value)}
            />
          </Field>
          <Field label="Untertitel">
            <input
              className="field"
              value={values.hero_subtitle ?? ""}
              onChange={(e) => set("hero_subtitle", e.target.value)}
            />
          </Field>
          <Field label="Hintergrundbild">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-[3px] border border-mist bg-iron">
                {values.hero_image ? (
                  <Image
                    src={values.hero_image}
                    alt="Hero-Vorschau"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-ash">
                    Standard
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleHeroUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="btn-ghost text-sm disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Lädt…
                  </>
                ) : (
                  <>
                    <Upload size={16} /> Bild wählen
                  </>
                )}
              </button>
            </div>
          </Field>
        </Group>

        <Group title="Kontakt">
          <Field label="Telefon">
            <input
              className="field"
              value={values.contact_phone ?? ""}
              onChange={(e) => set("contact_phone", e.target.value)}
            />
          </Field>
          <Field label="E-Mail">
            <input
              className="field"
              value={values.contact_email ?? ""}
              onChange={(e) => set("contact_email", e.target.value)}
            />
          </Field>
          <Field label="Adresse / Region">
            <input
              className="field"
              value={values.contact_address ?? ""}
              onChange={(e) => set("contact_address", e.target.value)}
            />
          </Field>
        </Group>

        <Group title="Statistiken">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Field label="Transporte">
              <input
                className="field"
                inputMode="numeric"
                value={values.stats_projects ?? ""}
                onChange={(e) => set("stats_projects", e.target.value)}
              />
            </Field>
            <Field label="Jahre">
              <input
                className="field"
                inputMode="numeric"
                value={values.stats_years ?? ""}
                onChange={(e) => set("stats_years", e.target.value)}
              />
            </Field>
            <Field label="Zufriedenheit %">
              <input
                className="field"
                inputMode="numeric"
                value={values.stats_satisfaction ?? ""}
                onChange={(e) => set("stats_satisfaction", e.target.value)}
              />
            </Field>
            <Field label="Leistungen">
              <input
                className="field"
                inputMode="numeric"
                value={values.stats_sectors ?? ""}
                onChange={(e) => set("stats_sectors", e.target.value)}
              />
            </Field>
          </div>
        </Group>

        <Group title="Impressum">
          <Field label="Name / Firma">
            <input
              className="field"
              value={values.impressum_name ?? ""}
              onChange={(e) => set("impressum_name", e.target.value)}
            />
          </Field>
          <Field label="Straße + Hausnummer">
            <input
              className="field"
              value={values.impressum_street ?? ""}
              onChange={(e) => set("impressum_street", e.target.value)}
            />
          </Field>
          <Field label="PLZ + Ort">
            <input
              className="field"
              value={values.impressum_city ?? ""}
              onChange={(e) => set("impressum_city", e.target.value)}
            />
          </Field>
          <Field label="USt-ID (optional)">
            <input
              className="field"
              value={values.impressum_vatid ?? ""}
              onChange={(e) => set("impressum_vatid", e.target.value)}
            />
          </Field>
          <p className="text-xs text-ash">
            Diese Angaben erscheinen auf der Impressum-Seite. Die E-Mail wird aus
            dem Bereich „Kontakt“ übernommen.
          </p>
        </Group>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[4px] border border-mist bg-iron p-5">
      <h2 className="mb-4 font-display text-xl text-bone">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-bone">{label}</span>
      {children}
    </label>
  );
}
