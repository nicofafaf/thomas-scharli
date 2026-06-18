"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.span variants={fadeUpVariant} className="eyebrow">
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUpVariant}
        className="max-w-2xl font-display text-4xl font-semibold leading-tight text-bone md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUpVariant}
          className="max-w-xl text-base leading-relaxed text-ash"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
