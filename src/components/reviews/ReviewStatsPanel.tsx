"use client";

import { Star, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/CountUp";
import { fadeUpVariant, staggerContainer, viewportOnce } from "@/lib/animations";
import type { ReviewStats } from "@/types";

export function ReviewStatsPanel({ stats }: { stats: ReviewStats }) {
  if (stats.totalCount === 0) {
    return (
      <section className="border-y border-mist bg-steel py-16">
        <div className="container-tight text-center text-ash">
          Noch keine Bewertungen – sei der/die Erste.
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-mist bg-steel py-14">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-tight grid gap-10 md:grid-cols-4 md:gap-0 md:divide-x md:divide-mist"
      >
        {/* Block 1 – Durchschnitt */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col items-center text-center md:px-6"
        >
          <span className="font-display text-[4.5rem] font-semibold leading-none text-gold">
            {stats.averageRating.toFixed(1)}
          </span>
          <AvgStars value={stats.averageRating} />
          <span className="mt-2 text-sm text-ash">
            von 5.0 · {stats.totalCount}{" "}
            {stats.totalCount === 1 ? "Bewertung" : "Bewertungen"}
          </span>
        </motion.div>

        {/* Block 2 – Verteilung */}
        <motion.div variants={fadeUpVariant} className="flex flex-col justify-center gap-1.5 md:px-6">
          {stats.distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-2 text-xs text-ash">
              <span className="w-3 text-right">{d.stars}</span>
              <Star size={11} className="fill-gold text-gold" />
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-iron">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${d.percent}%` }}
                />
              </div>
              <span className="w-5 text-right tabular-nums">{d.count}</span>
            </div>
          ))}
        </motion.div>

        {/* Block 3 – Weiterempfehlung */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col items-center justify-center text-center md:px-6"
        >
          <span className="font-display text-[3.5rem] font-semibold leading-none text-bone">
            <CountUp to={stats.recommendPercent} suffix="%" />
          </span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-ash">
            <ThumbsUp size={14} className="text-success" />
            würden uns weiterempfehlen
          </span>
        </motion.div>

        {/* Block 4 – Leistungen */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col justify-center gap-2 md:px-6"
        >
          <span className="eyebrow mb-1">Bewertet nach Leistung</span>
          {stats.byServiceType.length === 0 ? (
            <span className="text-sm text-ash">—</span>
          ) : (
            stats.byServiceType.map((s) => (
              <div
                key={s.service}
                className="flex items-center justify-between rounded-[2px] border border-mist bg-iron px-3 py-1.5 text-xs"
              >
                <span className="text-bone/90">{s.service}</span>
                <span className="font-medium text-gold">{s.count}×</span>
              </div>
            ))
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

function AvgStars({ value }: { value: number }) {
  const percent = (value / 5) * 100;
  return (
    <div className="relative mt-3 inline-flex">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={18} className="fill-transparent text-mist" />
        ))}
      </div>
      <div
        className="absolute inset-0 flex gap-1 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={18} className="shrink-0 fill-gold text-gold" />
        ))}
      </div>
    </div>
  );
}
