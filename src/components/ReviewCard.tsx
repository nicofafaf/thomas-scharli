"use client";

import { Quote } from "lucide-react";
import { StarRating } from "./StarRating";
import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col gap-4 rounded-[3px] border border-mist bg-iron p-6 shadow-card sm:w-[360px]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <StarRating value={review.rating} readOnly size={18} />
          {review.service_type && (
            <span className="rounded-[2px] bg-gold-dim px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-widest2 text-gold-light">
              {review.service_type}
            </span>
          )}
        </div>
        <Quote size={22} className="shrink-0 text-mist" />
      </div>

      <blockquote className="flex-1">
        <p className="font-display text-lg italic leading-relaxed text-bone">
          „{review.comment}“
        </p>
      </blockquote>

      <figcaption className="border-t border-mist pt-4">
        <p className="font-medium text-bone">— {review.author_name}</p>
        {review.company && (
          <p className="text-sm text-ash">{review.company}</p>
        )}
        {review.project?.title && (
          <p className="mt-1 text-xs uppercase tracking-widest2 text-gold">
            Projekt: {review.project.title}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
