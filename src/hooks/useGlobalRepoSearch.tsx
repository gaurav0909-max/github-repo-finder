import { useState, useEffect, useCallback } from "react";
import { GlobalSearchParams, SearchReposResponse } from "@/types/types";

export function useGlobalRepoSearch(params: GlobalSearchParams) {
  const [data, setData] = useState<SearchReposResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    if (!params.query) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { default: GlobalRepos } = await import(
        "@/lib/github/repos/GlobalRepos.server"
      );
      const result = await GlobalRepos(params);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch repositories";
      setError(errorMessage);
      console.error("[useGlobalRepoSearch] Error:", err);
    } finally {
      setLoading(false);
    }
  }, [params.query, params.page, params.sort, params.order, params.language, params.stars, params.created, params.topics]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { data, loading, error, refetch: fetchRepos };
}
