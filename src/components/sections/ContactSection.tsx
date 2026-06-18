"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { fadeUpVariant, staggerContainer, viewportOnce } from "@/lib/animations";
import { SITE, whatsappLink } from "@/lib/constants";
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

        <motion.div
          variants={fadeUpVariant}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-3 bg-gold px-8 py-4 text-sm font-medium uppercase tracking-widest2 text-void transition-colors hover:bg-gold-light"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)",
            }}
          >
            <Phone size={16} />
            Jetzt anrufen
          </a>

          <a
            href={whatsappLink("Hallo Thomas, ich hätte eine Anfrage.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#25D366] px-8 py-4 text-sm font-medium uppercase tracking-widest2 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-void"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Per WhatsApp anfragen
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
