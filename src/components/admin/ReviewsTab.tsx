"use client";

import { useState } from "react";
import { Check, Trash2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { StarRating } from "@/components/StarRating";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Review } from "@/types";

export function ReviewsTab({
  reviews,
  onChange,
}: {
  reviews: Review[];
  onChange: () => void | Promise<void>;
}) {
  const [sub, setSub] = useState<"pending" | "approved">("pending");

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);
  const list = sub === "pending" ? pending : approved;

  async function approve(review: Review) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { error } = await supabase
      .from("reviews")
      .update({ approved: true })
      .eq("id", review.id);
    if (error) {
      toast.error("Freigeben fehlgeschlagen.");
      return;
    }
    toast.success("Bewertung freigegeben.");
    await onChange();
  }

  async function remove(review: Review) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { error } = await supabase.from("reviews").delete().eq("id", review.id);
    if (error) {
      toast.error("Löschen fehlgeschlagen.");
      return;
    }
    toast.success("Bewertung gelöscht.");
    await onChange();
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-3xl text-bone">Bewertungen</h1>
      <p className="mb-6 text-sm text-ash">
        Neue Bewertungen erscheinen erst nach Ihrer Freigabe öffentlich.
      </p>

      <div className="mb-6 inline-flex rounded-[3px] border border-mist bg-iron p-1">
        <SubTab
          active={sub === "pending"}
          onClick={() => setSub("pending")}
          label="Ausstehend"
          count={pending.length}
        />
        <SubTab
          active={sub === "approved"}
          onClick={() => setSub("approved")}
          label="Freigegeben"
          count={approved.length}
        />
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
              className="rounded-[3px] border border-mist bg-iron p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
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

              <p className="mt-2 text-sm leading-relaxed text-bone/90">
                „{review.comment}“
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-widest2 text-gold">
                  {review.project?.title
                    ? `Projekt: ${review.project.title}`
                    : "Projekt entfernt"}
                  {" · "}
                  {review.email}
                </span>
                <div className="flex gap-2">
                  {!review.approved && (
                    <button
                      type="button"
                      onClick={() => approve(review)}
                      className="inline-flex items-center gap-1.5 rounded-[2px] bg-success px-3 py-1.5 text-xs font-bold text-void transition-opacity hover:opacity-90"
                    >
                      <Check size={14} /> Freigeben
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(review)}
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
