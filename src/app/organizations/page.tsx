import { Metadata } from "next";
import Organizations from "@/lib/github/organizations/organizations.server";
import Organization from "../../components/organizations/index";
import Header from "@/components/layout/header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig, getCanonicalUrl } from "@/lib/seo/metadata.config";

export const dynamic = "force-dynamic";

/**
 * Generate dynamic metadata for Organizations page
 * Provides year-specific titles and descriptions when filtered
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ year?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const year = params?.year;

  const title = year
    ? `Top GitHub Organizations ${year}`
    : "Explore GitHub Organizations";

  const description = year
    ? `Discover the most influential GitHub organizations from ${year}. Browse top contributors, trending projects, and open-source communities that shaped the developer ecosystem.`
    : "Browse top GitHub organizations, discover influential open-source communities, and explore trending projects from leading tech companies and developers.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: getCanonicalUrl("/organizations", { year }),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${title} on ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: getCanonicalUrl("/organizations", { year }),
    },
  };
}

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ year?: string }>;
}) {
  try {
    const params = await searchParams;
    const year = params?.year;
    const data = await Organizations(year);
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto">
          <Organization data={data} />
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto flex min-h-[70vh] items-center justify-center p-4">
          <Card className="p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Failed to Load Organizations
            </h2>
            <p className="text-muted-foreground mb-6">
              {error instanceof Error ? error.message : "An unexpected error occurred"}
            </p>
            <Link href="/">
              <Button variant="default">Return to Home</Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }
}
