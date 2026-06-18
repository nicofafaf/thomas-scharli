"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * "Der Goldene Scan" – ein horizontaler Goldstreifen, der beim Page-Load
 * einmalig von oben nach unten über die gesamte Seite fährt, wie ein
 * Laserscanner, der ein Gebäude erfasst.
 */
export function PageLoadScan() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, [reduce]);

  if (done || reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-screen overflow-hidden"
    >
      <motion.div
        initial={{ y: "0vh" }}
        animate={{ y: "102vh" }}
        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        className="absolute inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-gold) 30%, var(--color-gold-light) 50%, var(--color-gold) 70%, transparent 100%)",
          boxShadow: "0 0 20px 6px rgba(200,146,42,0.5)",
        }}
      />
    </div>
  );
}
