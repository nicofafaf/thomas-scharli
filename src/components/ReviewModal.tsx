"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";
import { StarRating } from "./StarRating";
import { reviewSchema } from "@/lib/validation";
import { projectImageSrc, cn } from "@/lib/utils";
import type { Project, ServiceType } from "@/types";

interface ReviewModalProps {
  /** Vorab gebundenes Projekt (Bewertung von einer Projektkarte aus) */
  project?: Project | null;
  /** Für die Direktbewertung: optionale Projektauswahl */
  projects?: Project[];
  open: boolean;
  onClose: () => void;
}

type FieldErrors = Partial<
  Record<"author_name" | "email" | "rating" | "comment" | "service_type", string>
>;

const SERVICE_TILES: { key: ServiceType; icon: string; label: string }[] = [
  { key: "Zweiradtransport", icon: "🛵", label: "Zweirad­transport" },
  { key: "Umzug", icon: "📦", label: "Umzug" },
  { key: "Netzmontage", icon: "🔧", label: "Netz­montage" },
  { key: "Fahrzeugtransport", icon: "🚗", label: "Fahrzeug­transport" },
  { key: "Sonstiges", icon: "➕", label: "Sonstiges" },
];

export function ReviewModal({
  project,
  projects = [],
  open,
  onClose,
}: ReviewModalProps) {
  const [authorName, setAuthorName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setAuthorName("");
      setCompany("");
      setEmail("");
      setRating(0);
      setComment("");
      setServiceType(project ? guessServiceType(project.category) : "");
      setWouldRecommend(true);
      setSelectedProjectId("");
      setErrors({});
      setSuccess(false);
    }
  }, [open, project?.id, project]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = reviewSchema.safeParse({
      author_name: authorName,
      company,
      email,
      rating,
      comment,
      service_type: serviceType,
      would_recommend: wouldRecommend,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.errors) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const projectId = project?.id ?? (selectedProjectId || null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, project_id: projectId }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error ?? "Etwas ist schiefgelaufen.");
        return;
      }

      setSuccess(true);
      toast.success("Vielen Dank! Ihre Bewertung wird geprüft.");
      setTimeout(onClose, 1800);
    } catch {
      toast.error("Verbindung fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={
            project ? `Projekt bewerten: ${project.title}` : "Bewertung abgeben"
          }
        >
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[4px] border border-mist bg-steel shadow-card no-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-mist px-6 py-4">
              <h2 className="font-display text-2xl font-semibold text-bone">
                {project ? "Projekt bewerten" : "Bewertung abgeben"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Schließen"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ash transition-colors hover:bg-iron hover:text-bone"
              >
                <X size={20} />
              </button>
            </div>

            {project && (
              <div className="flex items-center gap-4 border-b border-mist px-6 py-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-mist bg-iron">
                  {projectImageSrc(project) ? (
                    <Image
                      src={projectImageSrc(project) as string}
                      alt={project.title}
                      fill
                      sizes="56px"
                      className="object-cover object-center"
                    />
                  ) : (
                    <span className="font-display text-lg text-gold/50">TS</span>
                  )}
                </div>
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <p className="font-display text-lg text-bone">
                    {project.title}
                  </p>
                </div>
              </div>
            )}

            {success ? (
              <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
                <CheckCircle2 size={56} className="text-success" />
                <p className="font-display text-2xl text-bone">Vielen Dank!</p>
                <p className="max-w-xs text-sm text-ash">
                  Ihre Bewertung wurde übermittelt und erscheint nach Prüfung
                  durch unser Team.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 px-6 py-5"
                noValidate
              >
                <Field label="Welche Leistung?" required error={errors.service_type}>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {SERVICE_TILES.map((tile) => {
                      const activeTile = serviceType === tile.key;
                      return (
                        <button
                          type="button"
                          key={tile.key}
                          onClick={() => setServiceType(tile.key)}
                          aria-pressed={activeTile}
                          className={cn(
                            "flex flex-col items-center gap-1 rounded-[3px] border px-1 py-3 text-center text-[0.65rem] leading-tight transition-colors",
                            activeTile
                              ? "border-gold bg-gold-dim text-gold-light"
                              : "border-mist bg-iron text-ash hover:border-gold/50",
                          )}
                        >
                          <span className="text-lg">{tile.icon}</span>
                          <span>{tile.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field label="Ihr Name" required error={errors.author_name}>
                  <input
                    type="text"
                    className="field"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Max Mustermann"
                    autoComplete="name"
                  />
                </Field>

                <Field label="Firma (optional)">
                  <input
                    type="text"
                    className="field"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Musterfirma GmbH"
                    autoComplete="organization"
                  />
                </Field>

                <Field label="E-Mail" required error={errors.email}>
                  <input
                    type="email"
                    className="field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="max@beispiel.de"
                    autoComplete="email"
                  />
                </Field>

                <Field label="Gesamtbewertung" required error={errors.rating}>
                  <StarRating value={rating} onChange={setRating} size={30} />
                </Field>

                <Field label="Ihr Kommentar" required error={errors.comment}>
                  <textarea
                    className="field min-h-[110px] resize-y"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Beschreiben Sie Ihre Erfahrung (min. 20 Zeichen)…"
                  />
                </Field>

                <Field label="Würden Sie uns weiterempfehlen?">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWouldRecommend(true)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-[3px] border px-3 py-2.5 text-sm font-medium transition-colors",
                        wouldRecommend
                          ? "border-success bg-success/15 text-success"
                          : "border-mist bg-iron text-ash hover:border-success/50",
                      )}
                    >
                      <ThumbsUp size={16} /> Ja
                    </button>
                    <button
                      type="button"
                      onClick={() => setWouldRecommend(false)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-[3px] border px-3 py-2.5 text-sm font-medium transition-colors",
                        !wouldRecommend
                          ? "border-error bg-error/15 text-error"
                          : "border-mist bg-iron text-ash hover:border-error/50",
                      )}
                    >
                      <ThumbsDown size={16} /> Nein
                    </button>
                  </div>
                </Field>

                {!project && projects.length > 0 && (
                  <Field label="Bezug zu einem Projekt? (optional)">
                    <select
                      className="field"
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                    >
                      <option value="">Kein bestimmtes Projekt</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Wird gesendet…
                    </>
                  ) : (
                    "Bewertung absenden →"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Versucht aus der Projekt-Kategorie eine passende Leistungsart abzuleiten. */
function guessServiceType(category: string): ServiceType | "" {
  const c = category.toLowerCase();
  if (c.includes("zweirad")) return "Zweiradtransport";
  if (c.includes("umzug")) return "Umzug";
  if (c.includes("netz") || c.includes("montage")) return "Netzmontage";
  if (c.includes("fahrzeug")) return "Fahrzeugtransport";
  return "";
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-bone">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-error">{error}</span>}
    </label>
  );
}
