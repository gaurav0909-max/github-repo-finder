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

interface GitHubPageProps {
  searchType: string;
  usernameFromUrl: string;
}

export const dynamic = "force-dynamic";

// Server-side rendering to fetch query params and pass as props
export async function getServerSideProps(context: {
  query: { searchType?: string; username?: string };
}) {
  const { searchType, username } = context.query;

  // Check for missing query parameters and set defaults if necessary
  const searchTypeParam = searchType || "";
  const usernameFromUrl = username || "";

  return {
    props: {
      searchType: searchTypeParam,
      usernameFromUrl: usernameFromUrl,
    },
  };
}

const GitHubPage: React.FC<GitHubPageProps> = ({
  searchType,
  usernameFromUrl,
}) => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <GitHubPageContent
        searchType={searchType}
        usernameFromUrl={usernameFromUrl}
      />
    </Suspense>
  );
};

interface GitHubPageContentProps {
  searchType: string;
  usernameFromUrl: string;
}

const GitHubPageContent: React.FC<GitHubPageContentProps> = ({
  searchType,
  usernameFromUrl,
}) => {
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
};

export default GitHubPage;
