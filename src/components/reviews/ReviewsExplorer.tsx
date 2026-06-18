"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { PublicReviewCard } from "./PublicReviewCard";
import { ReviewModal } from "@/components/ReviewModal";
import { SERVICE_TYPES } from "@/lib/validation";
import { staggerContainerFast } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Project, Review } from "@/types";

type Sort = "newest" | "helpful" | "highest";

export function ReviewsExplorer({
  reviews,
  projects,
}: {
  reviews: Review[];
  projects: Project[];
}) {
  const [star, setStar] = useState(0); // 0 = alle
  const [service, setService] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const highlightId = useMemo(() => {
    let best: Review | null = null;
    for (const r of reviews) {
      if ((r.helpful_count ?? 0) > (best?.helpful_count ?? 0)) best = r;
    }
    return best && (best.helpful_count ?? 0) > 0 ? best.id : null;
  }, [reviews]);

  const filtered = useMemo(() => {
    let list = [...reviews];
    if (star) list = list.filter((r) => r.rating === star);
    if (service !== "all") list = list.filter((r) => r.service_type === service);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.author_name.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      if (sort === "helpful")
        return (b.helpful_count ?? 0) - (a.helpful_count ?? 0);
      if (sort === "highest") return b.rating - a.rating;
      return +new Date(b.created_at) - +new Date(a.created_at);
    });
    return list;
  }, [reviews, star, service, sort, search]);

  return (
    <>
      {/* Filter-Leiste */}
      <section className="sticky top-16 z-30 border-b border-mist bg-void/90 py-4 backdrop-blur md:top-20">
        <div className="container-tight flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <FilterButton active={star === 0} onClick={() => setStar(0)}>
              Alle
            </FilterButton>
            {[5, 4, 3, 2, 1].map((s) => (
              <FilterButton
                key={s}
                active={star === s}
                onClick={() => setStar(s)}
              >
                {"★".repeat(s)}
              </FilterButton>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <FilterButton
              active={service === "all"}
              onClick={() => setService("all")}
            >
              Alle Leistungen
            </FilterButton>
            {SERVICE_TYPES.map((s) => (
              <FilterButton
                key={s}
                active={service === s}
                onClick={() => setService(s)}
              >
                {s}
              </FilterButton>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ash"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="In Bewertungen suchen…"
                className="field !py-2 !pl-9 text-sm"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="field !w-auto !py-2 text-sm"
            >
              <option value="newest">Neueste zuerst</option>
              <option value="helpful">Hilfreichste</option>
              <option value="highest">Höchste Bewertung</option>
            </select>
            <span className="ml-auto text-sm text-ash">
              {filtered.length} von {reviews.length} Bewertungen
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-void py-14">
        <div className="container-tight">
          {filtered.length === 0 ? (
            <p className="rounded-[3px] border border-dashed border-mist p-12 text-center text-ash">
              Keine Bewertungen für diese Filter gefunden.
            </p>
          ) : (
            <motion.div
              key={`${star}-${service}-${sort}-${search}`}
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
              className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
            >
              {filtered.map((review) => (
                <PublicReviewCard
                  key={review.id}
                  review={review}
                  highlighted={review.id === highlightId}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-steel py-20">
        <div className="container-tight flex flex-col items-center text-center">
          <h2 className="font-display text-4xl font-semibold text-bone md:text-5xl">
            Warst du zufrieden?
          </h2>
          <p className="mt-4 max-w-md text-ash">
            Teile deine Erfahrung mit anderen. Das dauert nur 2 Minuten.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center gap-3 bg-gold px-8 py-4 text-sm font-medium uppercase tracking-widest2 text-void transition-colors hover:bg-gold-light"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)",
            }}
          >
            Jetzt bewerten →
          </button>
        </div>
      </section>

      <ReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projects={projects}
      />
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[2px] border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-gold bg-gold text-void"
          : "border-mist text-ash hover:border-gold/50 hover:text-bone",
      )}
    >
      {children}
    </button>
  );
}
