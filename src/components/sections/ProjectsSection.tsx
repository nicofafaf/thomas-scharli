"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ProjectCard } from "@/components/ProjectCard";
import { ReviewModal } from "@/components/ReviewModal";
import { SectionHeading } from "@/components/SectionHeading";
import { projectImageSrc } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
  /** Begrenzt die Anzahl (z.B. 5 auf der Landing Page) */
  limit?: number;
  showHeading?: boolean;
  showAllLink?: boolean;
}

export function ProjectsSection({
  projects,
  limit,
  showHeading = true,
  showAllLink = true,
}: ProjectsSectionProps) {
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const visible = limit ? projects.slice(0, limit) : projects;

  // Nur Projekte mit Bild kommen in die Lightbox – Index bleibt konsistent
  const slideProjects = visible.filter((p) => projectImageSrc(p));
  const slides = slideProjects.map((p) => ({
    src: projectImageSrc(p) as string,
    alt: p.title,
    title: p.title,
    description: p.category + (p.location ? ` · ${p.location}` : ""),
  }));

  function handleReview(project: Project) {
    setActive(project);
    setOpen(true);
  }

  function handleImageClick(project: Project) {
    const idx = slideProjects.indexOf(project);
    if (idx < 0) return;
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }

  return (
    <section id="projekte" className="bg-void py-24">
      <div className="container-tight">
        {showHeading && (
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Referenzen"
              title="Jedes Projekt erzählt eine Geschichte."
              description="Echte Aufträge, sicher ans Ziel gebracht. Jedes Transportgut mit der gleichen Sorgfalt behandelt."
            />
            {showAllLink && (
              <Link
                href="/projekte"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light"
              >
                Alle Referenzen ansehen
                <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        )}

        {visible.length === 0 ? (
          <p className="text-ash">Aktuell sind keine Projekte verfügbar.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visible.map((project, i) => {
              // Masonry-Anmutung: erste Karte gross/hoch, jede 4. Karte breit
              const isWide = i % 4 === 3;
              return (
                <div
                  key={project.id}
                  className={isWide ? "md:col-span-2" : undefined}
                >
                  <ProjectCard
                    project={project}
                    onReview={handleReview}
                    onImageClick={() => handleImageClick(project)}
                    priority={i === 0}
                    aspect={isWide ? "wide" : i === 0 ? "tall" : "square"}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ReviewModal
        project={active}
        open={open}
        onClose={() => setOpen(false)}
      />

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        styles={{
          container: { backgroundColor: "rgba(10,10,11,0.97)" },
          button: { filter: "none", color: "#C8922A" },
        }}
        carousel={{ finite: false, preload: 2 }}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </section>
  );
}
