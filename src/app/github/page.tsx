import { Suspense } from "react";
import LoaderPage from "../../components/Loader";
import GitHubPageContent from "./github-wrapper/index";

export const dynamic = "force-dynamic";

export default function GitHubPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<LoaderPage />}>
        <GitHubPageContent />
      </Suspense>
    </div>
  );
}
