"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReposFilter from "@/lib/github/repos/ReposFilter.client";
import GlobalReposFilter from "@/lib/github/repos/GlobalReposFilter.client";
import UsersFilter from "@/lib/github/users/UserFilter.client";
import useGitHubData from "@/hooks/useGithubData";
import { useGlobalRepoSearch } from "@/hooks/useGlobalRepoSearch";
import LoaderPage from "@/components/Loader";
import { token } from "@/lib/helper";
import GithubHeader from "../header/githubHeader";
import NotFoundPage from "../../../components/not-found";

function SearchParamsContent() {
  const searchParams = useSearchParams();
  const searchType = (searchParams.get("searchType") || "") as "repos" | "users";

  // Check if this is a global repo search (has 'q' param) or user-specific (has 'username' param)
  const globalQuery = searchParams.get("q");
  const usernameFromUrl = searchParams.get("username") || "";
  const year = searchParams.get("year") || undefined;

  // Handle global repository search
  if (searchType === "repos" && globalQuery) {
    const page = parseInt(searchParams.get("page") || "1");
    const sort = searchParams.get("sort") || "best-match";
    const order = searchParams.get("order") || "desc";
    const language = searchParams.get("language") || undefined;
    const stars = searchParams.get("stars") || undefined;
    const created = searchParams.get("created") || undefined;
    const topics = searchParams.get("topics") || undefined;

    const { data, loading, error } = useGlobalRepoSearch({
      query: globalQuery,
      page,
      sort: sort as any,
      order: order as "asc" | "desc",
      language,
      stars,
      created,
      topics
    });

    if (loading) {
      return <LoaderPage />;
    }

    if (error) {
      return (
        <section className="container mx-auto px-4 py-8">
          <NotFoundPage />
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h2 className="text-lg font-semibold text-destructive mb-2">Error Loading Data</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </section>
      );
    }

    if (!data || data.items.length === 0) {
      return (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
            <p className="text-muted-foreground">
              No repositories found for "{globalQuery}". Try a different search term.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="container mx-auto px-4 py-8">
        <GlobalReposFilter
          repos={data.items}
          totalCount={data.total_count}
          currentPage={page}
          searchQuery={globalQuery}
        />
      </section>
    );
  }

  // Handle user-specific search (existing logic)
  const { profile, repos, users, totalCount, loading, error } = useGitHubData(
    usernameFromUrl,
    token,
    searchType,
    year
  );

  if (loading) {
    return <LoaderPage />;
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-12 text-left">
        <GithubHeader
          profile={profile}
          searchType={searchType}
          username={usernameFromUrl}
          repos={repos}
          users={users}
          total={totalCount}
        />
      </div>

      <section className="mt-8">
        {searchType === "repos" && <ReposFilter repos={repos} />}
        {searchType === "users" && <UsersFilter users={users} />}
      </section>
    </section>
  );
}

export default function GitHubPageContent() {
  return (
    <Suspense fallback={<LoaderPage />}>
      <SearchParamsContent />
    </Suspense>
  );
}
