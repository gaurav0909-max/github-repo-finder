"use client";
import React, { useState, useMemo, useRef } from "react";
import { BookOpen, Code2, Loader2 } from "lucide-react";
import { useFilteredRepos } from "../../../hooks/useFilteredRepos";
import RepoCard from "@/components/repo-card";
import { FilterProps } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReposFilter({ repos }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedYear = searchParams?.get("year") || "all";

  const [filter, setFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isYearChanging, setIsYearChanging] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const filteredRepos = useFilteredRepos(repos, filter, searchTerm);

  const languages = useMemo(() => {
    const langs = repos
      .map((repo) => repo.language)
      .filter((lang): lang is string => Boolean(lang));
    return Array.from(new Set(langs));
  }, [repos]);

  // Generate year options (from 2008 to current year)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2008 + 1 },
    (_, i) => currentYear - i
  );

  // Reset loading state when repos change
  React.useEffect(() => {
    setIsYearChanging(false);
  }, [repos]);

  const handleYearChange = (value: string) => {
    setIsYearChanging(true);
    const currentParams = new URLSearchParams(searchParams?.toString());

    if (value === "all") {
      currentParams.delete("year");
    } else {
      currentParams.set("year", value);
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div ref={topRef} className="max-w-6xl mx-auto px-4 py-8">
      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12"
          />
          <BookOpen
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by Year:</span>
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setFilter("")}
            variant={!filter ? "default" : "outline"}
            size="sm"
          >
            All Languages
          </Button>
          {languages.map((lang) => (
            <Button
              key={lang}
              onClick={() => setFilter(lang)}
              variant={filter === lang ? "default" : "outline"}
              size="sm"
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredRepos.map((repo: any) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            No repositories found
          </h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Loading overlay for year changes */}
      {isYearChanging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading repositories...</p>
          </div>
        </div>
      )}
    </div>
  );
}
