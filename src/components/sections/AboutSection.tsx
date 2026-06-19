"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE, ABOUT_POINTS } from "@/lib/constants";
import { MyHammerBadge } from "@/components/MyHammerBadge";
import { fadeUpVariant, staggerContainer, viewportOnce } from "@/lib/animations";

const ABOUT_IMAGE = "/media/about/einsatz.jpg";

export function AboutSection() {
  return (
    <section id="ueber-uns" className="bg-void py-24">
      <div className="container-tight grid items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Foto mit Eck-Akzenten */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-mist shadow-card"
        >
          <Image
            src={ABOUT_IMAGE}
            alt={`${SITE.name} – Transport & Umzug im Einsatz`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ filter: "brightness(0.8) saturate(0.85)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
          {/* Eck-Akzente */}
          <span className="absolute left-4 top-4 h-14 w-14 border-l-2 border-t-2 border-gold/30" />
          <span className="absolute bottom-4 right-4 h-14 w-14 border-b-2 border-r-2 border-gold" />
          <div className="absolute bottom-5 left-5">
            <p className="font-display text-2xl text-bone">{SITE.name}</p>
            <p className="text-xs uppercase tracking-widest2 text-gold">
              {SITE.tagline}
            </p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span variants={fadeUpVariant} className="eyebrow">
            Über Thomas Scharli
          </motion.span>
          <motion.h2
            variants={fadeUpVariant}
            className="mt-3 font-display text-4xl font-semibold leading-tight text-bone md:text-5xl"
          >
            266 Aufträge. Ein Anspruch.
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="mt-5 text-base leading-relaxed text-ash"
          >
            Was auf MyHammer als kleiner Auftrag begann, ist heute ein
            deutschlandweites Netzwerk zufriedener Kunden. Von Stuttgart nach
            Berlin, von München nach Köln – Thomas Scharli transportiert, was
            anderen zu kompliziert ist: Vespas, Harleys, Piaggio Apes,
            Treppenlifte, komplette Haushalte.
          </motion.p>
          <motion.p
            variants={fadeUpVariant}
            className="mt-4 text-base leading-relaxed text-ash"
          >
            266 verifizierte Bewertungen. 4.9 von 5 Sternen. Kein einziger
            beschädigter Transport.
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {ABOUT_POINTS.map((point) => (
              <motion.li
                key={point.label}
                variants={fadeUpVariant}
                className="flex items-start gap-3 rounded-[3px] border border-mist bg-iron p-4 transition-colors hover:border-gold/40"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold" />
                <span>
                  <span className="block text-[0.95rem] font-medium text-bone">
                    {point.label}
                  </span>
                  <span className="block text-xs leading-relaxed text-ash">
                    {point.text}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUpVariant} className="mt-8">
            <MyHammerBadge variant="full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
