"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reorder, useDragControls } from "framer-motion";
import { Plus, Pencil, Trash2, GripVertical, Save, Star } from "lucide-react";
import toast from "react-hot-toast";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { projectImageSrc } from "@/lib/utils";
import { ProjectFormModal } from "./ProjectFormModal";
import type { Project } from "@/types";

export function ProjectsTab({
  projects,
  onChange,
}: {
  projects: Project[];
  onChange: () => void | Promise<void>;
}) {
  const [items, setItems] = useState<Project[]>(projects);
  const [dirty, setDirty] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);

  useEffect(() => {
    setItems(projects);
    setDirty(false);
  }, [projects]);

  async function saveOrder() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const updates = items.map((p, i) =>
      supabase.from("projects").update({ order_index: i }).eq("id", p.id),
    );
    const results = await Promise.all(updates);
    if (results.some((r) => r.error)) {
      toast.error("Reihenfolge konnte nicht gespeichert werden.");
      return;
    }
    toast.success("Reihenfolge gespeichert.");
    setDirty(false);
    await onChange();
  }

  async function confirmDelete() {
    if (!deleting) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { error } = await supabase.from("projects").delete().eq("id", deleting.id);
    if (error) {
      toast.error("Löschen fehlgeschlagen.");
      return;
    }
    toast.success("Projekt gelöscht.");
    setDeleting(null);
    await onChange();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-bone">Projekte</h1>
          <p className="text-sm text-ash">
            {items.length} Projekt{items.length === 1 ? "" : "e"} · per Drag &
            Drop sortieren
          </p>
        </div>
        <div className="flex gap-2">
          {dirty && (
            <button type="button" onClick={saveOrder} className="btn-ghost text-sm">
              <Save size={16} /> Reihenfolge
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="btn-gold text-sm"
          >
            <Plus size={16} /> Neues Projekt
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-[3px] border border-dashed border-mist p-10 text-center text-ash">
          Noch keine Projekte. Legen Sie Ihr erstes Projekt an.
        </p>
      ) : (
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={(next) => {
            setItems(next);
            setDirty(true);
          }}
          className="space-y-2"
        >
          {items.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onEdit={() => {
                setEditing(project);
                setModalOpen(true);
              }}
              onDelete={() => setDeleting(project)}
            />
          ))}
        </Reorder.Group>
      )}

      <ProjectFormModal
        project={editing}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={onChange}
      />

      {/* Lösch-Bestätigung */}
      {deleting && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setDeleting(null)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-[4px] border border-mist bg-steel p-6 text-center shadow-card">
            <Trash2 size={28} className="mx-auto text-error" />
            <h3 className="mt-3 font-display text-xl text-bone">
              Projekt löschen?
            </h3>
            <p className="mt-1 text-sm text-ash">
              „{deleting.title}“ wird dauerhaft entfernt. Alle zugehörigen
              Bewertungen werden ebenfalls gelöscht.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleting(null)}
                className="btn-ghost flex-1 text-sm"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 rounded-[2px] bg-error px-4 py-2 text-sm font-bold text-void transition-opacity hover:opacity-90"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectRow({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-3 rounded-[3px] border border-mist bg-iron p-3"
    >
      <button
        type="button"
        aria-label="Verschieben"
        onPointerDown={(e) => controls.start(e)}
        className="cursor-grab touch-none text-ash hover:text-bone active:cursor-grabbing"
      >
        <GripVertical size={18} />
      </button>

      <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-mist bg-steel">
        {projectImageSrc(project) ? (
          <Image
            src={projectImageSrc(project) as string}
            alt={project.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <span className="font-display text-xs text-gold/50">TS</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 truncate font-medium text-bone">
          {project.title}
          {project.featured && (
            <Star size={13} className="fill-gold text-gold" />
          )}
        </p>
        <p className="truncate text-xs text-ash">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
      </div>

      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Bearbeiten"
          className="flex h-9 w-9 items-center justify-center rounded-[2px] text-ash transition-colors hover:bg-steel hover:text-gold"
        >
          <Pencil size={16} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Löschen"
          className="flex h-9 w-9 items-center justify-center rounded-[2px] text-ash transition-colors hover:bg-steel hover:text-error"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </Reorder.Item>
  );
}
