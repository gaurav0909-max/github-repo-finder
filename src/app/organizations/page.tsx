import Organizations from "@/lib/github/organizations/organizations.server";
import Organization from "../../components/organizations/index";

export const dynamic = "force-dynamic";

export default async function OrganizationsPage() {
  try {
    const data = await Organizations();
    return (
      <div className="min-h-screen bg-gray-800">
        <Organization data={data} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Failed to Load Organizations
          </h2>
          <p className="text-slate-300 mb-4">
            {error instanceof Error ? error.message : "An unexpected error occurred"}
          </p>
          <a href="/" className="text-teal-400 hover:text-teal-300 underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }
}
