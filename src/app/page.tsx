import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getProjects, getApprovedReviews, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, reviews, settings] = await Promise.all([
    getProjects(),
    getApprovedReviews(),
    getSettings(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <h1 className="sr-only">
          Thomas Scharli – Transport &amp; Umzug Stuttgart | Vespa Transport ·
          Zweiradtransport · Umzüge · Netzmontagen · Region Stuttgart
        </h1>
        <HeroSection settings={settings} />
        <StatsSection settings={settings} />
        <ServicesSection />
        <ProjectsSection projects={projects} limit={5} />
        <ReviewsSection reviews={reviews} />
        <AboutSection />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
