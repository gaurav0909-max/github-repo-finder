import Organizations from "@/lib/github/organizations/organizations.server";
import Organization from "../../components/organizations/index";
export default async function OrganizationsPage() {
  const data = await Organizations();
  return (
    <div className="min-h-screen bg-gray-800">
      <Organization data={data} />
    </div>
  );
}
