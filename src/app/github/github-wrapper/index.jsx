"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReposFilter from "@/lib/github/repos/ReposFilter.client";
import UsersFilter from "@/lib/github/users/UserFilter.client";
import useGitHubData from "@/hooks/useGithubData";
import LoaderPage from "@/components/Loader";
import { token } from "@/lib/helper";
import GithubHeader from './../header/githubHeader';
import NotFoundPage from './../../../components/not-found/index';

function SearchParamsContent() {
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
    );
}

export default function GitHubPageContent() {
    return (
        <Suspense fallback={<LoaderPage />}>
            <SearchParamsContent />
        </Suspense>
    );
}