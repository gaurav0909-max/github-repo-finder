import Organizations from "@/lib/github/organizations/organizations.server";
import Organization from "../../components/organizations/index";
import Header from "@/components/layout/header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
