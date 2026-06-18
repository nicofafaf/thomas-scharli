import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects, getSettings } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Referenzen",
  description:
    "Unsere Referenzen: Zweiradtransporte, Umzüge, Fahrzeugüberführungen und Spezialtransporte in der Region Stuttgart.",
  alternates: { canonical: "/projekte" },
};

export default async function ProjektePage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-void px-0 pb-4 pt-36">
          <div className="container-tight">
            <SectionHeading
              eyebrow="Portfolio"
              title="Jedes Projekt erzählt eine Geschichte."
              description="Eine Auswahl unserer abgeschlossenen Arbeiten. Klicken Sie auf eine Karte, um das Projekt zu bewerten."
            />
          </div>
        </section>
        <ProjectsSection projects={projects} showHeading={false} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
