import { MYHAMMER } from "@/lib/constants";

/**
 * Vertrauens-Badge mit der verifizierten MyHammer-Bewertung (4.9★ · 266).
 * "compact" für Hero/Navbar, "full" für About/Reviews.
 */
export function MyHammerBadge({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <a
        href={MYHAMMER.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 border border-mist bg-iron px-3 py-2 text-xs transition-colors hover:border-gold/40"
        aria-label={`${MYHAMMER.rating} Sterne auf MyHammer – Bewertungen ansehen`}
      >
        <span className="font-medium text-gold">{MYHAMMER.rating}★</span>
        <span className="text-ash">{MYHAMMER.reviewCount} Bewertungen</span>
        <span className="text-mist">·</span>
        <span className="text-ash/60">MyHammer</span>
      </a>
    );
  }

  return (
    <a
      href={MYHAMMER.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group flex w-full items-center gap-4 border border-mist bg-iron p-5 transition-all duration-300 hover:border-gold/40"
    >
      <div className="flex flex-shrink-0 flex-col items-center gap-1">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={i <= 4 ? "#C8922A" : "none"}
              stroke="#C8922A"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <span className="font-display text-2xl font-semibold leading-none text-gold">
          {MYHAMMER.rating}
        </span>
        <span className="text-xs text-ash">von 5</span>
      </div>

      <div className="h-12 w-px flex-shrink-0 bg-mist" />

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-bone">
          {MYHAMMER.reviewCount} verifizierte Bewertungen
        </span>
        <span className="text-xs text-ash">Unabhängig geprüft auf MyHammer</span>
        <span className="mt-0.5 text-xs text-gold transition-all group-hover:underline">
          Alle Bewertungen lesen →
        </span>
      </div>
    </a>
  );
}
