/**
 * Structured Data (JSON-LD) Schema Generators for RepoVision
 *
 * These functions generate Schema.org JSON-LD markup for rich snippets
 * in search engine results pages (SERPs). This improves visibility and
 * provides better context to search engines about the site's content.
 */

import { siteConfig } from "./metadata.config";

/**
 * WebSite schema with SearchAction
 * Enables the search box feature in Google search results
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/github?searchType=repos&q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Organization schema
 * Provides information about RepoVision as an organization
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RepoVision",
    description:
      "GitHub repository and developer discovery platform. Find trending projects, explore talented developers, and discover open-source communities.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/icons/next.svg`,
    sameAs: [
      "https://github.com/gaurav0909-max/github-repo-finder",
      // Add more social media links here if available
    ],
  };
}

/**
 * SoftwareApplication schema
 * Describes RepoVision as a web application
 */
export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    // Optional: Add aggregateRating when you have real user data
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.8",
    //   ratingCount: "150",
    // },
  };
}

/**
 * BreadcrumbList schema
 * Shows navigation hierarchy in search results
 *
 * @param items - Array of breadcrumb items with name and URL
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  };
}
