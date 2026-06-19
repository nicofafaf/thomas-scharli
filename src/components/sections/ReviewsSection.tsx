"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from "lucide-react";
import { ReviewCard } from "@/components/ReviewCard";
import { MyHammerBadge } from "@/components/MyHammerBadge";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUpVariant, staggerContainerFast, viewportOnce } from "@/lib/animations";
import { MYHAMMER } from "@/lib/constants";
import type { Review } from "@/types";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  if (reviews.length === 0) {
    return (
      <section
        id="bewertungen"
        className="border-t border-mist bg-steel py-24"
      >
        <div className="container-tight text-center">
          <p className="eyebrow justify-center">Kundenstimmen</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-bone">
            Was unsere Kunden sagen.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ash">
            Unsere Bewertungen findest du auch auf MyHammer:
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <MyHammerBadge variant="full" />
          </div>
          <Link
            href="/bewertungen"
            className="btn-gold mt-8 inline-flex items-center gap-2"
          >
            Jetzt bewerten
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="bewertungen" className="bg-steel py-24">
      <div className="container-tight">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <SectionHeading
              eyebrow="Stimmen unserer Kunden"
              title="Was unsere Kunden sagen."
            />
            <a
              href={MYHAMMER.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-4 inline-flex items-center gap-2 rounded-[2px] border border-gold/30 bg-gold-dim px-3 py-1.5 text-sm text-gold-light transition-colors hover:border-gold/60"
            >
              <Star size={14} className="fill-gold-light text-gold-light" />
              {MYHAMMER.rating} · {MYHAMMER.reviewCount} Bewertungen auf MyHammer
            </a>
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

      <div className="container-tight mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-8">
        <Link
          href="/bewertungen"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light"
        >
          Alle Bewertungen lesen
          <ArrowUpRight size={16} />
        </Link>
        <a
          href={MYHAMMER.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ash transition-colors hover:text-bone"
        >
          Weitere 260+ Bewertungen auf MyHammer
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
