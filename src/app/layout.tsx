import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PageLoadScan } from "@/components/PageLoadScan";
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
  metadataBase: new URL("https://thomas-scharli.de"),
  title: {
    default: "Thomas Scharli – Transport & Umzug",
    template: "%s | Thomas Scharli",
  },
  description:
    "Transport, Umzug und Montage in der Region Stuttgart. Vespas, Motorräder, Fahrzeuge, Mobilitätshilfen und komplette Umzüge – schnell, sicher, stressfrei.",
  keywords: [
    "Transport",
    "Umzug",
    "Fahrzeugtransport",
    "Motorradtransport",
    "Vespa Transport",
    "Netzmontagen",
    "Stuttgart",
    "Thomas Scharli",
  ],
  openGraph: {
    title: "Thomas Scharli – Transport & Umzug",
    description: "Wir bringen, was zählt. Schnell, sicher, stressfrei.",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/media/og/og-image.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="bg-void text-bone antialiased">
        <PageLoadScan />
        {children}
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
      </body>
    </html>
  );
}
