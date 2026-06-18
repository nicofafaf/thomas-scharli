"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { fadeUpVariant, goldScanVariant } from "@/lib/animations";
import { cn, projectImageSrc } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onReview?: (project: Project) => void;
  /** Öffnet die Lightbox (Klick aufs Bild) */
  onImageClick?: () => void;
  className?: string;
  /** Höheres Seitenverhältnis für Hero-/Wide-Karten im Masonry-Grid */
  aspect?: "tall" | "wide" | "square";
  priority?: boolean;
}

const aspectMap = {
  tall: "aspect-[4/5]",
  wide: "aspect-[16/9]",
  square: "aspect-[4/3]",
};

export function ProjectCard({
  project,
  onReview,
  onImageClick,
  className,
  aspect = "square",
  priority = false,
}: ProjectCardProps) {
  const imageSrc = projectImageSrc(project);
  return (
    <motion.article
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover="hover"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[3px] border border-mist bg-iron shadow-card",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-iron",
          aspectMap[aspect],
          onImageClick && imageSrc && "cursor-zoom-in",
        )}
        onClick={onImageClick}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectPosition: "center 20%" }}
            className="object-cover brightness-[0.75] saturate-[0.9] transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-[0.88] group-hover:saturate-[1.1]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-gold/30 bg-iron">
            <span className="font-display text-4xl text-gold/40">TS</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent transition-opacity duration-700 group-hover:opacity-90" />

        {/* Goldener Scan beim Hover (links -> rechts) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            variants={goldScanVariant}
            className="absolute inset-y-0 w-[60px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(200,146,42,0.35), transparent)",
            }}
          />
        </div>

        {project.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-[2px] bg-gold-dim px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-widest2 text-gold-light backdrop-blur-sm">
            <Star size={11} className="fill-gold-light text-gold-light" />
            Referenz
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col gap-1 p-5">
        <span className="eyebrow">{project.category}</span>
        <h3 className="font-display text-2xl font-semibold leading-tight text-bone">
          {project.title}
        </h3>

        <div className="mt-1 flex items-center gap-3 text-sm text-ash">
          {project.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} className="text-gold" />
              {project.location}
            </span>
          )}
          {project.year && <span>· {project.year}</span>}
        </div>

        {project.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ash">
            {project.description}
          </p>
        )}

        {onReview && (
          <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-16 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onReview(project)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              Dieses Projekt bewerten
              <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
