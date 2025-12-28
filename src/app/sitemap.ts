import { MetadataRoute } from "next";

/**
 * Dynamic Sitemap Generation for RepoVision
 *
 * This sitemap includes all static and semi-dynamic routes that should be indexed
 * by search engines. It excludes user-specific and query-based URLs which have
 * infinite variations and are discovered through internal linking.
 *
 * Automatically served at: /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://github-resource-finder-001.vercel.app";
  const currentDate = new Date();

  // Static routes with high priority
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/organizations`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/github?searchType=users`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/github?searchType=repos`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Year-based organization pages (last 6 years)
  // Organizations data is relatively stable, so we include these
  const currentYear = new Date().getFullYear();
  const yearRoutes: MetadataRoute.Sitemap = Array.from(
    { length: 6 },
    (_, i) => ({
      url: `${baseUrl}/organizations?year=${currentYear - i}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...yearRoutes];
}
