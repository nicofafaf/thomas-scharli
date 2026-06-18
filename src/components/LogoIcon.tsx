export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Thomas Scharli Logo"
      role="img"
    >
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="3"
        stroke="var(--gold)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M3 15 L3 3 L15 3"
        stroke="var(--gold)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="square"
      />
      <path
        d="M33 45 L45 45 L45 33"
        stroke="var(--gold)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="square"
      />
      <text
        x="50%"
        y="56%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="20"
        fontWeight="600"
        fill="var(--bone)"
        letterSpacing="-0.5"
      >
        TS
      </text>
    </svg>
  );
}
