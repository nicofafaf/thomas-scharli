"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE, STATS_LABELS } from "@/lib/constants";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import { parseStat } from "@/lib/utils";
import type { SiteSettings } from "@/types";

const HERO_POSTER = "/media/hero/hero-poster.jpg";
const HERO_VIDEO_MP4 = "/media/hero/hero-video.mp4";
const HERO_VIDEO_WEBM = "/media/hero/hero-video.webm";

/**
 * Auf true setzen, sobald /public/media/hero/hero-video.mp4 (+ .webm)
 * hinterlegt ist – dann spielt das Hero ein Hintergrundvideo statt des
 * Standbilds.
 */
const HAS_HERO_VIDEO = false;

export function HeroSection({ settings }: { settings: SiteSettings }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const title = settings.hero_title || "Wir bringen, was zählt.";
  const subtitle =
    settings.hero_subtitle ||
    "Transport, Umzug und Montage – schnell, sicher, stressfrei.";
  const image = settings.hero_image || HERO_POSTER;

  // Titel in Zeilen aufteilen fuer gestaffelte Animation
  const titleLines = title.split(",").map((s, i, arr) =>
    i < arr.length - 1 ? `${s.trim()},` : s.trim(),
  );

  const miniStats = (
    ["stats_projects", "stats_years", "stats_satisfaction"] as const
  ).map((key) => ({
    value: `${parseStat(settings[key])}${STATS_LABELS[key].suffix}`,
    label: STATS_LABELS[key].label,
  }));

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Hintergrund: Video (wenn vorhanden) sonst Standbild, mit Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        {HAS_HERO_VIDEO ? (
          <motion.video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={HERO_POSTER}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 14, ease: "easeOut" }}
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </motion.video>
        ) : (
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt="Thomas Scharli – Transport & Umzug"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        )}
      </motion.div>

      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 -z-10">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,11,0.97) 0%, rgba(10,10,11,0.5) 40%, rgba(10,10,11,0.15) 70%, rgba(10,10,11,0.4) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-tight pb-24 pt-32"
      >
        <motion.p variants={fadeUpVariant} className="eyebrow mb-6 text-shadow-deep">
          Seit {SITE.foundedYear} · {SITE.tagline}
        </motion.p>

        <h1 className="max-w-4xl font-display text-hero font-medium leading-[1.02] text-bone text-shadow-deep">
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span variants={fadeUpVariant} className="block">
                {i === titleLines.length - 1 ? (
                  <em className="italic text-gold-light">{line}</em>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeUpVariant}
          className="mt-6 max-w-xl text-lg font-light leading-relaxed text-bone/80 text-shadow-deep"
        >
          {subtitle}
        </motion.p>

        {/* Meta-Row: CTA + Trennlinie + Mini-Stats */}
        <motion.div
          variants={fadeUpVariant}
          className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
        >
          <Link href="/#kontakt" className="btn-gold">
            Jetzt Kontakt aufnehmen
            <ArrowRight size={18} />
          </Link>

          <div className="hidden h-12 w-px bg-mist sm:block" />

          <div className="flex items-center gap-8">
            {miniStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-bone">
                  {stat.value}
                </span>
                <span className="text-[0.6rem] uppercase tracking-widest2 text-ash">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll-Indikator (unten rechts) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-3 md:flex"
      >
        <span
          className="text-[0.6rem] uppercase tracking-widest2 text-ash"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px origin-top bg-gold"
        />
      </motion.div>
    </section>
  );
}
