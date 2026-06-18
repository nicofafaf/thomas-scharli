"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/CountUp";
import { STATS_LABELS } from "@/lib/constants";
import { parseStat } from "@/lib/utils";
import { staggerContainerFast, fadeUpVariant, viewportOnce } from "@/lib/animations";
import type { SiteSettings } from "@/types";

export function StatsSection({ settings }: { settings: SiteSettings }) {
  const keys = Object.keys(STATS_LABELS) as (keyof typeof STATS_LABELS)[];

  return (
    <section className="border-y border-mist bg-steel">
      <motion.div
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-tight grid grid-cols-2 gap-y-10 py-16 md:grid-cols-4"
      >
        {keys.map((key) => {
          const meta = STATS_LABELS[key];
          const value = parseStat(settings[key]);
          return (
            <motion.div
              key={key}
              variants={fadeUpVariant}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display text-5xl font-semibold text-bone md:text-6xl">
                <CountUp to={value} suffix={meta.suffix} />
              </span>
              <span className="mt-2 text-xs uppercase tracking-widest2 text-ash">
                {meta.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Goldene Trennlinie */}
      <div className="container-tight">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      </div>
    </section>
  );
}
