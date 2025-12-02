import { token } from "@/lib/helper";
import { getFromCache, saveToCache } from "@/lib/utils/cache";

interface GitHubOrganization {
  id: number;
  login: string;
  avatar_url: string;
  description?: string;
  location?: string;
  blog?: string;
  public_members_count?: number;
  public_repos?: number;
  created_at?: string;
  type?: string;
  is_verified?: boolean;
}

export default async function Organizations(year?: string | null) {
  const cacheKey = `orgs-${year || "recent"}`;

  const cached = getFromCache<GitHubOrganization[]>(cacheKey);
  if (cached) {
    return cached;
  }

  // Build search query based on year parameter
  const currentYear = new Date().getFullYear();
  let dateQuery: string;

  if (year) {
    // Specific year: created:YYYY-01-01..YYYY-12-31
    dateQuery = `created:${year}-01-01..${year}-12-31`;
  } else {
    // Recent orgs: created >= last year
    const lastYear = currentYear - 1;
    dateQuery = `created:>=${lastYear}-01-01`;
  }

  // Build search query: type:org + date filter
  const query = `type:org+${dateQuery}`;
  const perPage = 100;

  // Use GitHub Search API
  const searchUrl = `https://api.github.com/search/users?q=${query}&sort=created&order=desc&per_page=${perPage}`;

  const searchResponse = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
  });

  if (!searchResponse.ok) {
    return [];
  }

  const searchData = await searchResponse.json();

  if (!searchData.items || !Array.isArray(searchData.items)) {
    return [];
  }

  const organizations = searchData.items;

  const detailedOrgs = await Promise.all(
    organizations.map(async (org: GitHubOrganization) => {
      try {
        const detailResponse = await fetch(
          `https://api.github.com/orgs/${org.login}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-GitHub-Api-Version": "2022-11-28",
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!detailResponse.ok) {
          return org;
        }

        const detailedOrg = await detailResponse.json();
        return detailedOrg;
      } catch {
        return org;
      }
    })
  );

  // Cache results for 1 hour
  saveToCache(cacheKey, detailedOrgs, { ttl: 3600 });

  return detailedOrgs;
}
