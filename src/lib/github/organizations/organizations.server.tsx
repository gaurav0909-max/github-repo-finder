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

  // Check cache first
  const cached = getFromCache<GitHubOrganization[]>(cacheKey);
  if (cached) {
    console.log(`[Organizations] Returning cached data for ${cacheKey}`);
    return cached;
  }

  console.log(`[Organizations] Fetching orgs for year: ${year || "recent"}`);

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
    console.error(
      `[Organizations] Failed to search organizations: ${searchResponse.statusText}`
    );
    return [];
  }

  // Check rate limits
  const rateLimitRemaining = searchResponse.headers.get("X-RateLimit-Remaining");
  const rateLimitReset = searchResponse.headers.get("X-RateLimit-Reset");

  if (rateLimitRemaining) {
    console.log(`[Organizations] Search API rate limit remaining: ${rateLimitRemaining}`);
    if (parseInt(rateLimitRemaining) < 5) {
      const resetTime = rateLimitReset
        ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
        : "unknown";
      console.warn(
        `[Organizations] WARNING: Search API rate limit low! Resets at ${resetTime}`
      );
    }
  }

  const searchData = await searchResponse.json();

  if (!searchData.items || !Array.isArray(searchData.items)) {
    console.error("[Organizations] Invalid search response format");
    return [];
  }

  const organizations = searchData.items;
  console.log(`[Organizations] Found ${organizations.length} organizations (total: ${searchData.total_count || 0})`);

  // Fetch detailed information for each organization
  console.log(`[Organizations] Fetching details for ${organizations.length} orgs...`);

  const detailedOrgs = await Promise.all(
    organizations.map(async (org: any) => {
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
          console.error(`[Organizations] Failed to fetch details for ${org.login}`);
          return org; // Return basic org data if detail fetch fails
        }

        const detailedOrg = await detailResponse.json();
        return detailedOrg;
      } catch (error) {
        console.error(`[Organizations] Error fetching details for ${org.login}:`, error);
        return org; // Return basic org data on error
      }
    })
  );

  console.log(`[Organizations] Successfully fetched details for ${detailedOrgs.length} organizations`);

  // Cache results for 1 hour
  saveToCache(cacheKey, detailedOrgs, { ttl: 3600 });

  return detailedOrgs;
}
