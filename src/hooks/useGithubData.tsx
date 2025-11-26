import Users from "@/lib/github/users/users.server";
import { useState, useEffect, useCallback } from "react";
import { UserData, Repo, User } from "@/types/types";

const useGitHubData = (username: string, token: string, searchType: string) => {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchGitHubData = useCallback(async (url: string) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${url}`);
    }

    return await res.json();
  }, [token]);

  const fetchProfile = useCallback(async (username: string) => {
    try {
      const profileData = await fetchGitHubData(
        `https://api.github.com/users/${username}`
      );
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  }, [fetchGitHubData]);

  const fetchRepositories = useCallback(async (username: string) => {
    try {
      const reposData = await fetchGitHubData(
        `https://api.github.com/users/${username}/repos`
      );
      setRepos(reposData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  }, [fetchGitHubData]);

  const fetchUsers = useCallback(async (username: string) => {
    try {
      const userData = await Users({ username });
      setTotalCount(userData.total_count);
      setUsers(userData.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        await fetchProfile(username);

        // Only fetch what's needed based on searchType (50% API call reduction!)
        if (searchType === "repos") {
          await fetchRepositories(username);
        } else if (searchType === "users") {
          await fetchUsers(username);
        }
      } catch (err) {
        // Error already set in fetch functions
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, searchType, fetchProfile, fetchRepositories, fetchUsers]);

  return { profile, repos, users, loading, error, totalCount };
};

export default useGitHubData;
