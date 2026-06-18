"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, BadgeCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { StarRating } from "@/components/StarRating";
import { fadeUpVariant } from "@/lib/animations";
import { formatDate, cn } from "@/lib/utils";
import type { Review } from "@/types";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function makeFingerprint(): string {
  if (typeof window === "undefined") return "server";
  try {
    return btoa(
      navigator.userAgent + screen.width + screen.colorDepth,
    ).slice(0, 32);
  } catch {
    return "anon";
  }
}

function votedKey(id: string) {
  return `review_voted_${id}`;
}

export function PublicReviewCard({
  review,
  highlighted = false,
}: {
  review: Review;
  highlighted?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(review.helpful_count ?? 0);
  const [voted, setVoted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(votedKey(review.id)) === "1";
  });
  const [voting, setVoting] = useState(false);

  const longComment = review.comment.length > 220;

  async function vote() {
    if (voted || voting) return;
    setVoting(true);
    // optimistic
    setCount((c) => c + 1);
    setVoted(true);
    try {
      const res = await fetch("/api/review-votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review_id: review.id,
          voter_fp: makeFingerprint(),
        }),
      });
      if (res.ok || res.status === 409) {
        window.localStorage.setItem(votedKey(review.id), "1");
      } else {
        // rollback
        setCount((c) => Math.max(0, c - 1));
        setVoted(false);
        toast.error("Konnte nicht gespeichert werden.");
      }
    } catch {
      setCount((c) => Math.max(0, c - 1));
      setVoted(false);
      toast.error("Verbindung fehlgeschlagen.");
    } finally {
      setVoting(false);
    }
  }

  return (
    <motion.figure
      variants={fadeUpVariant}
      className={cn(
        "flex break-inside-avoid flex-col gap-4 rounded-[3px] border bg-iron p-6 transition-colors hover:bg-[#232327]",
        highlighted ? "border-gold/40" : "border-mist",
      )}
    >
      {highlighted && (
        <span className="inline-flex w-fit items-center gap-1 rounded-[2px] bg-gold-dim px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-widest2 text-gold-light">
          <Sparkles size={11} /> Beliebteste Bewertung
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-dim font-display text-sm font-semibold text-gold-light">
            {initials(review.author_name)}
          </span>
          <div className="leading-tight">
            <p className="font-medium text-bone">{review.author_name}</p>
            {review.company && (
              <p className="text-xs text-ash">{review.company}</p>
            )}
          </div>
        </div>
        <span className="shrink-0 text-[0.7rem] text-ash">
          {formatDate(review.created_at)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StarRating value={review.rating} readOnly size={16} />
        {review.service_type && (
          <span className="rounded-[2px] bg-gold-dim px-2 py-0.5 text-[0.65rem] font-medium text-gold-light">
            {review.service_type}
          </span>
        )}
      </div>

      <blockquote>
        <p
          className={cn(
            "font-display text-base italic leading-relaxed text-bone",
            !expanded && longComment && "line-clamp-4",
          )}
        >
          „{review.comment}“
        </p>
        {longComment && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs font-medium text-gold transition-colors hover:text-gold-light"
          >
            {expanded ? "Weniger" : "Mehr lesen"}
          </button>
        )}
      </blockquote>

      {review.project?.title && (
        <p className="text-[0.7rem] text-ash">↳ Projekt: {review.project.title}</p>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-mist pt-4">
        {review.would_recommend ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-success">
            <BadgeCheck size={14} /> Würde weiterempfehlen
          </span>
        ) : (
          <span className="text-xs text-ash">&nbsp;</span>
        )}
        <button
          type="button"
          onClick={vote}
          disabled={voted}
          aria-label="Als hilfreich markieren"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-xs transition-colors",
            voted
              ? "border-gold/40 text-gold"
              : "border-mist text-ash hover:border-gold hover:text-gold",
          )}
        >
          <ThumbsUp size={13} /> Hilfreich
          {count > 0 && <span className="tabular-nums">({count})</span>}
        </button>
      </div>
    </motion.figure>
  );
}
