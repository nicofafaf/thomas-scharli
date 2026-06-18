"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { getSupabaseBrowserClient, STORAGE_BUCKET } from "@/lib/supabase";
import type { Project } from "@/types";

interface ProjectFormModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export function ProjectFormModal({
  project,
  open,
  onClose,
  onSaved,
}: ProjectFormModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState<string>("");
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(project?.title ?? "");
    setCategory(project?.category ?? "");
    setDescription(project?.description ?? "");
    setLocation(project?.location ?? "");
    setYear(project?.year ? String(project.year) : "");
    setFeatured(project?.featured ?? false);
    setImageUrl(project?.image_url ?? null);
  }, [open, project]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
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
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) {
      toast.error("Upload fehlgeschlagen.");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Bild hochgeladen.");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 2 || category.trim().length < 2) {
      toast.error("Titel und Kategorie sind erforderlich.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSaving(true);
    const payload = {
      title: title.trim(),
      category: category.trim(),
      description: description.trim() || null,
      location: location.trim() || null,
      year: year ? parseInt(year, 10) : null,
      featured,
      image_url: imageUrl,
    };

    const { error } = project
      ? await supabase.from("projects").update(payload).eq("id", project.id)
      : await supabase.from("projects").insert(payload);

    setSaving(false);
    if (error) {
      toast.error("Speichern fehlgeschlagen.");
      return;
    }
    toast.success(project ? "Projekt aktualisiert." : "Projekt erstellt.");
    await onSaved();
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[4px] border border-mist bg-steel shadow-card no-scrollbar">
        <div className="flex items-center justify-between border-b border-mist px-6 py-4">
          <h2 className="font-display text-2xl text-bone">
            {project ? "Projekt bearbeiten" : "Neues Projekt"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ash hover:bg-iron hover:text-bone"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 px-6 py-5">
          {/* Bild-Upload */}
          <div>
            <span className="mb-1.5 block text-sm font-medium text-bone">
              Projektbild
            </span>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[3px] border border-mist bg-iron">
                {imageUrl ? (
                  <Image src={imageUrl} alt="Vorschau" fill sizes="112px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-ash">
                    Kein Bild
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUpload}
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
          </div>

          <Input label="Titel *" value={title} onChange={setTitle} placeholder="Bürokomplex Mitte" />
          <Input label="Kategorie *" value={category} onChange={setCategory} placeholder="Gebäudereinigung" />

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-bone">Beschreibung</span>
            <textarea
              className="field min-h-[90px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Ort" value={location} onChange={setLocation} placeholder="Stuttgart" />
            <Input
              label="Jahr"
              value={year}
              onChange={setYear}
              placeholder="2024"
              type="number"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            <span className="text-sm text-bone">Als Referenz hervorheben</span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="btn-gold w-full disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Speichert…
              </>
            ) : (
              "Speichern"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-bone">{label}</span>
      <input
        type={type}
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
