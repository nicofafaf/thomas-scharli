"use client";

import { useState } from "react";
import { Check, Trash2, Clock, ThumbsUp, Star } from "lucide-react";
import toast from "react-hot-toast";
import { StarRating } from "@/components/StarRating";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { formatDate, cn } from "@/lib/utils";
import type { Review } from "@/types";

export function ReviewsTab({
  reviews,
  onChange,
}: {
  reviews: Review[];
  onChange: () => void | Promise<void>;
}) {
  const [sub, setSub] = useState<"pending" | "approved">("pending");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);
  const list = sub === "pending" ? pending : approved;

  const avg =
    approved.length > 0
      ? Math.round(
          (approved.reduce((a, r) => a + r.rating, 0) / approved.length) * 10,
        ) / 10
      : 0;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === list.length ? new Set() : new Set(list.map((r) => r.id)),
    );
  }

  async function approve(ids: string[]) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || ids.length === 0) return;
    const { error } = await supabase
      .from("reviews")
      .update({ approved: true })
      .in("id", ids);
    if (error) {
      toast.error("Freigeben fehlgeschlagen.");
      return;
    }
    toast.success(
      ids.length === 1 ? "Bewertung freigegeben." : `${ids.length} freigegeben.`,
    );
    setSelected(new Set());
    await onChange();
  }

  async function remove(ids: string[]) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || ids.length === 0) return;
    const { error } = await supabase.from("reviews").delete().in("id", ids);
    if (error) {
      toast.error("Löschen fehlgeschlagen.");
      return;
    }
    toast.success(
      ids.length === 1 ? "Bewertung gelöscht." : `${ids.length} gelöscht.`,
    );
    setSelected(new Set());
    await onChange();
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-3xl text-bone">Bewertungen</h1>
      <p className="mb-4 text-sm text-ash">
        Neue Bewertungen erscheinen erst nach Ihrer Freigabe öffentlich.
      </p>

      {/* Statistik */}
      <div className="mb-6 flex flex-wrap gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-mist bg-iron px-3 py-1.5 text-bone">
          <Check size={14} className="text-success" /> {approved.length}{" "}
          freigegeben
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-mist bg-iron px-3 py-1.5 text-bone">
          <Clock size={14} className="text-gold" /> {pending.length} ausstehend
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-mist bg-iron px-3 py-1.5 text-bone">
          <Star size={14} className="fill-gold text-gold" /> {avg.toFixed(1)}{" "}
          Schnitt
        </span>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-[3px] border border-mist bg-iron p-1">
          <SubTab
            active={sub === "pending"}
            onClick={() => {
              setSub("pending");
              setSelected(new Set());
            }}
            label="Ausstehend"
            count={pending.length}
          />
          <SubTab
            active={sub === "approved"}
            onClick={() => {
              setSub("approved");
              setSelected(new Set());
            }}
            label="Freigegeben"
            count={approved.length}
          />
        </div>

        {list.length > 0 && (
          <button
            type="button"
            onClick={toggleAll}
            className="text-xs text-ash underline-offset-2 transition-colors hover:text-bone hover:underline"
          >
            {selected.size === list.length ? "Auswahl aufheben" : "Alle auswählen"}
          </button>
        )}

        {selected.size > 0 && (
          <div className="ml-auto flex gap-2">
            {sub === "pending" && (
              <button
                type="button"
                onClick={() => approve([...selected])}
                className="inline-flex items-center gap-1.5 rounded-[2px] bg-success px-3 py-1.5 text-xs font-bold text-void transition-opacity hover:opacity-90"
              >
                <Check size={14} /> {selected.size} freigeben
              </button>
            )}
            <button
              type="button"
              onClick={() => remove([...selected])}
              className="inline-flex items-center gap-1.5 rounded-[2px] border border-mist px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:border-error hover:text-error"
            >
              <Trash2 size={14} /> {selected.size} löschen
            </button>
          </div>
        )}
      </div>

      {list.length === 0 ? (
        <p className="rounded-[3px] border border-dashed border-mist p-10 text-center text-ash">
          {sub === "pending"
            ? "Keine ausstehenden Bewertungen."
            : "Noch keine freigegebenen Bewertungen."}
        </p>
      ) : (
        <div className="space-y-3">
          {list.map((review) => (
            <article
              key={review.id}
              className={cn(
                "rounded-[3px] border bg-iron p-4 transition-colors",
                selected.has(review.id) ? "border-gold" : "border-mist",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selected.has(review.id)}
                    onChange={() => toggle(review.id)}
                    className="h-4 w-4 accent-gold"
                    aria-label="Auswählen"
                  />
                  <StarRating value={review.rating} readOnly size={16} />
                  <span className="text-sm font-medium text-bone">
                    {review.author_name}
                  </span>
                  {review.company && (
                    <span className="text-sm text-ash">· {review.company}</span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-ash">
                  <Clock size={12} />
                  {formatDate(review.created_at)}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {review.service_type && (
                  <span className="rounded-[2px] bg-gold-dim px-2 py-0.5 text-[0.65rem] font-medium text-gold-light">
                    {review.service_type}
                  </span>
                )}
                {review.would_recommend ? (
                  <span className="inline-flex items-center gap-1 text-[0.7rem] text-success">
                    <ThumbsUp size={12} /> Empfiehlt weiter
                  </span>
                ) : (
                  <span className="text-[0.7rem] text-error">
                    Empfiehlt nicht weiter
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-bone/90">
                „{review.comment}“
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-widest2 text-gold">
                  {review.project?.title
                    ? `Projekt: ${review.project.title}`
                    : "Direktbewertung"}
                  {" · "}
                  {review.email}
                </span>
                <div className="flex gap-2">
                  {!review.approved && (
                    <button
                      type="button"
                      onClick={() => approve([review.id])}
                      className="inline-flex items-center gap-1.5 rounded-[2px] bg-success px-3 py-1.5 text-xs font-bold text-void transition-opacity hover:opacity-90"
                    >
                      <Check size={14} /> Freigeben
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove([review.id])}
                    className="inline-flex items-center gap-1.5 rounded-[2px] border border-mist px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:border-error hover:text-error"
                  >
                    <Trash2 size={14} /> Löschen
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function SubTab({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[2px] px-4 py-2 text-sm font-medium transition-colors",
        active ? "bg-steel text-gold" : "text-ash hover:text-bone",
      )}
    >
      {label}
      <span className="ml-1.5 text-xs opacity-70">({count})</span>
    </button>
  );
}
