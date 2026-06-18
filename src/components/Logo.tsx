import Image from "next/image";

interface LogoProps {
  size?: number;
  /** "gold" (default) für dunklen Hintergrund, "bone" für helle Flächen. */
  variant?: "gold" | "bone";
  showText?: boolean;
  className?: string;
  textShadow?: string;
}

const MARK_RATIO = 586 / 268; // Original-Seitenverhältnis des Monogramms

/**
 * Offizielles Logo: das originale TS-Monogramm mit Geschwindigkeitslinien
 * (Transporter-Anmutung) – exakt aus der Markenvorlage extrahiert und in die
 * Goldtöne der Seite gebracht.
 */
export function Logo({
  size = 44,
  variant = "gold",
  showText = true,
  className,
  textShadow,
}: LogoProps) {
  const markHeight = Math.round(size * 0.82);
  const markWidth = Math.round(markHeight * MARK_RATIO);
  const src = variant === "bone" ? "/logo-mark-bone.png" : "/logo-mark.png";

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src={src}
        width={markWidth}
        height={markHeight}
        alt="Thomas Scharli Logo"
        className="select-none"
        style={{ height: markHeight, width: markWidth }}
      />

      {showText && (
        <div className="flex flex-col gap-1 leading-none" style={{ textShadow }}>
          <span
            className="font-display font-semibold leading-none tracking-wide text-bone"
            style={{ fontSize: Math.round(size * 0.38) }}
          >
            Thomas Scharli
          </span>
          <span
            className="font-sans font-medium uppercase leading-none tracking-widest text-gold"
            style={{ fontSize: Math.round(size * 0.18) }}
          >
            Transport &amp; Umzug
          </span>
        </div>
      )}
    </div>
  );
}
