"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-mist bg-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="container-tight flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-xl font-semibold tracking-wide text-bone">
            {SITE.name}
          </span>
          <span className="text-[0.6rem] uppercase tracking-widest2 text-gold">
            {SITE.tagline}
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-ash transition-colors hover:text-bone"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link href="/#kontakt" className="btn-gold !py-2 !px-4 text-sm">
            Kontakt aufnehmen
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center text-bone md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-mist bg-void/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <div className="container-tight flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center text-base text-bone/90 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            onClick={() => setOpen(false)}
            className="btn-gold mt-2 w-full"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </header>
  );
}
