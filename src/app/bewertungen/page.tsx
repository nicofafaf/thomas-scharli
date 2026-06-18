import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReviewStatsPanel } from "@/components/reviews/ReviewStatsPanel";
import { ReviewsExplorer } from "@/components/reviews/ReviewsExplorer";
import { getAllApprovedReviews, getProjects, getSettings } from "@/lib/data";
import { computeReviewStats } from "@/lib/reviews";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bewertungen",
  description:
    "Echte Kundenstimmen zu Transport, Umzug und Netzmontagen von Thomas Scharli. Ungefiltert, von echten Aufträgen.",
  alternates: { canonical: "/bewertungen" },
};

export default async function BewertungenPage() {
  const [reviews, projects, settings] = await Promise.all([
    getAllApprovedReviews(),
    getProjects(),
    getSettings(),
  ]);

  const stats = computeReviewStats(reviews);

  return (
    <>
      <Navbar />
      <main className="bg-void pt-28">
        <header className="container-tight pb-12 text-center">
          <p className="eyebrow">Kundenstimmen</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-bone md:text-6xl">
            Was unsere Kunden sagen.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ash">
            Echte Bewertungen. Ungefiltert. Von echten Aufträgen.
          </p>
        </header>

        <ReviewStatsPanel stats={stats} />
        <ReviewsExplorer reviews={reviews} projects={projects} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
