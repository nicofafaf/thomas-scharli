interface LogoProps {
  size?: number;
  accentColor?: string;
  textColor?: string;
  showText?: boolean;
  className?: string;
  textShadow?: string;
}

/**
 * Offizielles Logo: TS-Monogramm mit drei Geschwindigkeitslinien links
 * (Transporter-Anmutung). Geschwindigkeitslinien = Gold, Buchstaben = Bone.
 */
export function Logo({
  size = 44,
  accentColor = "#C8922A",
  textColor = "#F2EDE6",
  showText = true,
  className,
  textShadow,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <svg
        width={size}
        height={Math.round(size * 0.64)}
        viewBox="0 0 220 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="0" y="24" width="55" height="14" rx="3" fill={accentColor} />
        <rect x="0" y="46" width="40" height="14" rx="3" fill={accentColor} />
        <rect x="0" y="68" width="28" height="14" rx="3" fill={accentColor} />

        <rect x="63" y="14" width="66" height="14" rx="3" fill={textColor} />
        <rect x="87" y="14" width="14" height="98" rx="3" fill={textColor} />
        <rect x="63" y="98" width="66" height="14" rx="3" fill={textColor} />

        <rect x="141" y="14" width="13" height="112" rx="3" fill={textColor} />

        <path
          d="M161 14 H205 Q219 14 219 28 V50 Q219 64 205 64 H173 Q161 64 161 76 V96 Q161 112 175 112 H219"
          stroke={textColor}
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

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
