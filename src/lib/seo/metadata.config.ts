/**
 * Centralized SEO Configuration for RepoVision
 *
 * This module contains all SEO-related configuration including metadata defaults,
 * OpenGraph images, social media handles, and helper functions for generating
 * page-specific metadata.
 */

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle?: string;
  keywords: string[];
}

export const siteConfig: SiteConfig = {
  name: "RepoVision",
  description:
    "Discover GitHub repositories, talented developers, and trending open-source projects with advanced search and analytics. Explore by username, organization, or search globally across millions of repositories.",
  url: "https://github-resource-finder-001.vercel.app",
  ogImage: "/images/og-image.png",
  twitterHandle: "@repovision", // Update if you have a Twitter account
  keywords: [
    "GitHub",
    "repositories",
    "developers",
    "open source",
    "trending",
    "analytics",
    "search",
    "GitHub API",
    "repository discovery",
    "developer tools",
    "code search",
    "GitHub explorer",
  ],
};

/**
 * Get canonical URL for a given path, excluding unnecessary query parameters
 * to prevent duplicate content issues
 *
 * @param path - The page path (e.g., '/github', '/organizations')
 * @param params - Optional query parameters
 * @returns Canonical URL string
 */
export function getCanonicalUrl(
  path: string,
  params?: Record<string, string | undefined>
): string {
  const url = new URL(path, siteConfig.url);

  if (params) {
    // For /github route, only include essential search parameters
    if (path === "/github") {
      if (params.searchType) {
        url.searchParams.set("searchType", params.searchType);
      }
      if (params.username) {
        url.searchParams.set("username", params.username);
      }
      if (params.q) {
        url.searchParams.set("q", params.q);
      }
      // Explicitly exclude: page, sort, order, language, stars, created, topics, year
      // These create duplicate content and should not be in canonical URL
    }

    // For /organizations route, only include year parameter
    if (path === "/organizations" && params.year) {
      url.searchParams.set("year", params.year);
    }
  }

  return url.toString();
}

/**
 * Get full URL for an image asset
 *
 * @param imagePath - Path to the image (e.g., '/images/og-image.png')
 * @returns Full URL to the image
 */
export function getImageUrl(imagePath: string): string {
  return new URL(imagePath, siteConfig.url).toString();
}

/**
 * Default OpenGraph configuration
 */
export const defaultOpenGraph = {
  type: "website" as const,
  locale: "en_US",
  siteName: siteConfig.name,
  images: [
    {
      url: getImageUrl(siteConfig.ogImage),
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} - Discover GitHub Projects`,
    },
  ],
};

/**
 * Default Twitter Card configuration
 */
export const defaultTwitter = {
  card: "summary_large_image" as const,
  creator: siteConfig.twitterHandle,
};
