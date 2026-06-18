import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import type { SiteSettings } from "@/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mist bg-steel">
      <div className="container-tight grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold text-bone">
            {SITE.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest2 text-gold">
            {SITE.tagline}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
            Transport, Umzug und Montage in der Region Stuttgart. Schnell,
            sicher, stressfrei – wir bringen, was zählt.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigation</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ash transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Kontakt</p>
          <ul className="space-y-2 text-sm text-ash">
            <li>
              <a
                href={`tel:${settings.contact_phone?.replace(/\s/g, "")}`}
                className="transition-colors hover:text-bone"
              >
                {settings.contact_phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.contact_email}`}
                className="transition-colors hover:text-bone"
              >
                {settings.contact_email}
              </a>
            </li>
            <li>{settings.contact_address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mist">
        <div className="container-tight flex flex-col items-center justify-between gap-2 py-5 text-xs text-ash sm:flex-row">
          <p>
            © {year} {SITE.name} · {SITE.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/impressum"
              className="text-ash/60 transition-colors hover:text-gold"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-ash/60 transition-colors hover:text-gold"
            >
              Datenschutz
            </Link>
            <Link
              href="/admin/login"
              className="text-ash/60 transition-colors hover:text-gold"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
