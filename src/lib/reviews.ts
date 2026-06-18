import type { Review, ReviewStats } from "@/types";

/**
 * Berechnet die Bewertungs-Statistik rein aus einer Liste freigegebener
 * Bewertungen – funktioniert identisch im Supabase- und im Mock-Modus.
 */
export function computeReviewStats(reviews: Review[]): ReviewStats {
  const totalCount = reviews.length;

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = totalCount
    ? Math.round((sum / totalCount) * 10) / 10
    : 0;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percent = totalCount ? Math.round((count / totalCount) * 100) : 0;
    return { stars, count, percent };
  });

  const recommendCount = reviews.filter((r) => r.would_recommend).length;
  const recommendPercent = totalCount
    ? Math.round((recommendCount / totalCount) * 100)
    : 0;

  const serviceMap = new Map<string, number>();
  for (const r of reviews) {
    if (!r.service_type) continue;
    serviceMap.set(r.service_type, (serviceMap.get(r.service_type) ?? 0) + 1);
  }
  const byServiceType = Array.from(serviceMap.entries())
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count);

  return {
    averageRating,
    totalCount,
    distribution,
    recommendPercent,
    byServiceType,
  };
}
