import { Suspense } from "react";
import { Metadata } from "next";
import LoaderPage from "../../components/Loader";
import GitHubPageContent from "./github-wrapper/index";
import Header from "@/components/layout/header";
import Footer from "@/components/Footer";
import { siteConfig, getCanonicalUrl } from "@/lib/seo/metadata.config";

export const dynamic = "force-dynamic";

/**
 * Generate dynamic metadata for GitHub search pages
 * Provides unique titles and descriptions based on search type and query
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const searchType = params.searchType as string;
  const username = params.username as string;
  const query = params.q as string;

  // User search metadata
  if (searchType === "users" && username) {
    const title = `GitHub User: ${username}`;
    const description = `Explore repositories and contributions from GitHub user ${username}. View their projects, activity, and developer profile on RepoVision.`;

    return {
      title,
      description,
      openGraph: {
        title: `${username}'s GitHub Profile | ${siteConfig.name}`,
        description: `Explore repositories and projects from ${username}`,
        url: getCanonicalUrl("/github", { searchType, username }),
        images: [
          {
            url: siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: `${username} on ${siteConfig.name}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${username}'s GitHub Profile`,
        description,
      },
      alternates: {
        canonical: getCanonicalUrl("/github", { searchType, username }),
      },
    };
  }

  // Repository search metadata
  if (searchType === "repos" && query) {
    const title = `Search Results for "${query}"`;
    const description = `Discover GitHub repositories matching "${query}". Filter by language, stars, and more to find the perfect open-source project.`;

    return {
      title,
      description,
      openGraph: {
        title: `"${query}" - Repository Search | ${siteConfig.name}`,
        description: `Browse trending repositories for ${query}`,
        url: getCanonicalUrl("/github", { searchType, q: query }),
        images: [
          {
            url: siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: `${query} search results on ${siteConfig.name}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `Search: ${query}`,
        description,
      },
      alternates: {
        canonical: getCanonicalUrl("/github", { searchType, q: query }),
      },
    };
  }

  // Fallback metadata for generic search page
  return {
    title: "Search GitHub",
    description:
      "Search GitHub repositories and developers. Discover trending projects, explore user profiles, and find amazing open-source contributions.",
    alternates: {
      canonical: getCanonicalUrl("/github", { searchType }),
    },
  };
}

export default function GitHubPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoaderPage />}>
        <GitHubPageContent />
      </Suspense>
      <Footer />
    </main>
  );
}
