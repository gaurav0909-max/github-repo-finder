/**
 * @deprecated This file is deprecated and kept for backward compatibility only.
 * Use GlobalRepos.server.tsx for global repository search across all of GitHub.
 * This implementation searches only repositories owned by a specific user.
 */

import { token } from "@/lib/helper";
import { getFromCache, saveToCache } from "@/lib/utils/cache";

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  homepage?: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export default async function Repos({
  username,
  year
}: {
  username: string;
  year?: string | null;
}) {
  const cacheKey = `repos-${username}-${year || "all"}`;

  // Check cache first
  const cached = getFromCache<GitHubRepository[]>(cacheKey);
  if (cached) {
    console.log(`[Repos] Returning cached data for ${cacheKey}`);
    return cached;
  }

  console.log(`[Repos] Fetching repos for user: ${username}, year: ${year || "all"}`);

  let repos: GitHubRepository[] = [];

  if (year) {
    // Use GitHub Search API for year-based filtering
    const dateQuery = `created:${year}-01-01..${year}-12-31`;
    const query = `user:${username}+${dateQuery}`;
    const perPage = 100;

    const searchUrl = `https://api.github.com/search/repositories?q=${query}&sort=created&order=desc&per_page=${perPage}`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
      },
    });

    if (!searchResponse.ok) {
      console.error(`[Repos] Failed to search repositories: ${searchResponse.statusText}`);
      return [];
    }

    const searchData = await searchResponse.json();
    repos = searchData.items || [];
    console.log(`[Repos] Found ${repos.length} repositories for year ${year}`);
  } else {
    // Fetch all repositories (up to 100) using standard API
    const perPage = 100;
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=created&direction=desc`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      console.error(`[Repos] Failed to fetch repositories: ${response.statusText}`);
      return [];
    }

    repos = await response.json();

    if (!Array.isArray(repos)) {
      console.error("[Repos] Invalid response format");
      return [];
    }

    console.log(`[Repos] Found ${repos.length} repositories`);
  }

  // Cache results for 1 hour
  saveToCache(cacheKey, repos, { ttl: 3600 });

  return repos;
}
