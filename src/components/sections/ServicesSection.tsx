"use client";

import { motion } from "framer-motion";
import { Bike, Boxes, Truck, PackageCheck, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SERVICES } from "@/lib/constants";
import { fadeUpVariant, staggerContainerFast, viewportOnce } from "@/lib/animations";

const ICONS = [Bike, Boxes, Truck, PackageCheck, Wrench];

export function ServicesSection() {
  return (
    <section id="leistungen" className="bg-void py-24">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Was wir tun"
          title="Schnell. Sicher. Stressfrei."
          description="Von der einzelnen Vespa bis zum kompletten Umzug – wir bringen Ihr Gut unbeschädigt ans Ziel."
        />

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-mist bg-mist sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.article
                key={service.title}
                variants={fadeUpVariant}
                className="group relative flex flex-col gap-3 bg-iron p-7 transition-colors hover:bg-steel"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[3px] bg-gold-dim text-gold transition-colors group-hover:text-gold-light">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-2xl font-semibold text-bone">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-ash">{service.text}</p>
                <p className="mt-auto pt-2 text-xs text-ash/60">{service.area}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
