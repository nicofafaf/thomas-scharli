"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { fadeUpVariant, staggerContainer, viewportOnce } from "@/lib/animations";
import type { SiteSettings } from "@/types";

export function ContactSection({ settings }: { settings: SiteSettings }) {
  const phone = settings.contact_phone;
  const email = settings.contact_email;
  const address = settings.contact_address;

  const items = [
    {
      icon: Phone,
      label: "Telefon",
      value: phone,
      href: `tel:${phone?.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "E-Mail",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: MapPin,
      label: "Region",
      value: address,
      href: undefined,
    },
  ];

  return (
    <section id="kontakt" className="relative overflow-hidden bg-steel py-28">
      {/* dezenter Gold-Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-tight relative flex flex-col items-center text-center"
      >
        <motion.span variants={fadeUpVariant} className="eyebrow">
          Kontakt
        </motion.span>
        <motion.h2
          variants={fadeUpVariant}
          className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-bone md:text-6xl"
        >
          Bereit für Ihren Transport?
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="mt-5 max-w-xl text-lg leading-relaxed text-ash"
        >
          Kein Preislistendschungel. Nur ein ehrliches, kostenfreies Gespräch –
          persönlich, unverbindlich und auf Augenhöhe.
        </motion.p>

        <motion.div
          variants={fadeUpVariant}
          className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-3"
        >
          {items.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="flex h-full flex-col items-center gap-2 rounded-[4px] border border-mist bg-iron p-6 transition-colors hover:border-gold/60">
                <Icon size={22} className="text-gold" />
                <span className="text-xs uppercase tracking-widest2 text-ash">
                  {label}
                </span>
                <span className="text-bone">{value}</span>
              </div>
            );
            return href ? (
              <a key={label} href={href} className="block h-full">
                {content}
              </a>
            ) : (
              <div key={label} className="h-full">
                {content}
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUpVariant} className="mt-10">
          <a href={`mailto:${email}`} className="btn-gold">
            Jetzt Kontakt aufnehmen
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
