import { MYHAMMER } from "@/lib/constants";

/** Schmaler Vertrauens-Streifen zwischen Hero und Stats. */
export function TrustBar() {
  return (
    <div className="border-y border-mist bg-iron py-4">
      <div className="container-tight flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-12">
        <a
          href={MYHAMMER.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
        >
          <span className="font-medium text-gold">{MYHAMMER.rating}★</span>
          <span>{MYHAMMER.reviewCount} Bewertungen auf MyHammer</span>
        </a>

        <span className="hidden text-mist md:block">·</span>

        <div className="flex items-center gap-2 text-sm text-ash">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C8922A"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>Deutschlandweit</span>
        </div>

        <span className="hidden text-mist md:block">·</span>

        <div className="flex items-center gap-2 text-sm text-ash">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4CAF7D"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>Kein Transport mit Schaden</span>
        </div>
      </div>
    </div>
  );
}
