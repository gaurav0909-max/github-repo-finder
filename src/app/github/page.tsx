"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoaderPage from "./../../components/Loader/index";
import NotFoundPage from "./../../components/not-found/index";
import ReposFilter from "@/lib/github/repos/ReposFilter.client";
import UsersFilter from "@/lib/github/users/UserFilter.client";
import GithubHeader from "./header/githubHeader";
import useGitHubData from "@/hooks/useGithubData";
import { token } from "./../../lib/helper";

export const dynamic = "force-dynamic";

export default function GitHubPage() {
  return (
    <Suspense fallback={<LoaderPage />}>
      <GitHubPageContent />
    </Suspense>
  );
}

function GitHubPageContent() {
  const searchParams = useSearchParams();
  const searchType = searchParams.get("searchType") || "";
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
    <Suspense fallback={<LoaderPage />}>
      <div className="min-h-screen bg-gray-900">
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-left mb-12">
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
            {searchType === "repos" && (
              <Suspense fallback={<LoaderPage />}>
                <ReposFilter repos={repos} />
              </Suspense>
            )}
            {searchType === "users" && (
              <Suspense fallback={<LoaderPage />}>
                <UsersFilter users={users} />
              </Suspense>
            )}
          </section>
        </section>
      </div>
    </Suspense>
  );
}
