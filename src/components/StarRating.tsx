"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
}

export function StarRating({
  value,
  onChange,
  size = 22,
  readOnly = false,
  className,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? value;

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`Bewertung: ${value} von 5 Sternen`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= active;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            aria-label={`${star} Stern${star > 1 ? "e" : ""}`}
            aria-checked={value === star}
            role={readOnly ? undefined : "radio"}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(null)}
            className={cn(
              "transition-transform",
              !readOnly && "cursor-pointer hover:scale-110",
              readOnly && "cursor-default",
              !readOnly && "min-h-[44px] min-w-[44px] flex items-center justify-center",
            )}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                filled ? "fill-gold text-gold" : "fill-transparent text-mist",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
