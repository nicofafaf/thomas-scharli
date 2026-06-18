import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-void px-6 text-center">
      <p className="font-display text-7xl font-semibold text-gold">404</p>
      <h1 className="font-display text-3xl font-semibold text-bone">
        Seite nicht gefunden.
      </h1>
      <p className="max-w-md text-ash">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link href="/" className="btn-gold">
        Zurück zur Startseite
      </Link>
    </div>
  );
}
