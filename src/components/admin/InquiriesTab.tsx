"use client";

import { useState } from "react";
import { Phone, Trash2, MapPin, CalendarClock, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { formatDate, cn } from "@/lib/utils";
import type { Inquiry, InquiryStatus } from "@/types";

const STATUS_META: Record<InquiryStatus, { label: string; cls: string }> = {
  neu: { label: "Neu", cls: "border-gold bg-gold-dim text-gold" },
  gesehen: { label: "Gesehen", cls: "border-mist bg-iron text-ash" },
  erledigt: { label: "Erledigt", cls: "border-success/40 bg-success/10 text-success" },
};

const FILTERS: { id: "alle" | InquiryStatus; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "neu", label: "Neu" },
  { id: "gesehen", label: "Gesehen" },
  { id: "erledigt", label: "Erledigt" },
];

/** 0151… -> 49151…  (best effort fuer wa.me) */
function waNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return "49" + digits.slice(1);
  return digits;
}

export function InquiriesTab({
  inquiries,
  onChange,
}: {
  inquiries: Inquiry[];
  onChange: () => void | Promise<void>;
}) {
  const [filter, setFilter] = useState<"alle" | InquiryStatus>("alle");

  const counts = {
    neu: inquiries.filter((i) => i.status === "neu").length,
    gesehen: inquiries.filter((i) => i.status === "gesehen").length,
    erledigt: inquiries.filter((i) => i.status === "erledigt").length,
  };

  const list =
    filter === "alle" ? inquiries : inquiries.filter((i) => i.status === filter);

  async function setStatus(id: string, status: InquiryStatus) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) {
      toast.error("Status konnte nicht geändert werden.");
      return;
    }
    await onChange();
  }

  async function remove(id: string) {
    if (!confirm("Diese Anfrage wirklich löschen?")) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) {
      toast.error("Löschen fehlgeschlagen.");
      return;
    }
    toast.success("Anfrage gelöscht.");
    await onChange();
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-bone">Anfragen</h2>
        <p className="mt-1 text-sm text-ash">
          {counts.neu} neu · {counts.gesehen} in Bearbeitung · {counts.erledigt} erledigt
        </p>
      </div>

      <div className="mb-6 inline-flex rounded-[3px] border border-mist bg-iron p-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-[2px] px-3 py-1.5 text-xs font-medium transition-colors",
              filter === f.id ? "bg-steel text-gold" : "text-ash hover:text-bone",
            )}
          >
            {f.label}
            {f.id !== "alle" && ` (${counts[f.id]})`}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="rounded-[3px] border border-dashed border-mist p-10 text-center text-ash">
          Keine Anfragen in dieser Ansicht.
        </p>
      ) : (
        <div className="space-y-4">
          {list.map((inq) => (
            <article
              key={inq.id}
              className="rounded-[3px] border border-mist bg-iron p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg text-bone">{inq.name}</span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest",
                        STATUS_META[inq.status].cls,
                      )}
                    >
                      {STATUS_META[inq.status].label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-widest2 text-gold">
                    {inq.service_type}
                  </p>
                </div>
                <span className="text-xs text-ash">{formatDate(inq.created_at)}</span>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-ash sm:grid-cols-2">
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-gold/70" />
                  {inq.phone}
                </span>
                {inq.email && (
                  <span className="flex items-center gap-2 break-all">
                    <MessageSquare size={14} className="text-gold/70" />
                    {inq.email}
                  </span>
                )}
                {(inq.from_location || inq.to_location) && (
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold/70" />
                    {inq.from_location || "?"} → {inq.to_location || "?"}
                  </span>
                )}
                {inq.date_wished && (
                  <span className="flex items-center gap-2">
                    <CalendarClock size={14} className="text-gold/70" />
                    {inq.date_wished}
                  </span>
                )}
              </div>

              {inq.message && (
                <p className="mt-3 border-l-2 border-mist pl-3 text-sm leading-relaxed text-bone/90">
                  {inq.message}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${inq.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 rounded-[2px] bg-gold px-3 py-1.5 text-xs font-bold text-void transition-opacity hover:opacity-90"
                >
                  <Phone size={13} /> Anrufen
                </a>
                <a
                  href={`https://wa.me/${waNumber(inq.phone)}?text=${encodeURIComponent(
                    `Hallo ${inq.name}, vielen Dank für Ihre Anfrage bei Thomas Scharli Transport & Umzug.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#25D366] px-3 py-1.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-void"
                >
                  WhatsApp
                </a>

                <select
                  value={inq.status}
                  onChange={(e) => setStatus(inq.id, e.target.value as InquiryStatus)}
                  className="rounded-[2px] border border-mist bg-steel px-2 py-1.5 text-xs text-bone focus:border-gold focus:outline-none"
                  aria-label="Status ändern"
                >
                  <option value="neu">Neu</option>
                  <option value="gesehen">Gesehen</option>
                  <option value="erledigt">Erledigt</option>
                </select>

                <button
                  type="button"
                  onClick={() => remove(inq.id)}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-[2px] border border-mist px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:border-error hover:text-error"
                >
                  <Trash2 size={13} /> Löschen
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
