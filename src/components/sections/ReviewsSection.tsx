"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from "lucide-react";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpVariant, staggerContainerFast, viewportOnce } from "@/lib/animations";
import { computeReviewStats } from "@/lib/reviews";
import type { Review } from "@/types";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stats = computeReviewStats(reviews);

  function scroll(dir: "left" | "right") {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  if (reviews.length === 0) return null;

  return (
    <section id="bewertungen" className="bg-steel py-24">
      <div className="container-tight">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <SectionHeading
              eyebrow="Stimmen unserer Kunden"
              title="Was unsere Kunden sagen."
            />
            <span className="mt-4 inline-flex items-center gap-2 rounded-[2px] border border-gold/30 bg-gold-dim px-3 py-1.5 text-sm text-gold-light">
              <Star size={14} className="fill-gold-light text-gold-light" />
              {stats.averageRating.toFixed(1)} · {stats.totalCount}{" "}
              {stats.totalCount === 1 ? "Bewertung" : "Bewertungen"}
            </span>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Zurück"
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mist text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Weiter"
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mist text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="no-scrollbar mask-x-fade flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:px-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]"
      >
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            variants={fadeUpVariant}
            className="snap-start"
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </motion.div>

      <div className="container-tight mt-10 text-center">
        <Link
          href="/bewertungen"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light"
        >
          Alle {stats.totalCount} Bewertungen lesen
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
