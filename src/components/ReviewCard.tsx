"use client";

import { Quote } from "lucide-react";
import { StarRating } from "./StarRating";
import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col gap-4 rounded-[3px] border border-mist bg-iron p-6 shadow-card sm:w-[360px]">
      <div className="flex items-center justify-between">
        <StarRating value={review.rating} readOnly size={18} />
        <Quote size={22} className="text-mist" />
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
