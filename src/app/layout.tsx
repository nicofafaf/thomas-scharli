import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PageLoadScan } from "@/components/PageLoadScan";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/constants";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url),
  title: {
    default: "Thomas Scharli – Transport & Umzug Stuttgart",
    template: "%s | Thomas Scharli Transport",
  },
  description:
    "Transport, Umzug und Netzmontagen in der Region Stuttgart. Schnell, sicher, stressfrei. Jetzt kostenloses Angebot anfragen: 0152 21331526.",
  keywords: [
    "Transport Stuttgart",
    "Umzug Stuttgart",
    "Zweiradtransport",
    "Motorradtransport",
    "Vespa Transport",
    "Netzmontage",
    "Thomas Scharli",
  ],
  authors: [{ name: "Thomas Scharli" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE.url,
    siteName: "Thomas Scharli Transport & Umzug",
    title: "Thomas Scharli – Transport & Umzug Stuttgart",
    description: "Transport, Umzug und Netzmontagen. Schnell, sicher, stressfrei.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Scharli – Transport & Umzug Stuttgart",
    description: "Transport, Umzug und Netzmontagen. Schnell, sicher, stressfrei.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE.url,
  name: "Thomas Scharli – Transport & Umzug",
  description:
    "Vespa Transport, Zweiradtransport, Umzüge und Netzmontagen in der Region Stuttgart. Schnell, sicher, stressfrei.",
  url: SITE.url,
  telephone: SITE.phoneTel,
  logo: `${SITE.url}/logo-original.jpeg`,
  image: `${SITE.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  areaServed: [
    { "@type": "City", name: "Stuttgart" },
    { "@type": "City", name: "Esslingen" },
    { "@type": "City", name: "Ludwigsburg" },
    { "@type": "City", name: "Böblingen" },
    { "@type": "City", name: "Filderstadt" },
    { "@type": "City", name: "Leinfelden-Echterdingen" },
    { "@type": "City", name: "Waiblingen" },
    { "@type": "City", name: "Fellbach" },
    { "@type": "City", name: "München" },
    { "@type": "City", name: "Berlin" },
    { "@type": "City", name: "Köln" },
    { "@type": "Country", name: "Deutschland" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "266",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Transportleistungen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Vespa Transport Stuttgart" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Zweiradtransport Stuttgart" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Umzug Stuttgart" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fahrzeugtransport Stuttgart",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Netzmontagen Stuttgart" },
      },
    ],
  },
  priceRange: "€€",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "20:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <link
          rel="preload"
          href="/media/hero/hero-poster-v2.jpg"
          as="image"
        />
      </head>
      <body className="bg-void text-bone antialiased">
        <PageLoadScan />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
        <WhatsAppButton />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#1E1E22",
              color: "#F2EDE6",
              border: "1px solid #2C2C32",
              borderRadius: "2px",
              fontSize: "0.9rem",
            },
            success: { iconTheme: { primary: "#4CAF7D", secondary: "#1E1E22" } },
            error: { iconTheme: { primary: "#E05C5C", secondary: "#1E1E22" } },
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
