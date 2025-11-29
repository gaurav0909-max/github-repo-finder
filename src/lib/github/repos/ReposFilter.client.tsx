"use client";
import React, { useState, useMemo, useRef } from "react";
import { BookOpen, Code2 } from "lucide-react";
import { useFilteredRepos } from "../../../hooks/useFilteredRepos";
import RepoCard from "@/components/repo-card";
import { FilterProps } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ReposFilter({ repos }: FilterProps) {
  const [filter, setFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const topRef = useRef<HTMLDivElement>(null);

  const filteredRepos = useFilteredRepos(repos, filter, searchTerm);

  const languages = useMemo(
    () => Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean))),
    [repos]
  );

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
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
    </div>
  );
}
