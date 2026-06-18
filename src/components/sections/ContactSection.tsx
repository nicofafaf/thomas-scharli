"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Phone, MapPin } from "lucide-react";
import { fadeUpVariant, staggerContainer, viewportOnce } from "@/lib/animations";
import { SITE, whatsappLink } from "@/lib/constants";
import type { SiteSettings } from "@/types";

// Formular liegt unter dem Fold -> lazy laden, hält den initialen Bundle klein.
const InquiryForm = dynamic(
  () => import("@/components/InquiryForm").then((m) => m.InquiryForm),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse" aria-hidden="true">
        <div className="mb-10 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="h-7 w-7 border border-mist" />
              {s < 3 && <div className="h-px w-8 bg-mist" />}
            </div>
          ))}
        </div>
        <div className="mb-6 h-7 w-56 bg-mist/60" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-mist/40" />
          ))}
        </div>
      </div>
    ),
  },
);

export function ContactSection({ settings }: { settings: SiteSettings }) {
  const phone = settings.contact_phone;
  const address = settings.contact_address;

  return (
    <section id="kontakt" className="relative overflow-hidden border-t border-mist bg-steel py-28">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-tight relative"
      >
        <motion.span variants={fadeUpVariant} className="eyebrow">
          Kontakt
        </motion.span>
        <motion.h2
          variants={fadeUpVariant}
          className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-bone md:text-5xl"
        >
          Bereit für Ihren Transport?
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="mt-5 max-w-xl text-lg leading-relaxed text-ash"
        >
          Kein Preislistendschungel. Anfrage stellen dauert 60 Sekunden – Thomas
          meldet sich persönlich, unverbindlich und auf Augenhöhe.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Links: Direkt-Kontakt */}
          <motion.div variants={fadeUpVariant} className="flex flex-col gap-4">
            <a
              href={`tel:${phone?.replace(/\s/g, "")}`}
              className="group flex items-center gap-5 border border-mist bg-iron p-6 transition-colors hover:border-gold/40"
            >
              <span className="flex h-12 w-12 items-center justify-center border border-gold/30">
                <Phone size={20} className="text-gold" />
              </span>
              <span>
                <span className="mb-1 block text-xs uppercase tracking-widest2 text-ash">
                  Telefon
                </span>
                <span className="font-medium text-bone transition-colors group-hover:text-gold">
                  {phone}
                </span>
              </span>
            </a>

            <a
              href={whatsappLink("Hallo Thomas, ich habe eine Anfrage.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 border border-[#25D366]/30 bg-iron p-6 transition-colors hover:border-[#25D366]/60"
            >
              <span className="flex h-12 w-12 items-center justify-center border border-[#25D366]/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
              <span>
                <span className="mb-1 block text-xs uppercase tracking-widest2 text-ash">
                  WhatsApp
                </span>
                <span className="font-medium text-[#25D366]">Direkt schreiben</span>
              </span>
            </a>

            <div className="flex items-center gap-5 border border-mist bg-iron p-6">
              <span className="flex h-12 w-12 items-center justify-center border border-mist">
                <MapPin size={20} className="text-gold" />
              </span>
              <span>
                <span className="mb-1 block text-xs uppercase tracking-widest2 text-ash">
                  Einsatzgebiet
                </span>
                <span className="block text-sm text-bone">
                  Stuttgart · Esslingen · Ludwigsburg
                </span>
                <span className="mt-0.5 block text-xs text-ash">{address}</span>
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-ash/60">
              Lieber direkt? Ruf an unter{" "}
              <a href={`tel:${SITE.phoneTel}`} className="text-gold hover:underline">
                {SITE.phoneDisplay}
              </a>
              .
            </p>
          </motion.div>

          {/* Rechts: Formular */}
          <motion.div variants={fadeUpVariant} className="border border-mist bg-iron p-6 sm:p-8">
            <InquiryForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
