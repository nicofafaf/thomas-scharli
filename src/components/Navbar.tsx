"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          aria-label="Thomas Scharli – Startseite"
          className="group leading-none transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <Logo
            size={40}
            showText
            textShadow={scrolled ? undefined : "0 1px 8px rgba(0,0,0,0.9)"}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.9)",
                }}
                className={cn(
                  "group relative text-sm font-medium transition-colors hover:text-bone",
                  isActive ? "text-bone" : "text-ash",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full",
                    isActive ? "w-full" : "w-0",
                  )}
                />
              </Link>
            );
          })}
          <MagneticButton
            href="/#kontakt"
            className="btn-gold !px-4 !py-2 text-sm"
          >
            Kontakt aufnehmen
          </MagneticButton>
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
