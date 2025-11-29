"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReposFilter from "@/lib/github/repos/ReposFilter.client";
import UsersFilter from "@/lib/github/users/UserFilter.client";
import useGitHubData from "@/hooks/useGithubData";
import LoaderPage from "@/components/Loader";
import { token } from "@/lib/helper";
import GithubHeader from "../header/githubHeader";
import NotFoundPage from "../../../components/not-found";

function SearchParamsContent() {
  const searchParams = useSearchParams();
  const searchType = (searchParams.get("searchType") || "") as "repos" | "users";
  const usernameFromUrl = searchParams.get("username") || "";

  const { profile, repos, users, totalCount, loading, error } = useGitHubData(
    usernameFromUrl,
    token,
    searchType
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
