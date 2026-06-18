"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { inquirySchema } from "@/lib/validation";
import { whatsappLink, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { InquiryServiceType } from "@/types";

const SERVICES: {
  key: InquiryServiceType;
  icon: string;
  label: string;
  desc: string;
}[] = [
  { key: "Zweiradtransport", icon: "🛵", label: "Vespa & Zweirad", desc: "Vespas, Motorräder, Roller" },
  { key: "Umzug", icon: "📦", label: "Umzug", desc: "Möbel, Haushalt, Büro" },
  { key: "Fahrzeugtransport", icon: "🚗", label: "Fahrzeug", desc: "Piaggio Ape, E-Mobile" },
  { key: "Spezialtransport", icon: "♿", label: "Spezialtransport", desc: "Treppenlifte, Mobilitätshilfen" },
  { key: "Netzmontage", icon: "🔧", label: "Netzmontage", desc: "Fachgerechte Montagen" },
  { key: "Sonstiges", icon: "➕", label: "Sonstiges", desc: "Andere Anfrage" },
];

const NEEDS_ROUTE: InquiryServiceType[] = [
  "Zweiradtransport",
  "Umzug",
  "Fahrzeugtransport",
  "Spezialtransport",
];

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "service_type", string>>;

export function InquiryForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [serviceType, setServiceType] = useState<InquiryServiceType | "">("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [dateWished, setDateWished] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const slide = reduce
    ? {}
    : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = inquirySchema.safeParse({
      name,
      phone,
      email,
      service_type: serviceType,
      from_location: fromLocation,
      to_location: toLocation,
      date_wished: dateWished,
      message,
    });

    if (!result.success) {
      const fe: FieldErrors = {};
      for (const issue of result.error.errors) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fe[key]) fe[key] = issue.message;
      }
      setErrors(fe);
      // Wenn der Fehler die Leistung betrifft, zurueck zu Schritt 1
      if (fe.service_type) setStep(1);
      else if (fe.name || fe.phone || fe.email) setStep(3);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error ?? "Etwas ist schiefgelaufen. Bitte per WhatsApp anfragen.");
        return;
      }
      setSubmitted(true);
    } catch {
      toast.error("Verbindung fehlgeschlagen. Bitte per WhatsApp anfragen.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-2 py-12 text-center"
      >
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border-2 border-gold">
          <motion.svg width="40" height="40" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <motion.path
              d="M6 18 L14 26 L30 10"
              stroke="#C8922A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            />
          </motion.svg>
        </div>
        <h3 className="mb-4 font-display text-3xl font-semibold text-bone">Anfrage erhalten.</h3>
        <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-ash">
          Thomas meldet sich persönlich bei Ihnen – in der Regel innerhalb weniger Stunden.
        </p>
        <a
          href={whatsappLink("Hallo Thomas, ich habe gerade eine Anfrage über die Website gestellt.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#25D366] transition-opacity hover:opacity-80"
        >
          Oder direkt per WhatsApp schreiben →
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Fortschritt */}
      <div className="mb-10 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center text-xs font-medium transition-all duration-300",
                step >= s ? "border-2 border-gold text-gold" : "border border-mist text-ash",
              )}
            >
              {step > s ? "✓" : s}
            </div>
            {s < 3 && (
              <div
                className={cn("h-px w-8 transition-all duration-500", step > s ? "bg-gold" : "bg-mist")}
              />
            )}
          </div>
        ))}
        <span className="ml-3 text-xs text-ash">
          {step === 1 && "Leistung wählen"}
          {step === 2 && "Details"}
          {step === 3 && "Kontaktdaten"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" {...slide} transition={{ duration: 0.3 }}>
            <h3 className="mb-6 font-display text-2xl font-semibold text-bone">
              Was können wir für Sie tun?
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SERVICES.map((service) => (
                <button
                  key={service.key}
                  type="button"
                  onClick={() => {
                    setServiceType(service.key);
                    setErrors((p) => ({ ...p, service_type: undefined }));
                    setStep(2);
                  }}
                  className={cn(
                    "group flex flex-col items-start gap-2 border p-4 text-left transition-all duration-200",
                    serviceType === service.key
                      ? "border-gold bg-gold-dim"
                      : "border-mist bg-iron hover:border-gold/50",
                  )}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {service.icon}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      serviceType === service.key ? "text-gold" : "text-bone group-hover:text-gold",
                    )}
                  >
                    {service.label}
                  </span>
                  <span className="text-xs leading-tight text-ash">{service.desc}</span>
                </button>
              ))}
            </div>
            {errors.service_type && (
              <p className="mt-3 text-xs text-error">{errors.service_type}</p>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" {...slide} transition={{ duration: 0.3 }}>
            <h3 className="mb-6 font-display text-2xl font-semibold text-bone">Details zum Auftrag</h3>
            <div className="space-y-4">
              {serviceType && NEEDS_ROUTE.includes(serviceType) && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Label text="Abholort">
                    <input
                      className="field"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      placeholder="z. B. Stuttgart-Mitte"
                    />
                  </Label>
                  <Label text="Zielort">
                    <input
                      className="field"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      placeholder="z. B. Esslingen"
                    />
                  </Label>
                </div>
              )}
              <Label text="Wunschdatum" optional>
                <input
                  className="field"
                  value={dateWished}
                  onChange={(e) => setDateWished(e.target.value)}
                  placeholder="z. B. nächste Woche oder 25.07.2026"
                />
              </Label>
              <Label text="Weitere Infos" optional>
                <textarea
                  className="field min-h-[90px] resize-y"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="z. B. Vespa PX 125, Bj. 1985, ca. 120 kg"
                />
              </Label>
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="border border-mist px-6 py-3 text-sm text-ash transition-colors hover:border-gold hover:text-bone"
              >
                ← Zurück
              </button>
              <button type="button" onClick={() => setStep(3)} className="btn-gold flex-1">
                Weiter →
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" {...slide} transition={{ duration: 0.3 }}>
            <h3 className="mb-6 font-display text-2xl font-semibold text-bone">
              Wie erreichen wir Sie?
            </h3>
            <div className="space-y-4">
              <Label text="Ihr Name" required error={errors.name}>
                <input
                  className="field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vor- und Nachname"
                  autoComplete="name"
                />
              </Label>
              <Label text="Telefon" required error={errors.phone}>
                <input
                  type="tel"
                  className="field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0151 12345678"
                  autoComplete="tel"
                />
              </Label>
              <Label text="E-Mail" optional error={errors.email}>
                <input
                  type="email"
                  className="field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  autoComplete="email"
                />
              </Label>
              <p className="text-xs leading-relaxed text-ash/60">
                Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht
                an Dritte weitergegeben.
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="border border-mist px-6 py-3 text-sm text-ash transition-colors hover:border-gold hover:text-bone"
              >
                ← Zurück
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold flex-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Wird gesendet…
                  </>
                ) : (
                  "Anfrage absenden →"
                )}
              </button>
            </div>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-4 flex items-center justify-center gap-2 text-xs text-ash transition-colors hover:text-gold"
            >
              <Phone size={13} /> Lieber anrufen: {SITE.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Label({
  text,
  required,
  optional,
  error,
  children,
}: {
  text: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-ash">
        {text}
        {required && <span className="ml-1 text-gold">*</span>}
        {optional && <span className="ml-1 normal-case tracking-normal text-ash/50">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-error">{error}</span>}
    </label>
  );
}
