import { Suspense } from "react";
import LoaderPage from "../../components/Loader";
import GitHubPageContent from "./github-wrapper/index";
import Header from "@/components/layout/header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

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
