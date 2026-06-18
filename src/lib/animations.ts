import type { Variants } from "framer-motion";

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// Horizontaler Gold-Scan beim Hover ueber Projektkarten
// faehrt von links (-60px) bis komplett rechts aus dem Bild heraus
export const goldScanVariant: Variants = {
  initial: { left: -60, opacity: 0 },
  hover: {
    left: "100%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Gemeinsame Viewport-Konfiguration fuer scrollbasierte Reveals
export const viewportOnce = { once: true, margin: "-100px" } as const;
