"use client";
import React, { Suspense } from "react";
import LoaderPage from "./../../components/Loader/index";
import GitHubPageClient from './../page';

export default function GitHubPageWrapper() {
    return (
        <Suspense fallback={<LoaderPage />}>
            <GitHubPageClient />
        </Suspense>
    );
}