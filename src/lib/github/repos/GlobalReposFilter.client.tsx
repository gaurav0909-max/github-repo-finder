"use client";

import React, { useState, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Code2, ArrowUp, ArrowDown } from "lucide-react";
import RepoCard from "@/components/repo-card";
import Pagination from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobalReposFilterProps } from "@/types/types";

export default function GlobalReposFilter({
  repos,
  totalCount,
  currentPage,
  searchQuery,
}: GlobalReposFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topRef = useRef<HTMLDivElement>(null);

  // Local state for client-side filters
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [starsMin, setStarsMin] = useState("");
  const [forksMin, setForksMin] = useState("");

  // Get current sort from URL
  const sortBy = searchParams?.get("sort") || "best-match";
  const order = searchParams?.get("order") || "desc";

  const languages = useMemo(() => {
    const langs = repos
      .map(r => r.language)
      .filter((lang): lang is string => Boolean(lang));
    return Array.from(new Set(langs)).sort();
  }, [repos]);

  // Client-side filtering (refine current page results)
  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      // Local text search
      if (localSearchTerm) {
        const term = localSearchTerm.toLowerCase();
        const matchesName = repo.name.toLowerCase().includes(term);
        const matchesDesc = repo.description?.toLowerCase().includes(term);
        if (!matchesName && !matchesDesc) return false;
      }

      // Language filter
      if (selectedLanguage && selectedLanguage !== "all" && repo.language !== selectedLanguage) {
        return false;
      }

      // Stars filter
      if (starsMin && repo.stargazers_count !== undefined) {
        if (repo.stargazers_count < parseInt(starsMin)) return false;
      }

      // Forks filter
      if (forksMin && repo.forks_count !== undefined) {
        if (repo.forks_count < parseInt(forksMin)) return false;
      }

      return true;
    });
  }, [repos, localSearchTerm, selectedLanguage, starsMin, forksMin]);

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("sort", newSort);
    params.set("page", "1"); // Reset to first page
    if (newSort !== "best-match") {
      params.set("order", "desc");
    } else {
      params.delete("order");
    }
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);

    // Scroll to top
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClearFilters = () => {
    setLocalSearchTerm("");
    setSelectedLanguage("all");
    setStarsMin("");
    setForksMin("");
  };

  const totalPages = Math.min(20, Math.ceil(totalCount / 10));
  const showingStart = (currentPage - 1) * 10 + 1;
  const showingEnd = Math.min(currentPage * 10, Math.min(totalCount, 200));

  return (
    <div ref={topRef} className="max-w-6xl mx-auto px-4 py-8">
      {/* Minimal Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Search Results for "{searchQuery}"
        </h2>
        <p className="text-muted-foreground">
          Found {totalCount.toLocaleString()} repositories
          {totalCount > 200 && " (showing first 200)"}
          {(localSearchTerm || selectedLanguage !== "all" || starsMin || forksMin) && filteredRepos.length < repos.length &&
            ` • Filtered to ${filteredRepos.length} on this page`
          }
        </p>
        {repos.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            Showing {showingStart}-{showingEnd} of {Math.min(totalCount, 200)} results
          </p>
        )}
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Quick Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Refine results on this page..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {localSearchTerm && (
            <Button
              onClick={() => setLocalSearchTerm("")}
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <X size={16} />
            </Button>
          )}
        </div>

        {/* Sort and Filter Row */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-match">Best Match</SelectItem>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="forks">Most Forks</SelectItem>
                <SelectItem value="updated">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {languages.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Language:</span>
              <Select value={selectedLanguage || "all"} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>

          {(localSearchTerm || (selectedLanguage && selectedLanguage !== "all") || starsMin || forksMin) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="border rounded-lg p-6 space-y-4 bg-card">
            <h3 className="text-sm font-semibold mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Minimum Stars
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  value={starsMin}
                  onChange={(e) => setStarsMin(e.target.value)}
                  min="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Minimum Forks
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  value={forksMin}
                  onChange={(e) => setForksMin(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredRepos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredRepos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <Code2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No repositories found
          </h3>
          <p className="text-muted-foreground mb-6">
            {localSearchTerm || (selectedLanguage && selectedLanguage !== "all") || starsMin || forksMin ? (
              <>Try adjusting your filters or clearing them to see more results.</>
            ) : (
              <>Try a different search query or check your spelling.</>
            )}
          </p>
          {(localSearchTerm || (selectedLanguage && selectedLanguage !== "all") || starsMin || forksMin) && (
            <Button onClick={handleClearFilters} variant="outline">
              Clear All Filters
            </Button>
          )}
        </div>
      )}

      {/* Help Tip */}
      {totalCount > 1000 && currentPage === 20 && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> GitHub limits search results to 1000 repositories.
            To find more specific results, try adding filters or refining your search query.
          </p>
        </div>
      )}
    </div>
  );
}
