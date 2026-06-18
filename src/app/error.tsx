"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-void px-6 text-center">
      <p className="eyebrow">Ein Fehler ist aufgetreten</p>
      <h1 className="font-display text-4xl font-semibold text-bone">
        Etwas ist schiefgelaufen.
      </h1>
      <p className="max-w-md text-ash">
        Bitte versuchen Sie es erneut. Sollte das Problem bestehen bleiben,
        kontaktieren Sie uns direkt.
      </p>
      <button type="button" onClick={reset} className="btn-gold">
        Erneut versuchen
      </button>
    </div>
  );
}
