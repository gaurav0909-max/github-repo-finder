import { token } from "@/lib/helper";
import { getFromCache, saveToCache } from "@/lib/utils/cache";
import { GlobalSearchParams, SearchReposResponse } from "@/types/types";

export default async function GlobalRepos(params: GlobalSearchParams): Promise<SearchReposResponse> {
  const {
    query,
    page = 1,
    sort = "best-match",
    order = "desc",
    language,
    stars,
    created,
    topics
  } = params;

  // Build search query with filters
  let searchQuery = query;
  if (language) searchQuery += `+language:${language}`;
  if (stars) searchQuery += `+stars:${stars}`;
  if (created) searchQuery += `+created:${created}`;
  if (topics) {
    const topicArray = topics.split(',');
    topicArray.forEach(topic => {
      searchQuery += `+topic:${topic.trim()}`;
    });
  }

  // Generate cache key
  const cacheKey = `global-repos-${searchQuery}-${page}-${sort}-${order}`;

  // Check cache first (10 minute TTL)
  const cached = getFromCache<SearchReposResponse>(cacheKey);
  if (cached) {
    console.log(`[GlobalRepos] Cache hit: ${cacheKey}`);
    return cached;
  }

  // Build API URL
  const perPage = 10;
  const sortParam = sort !== "best-match" ? `&sort=${sort}&order=${order}` : "";
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=${perPage}&page=${page}${sortParam}`;

  console.log(`[GlobalRepos] Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 600 } // Next.js cache: 10 minutes
    });

    // Check rate limiting
    const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
    const rateLimitReset = response.headers.get("X-RateLimit-Reset");

    if (rateLimitRemaining) {
      console.log(`[GlobalRepos] Rate limit remaining: ${rateLimitRemaining}`);
      if (parseInt(rateLimitRemaining) < 5) {
        const resetTime = rateLimitReset
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
          : "unknown";
        console.warn(`[GlobalRepos] WARNING: Rate limit low! Resets at ${resetTime}`);
      }
    }

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error("Invalid search query. Please refine your search.");
      }
      if (response.status === 403) {
        const resetTime = rateLimitReset
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
          : "unknown";
        throw new Error(`Rate limit exceeded. Try again at ${resetTime}`);
      }
      if (response.status === 503) {
        throw new Error("GitHub API is temporarily unavailable. Please try again later.");
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data: SearchReposResponse = await response.json();

    console.log(`[GlobalRepos] Found ${data.items.length} repos (total: ${data.total_count})`);

    // Cache for 10 minutes
    saveToCache(cacheKey, data, { ttl: 600 });

    return data;
  } catch (error) {
    console.error("[GlobalRepos] Error:", error);
    throw error;
  }
}
