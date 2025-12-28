"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Link2, MapPin, Calendar, GitFork, Building2, Search, X, ArrowUp, ArrowDown, Loader2, BadgeCheck } from "lucide-react";
import Pagination from "../pagination";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrganizationData {
  id: number;
  login: string;
  avatar_url: string;
  description?: string;
  location?: string;
  blog?: string;
  public_members_count?: number;
  public_repos?: number;
  created_at?: string;
  type?: string;
  is_verified?: boolean;
}

interface OrganizationProps {
  data: OrganizationData[];
}

// Type definitions for sort
type SortOption = "name" | "repos" | "created";
type SortDirection = "asc" | "desc";

function Organization({ data }: OrganizationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedYear = searchParams?.get("year") || "recent";

  // Loading state for year changes
  const [isYearChanging, setIsYearChanging] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  // Sort state
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const topRef = useRef<HTMLDivElement>(null);

  // Predefined year range (from 2008 to current year)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2008 + 1 },
    (_, i) => currentYear - i
  );

  // Reset loading state when data changes (navigation complete)
  useEffect(() => {
    setIsYearChanging(false);
  }, [data]);

  // Search filtering (memoized)
  const searchedOrgs = useMemo(() => {
    if (!debouncedSearchTerm) return data;

    const searchLower = debouncedSearchTerm.toLowerCase();
    return data.filter((org) => {
      const matchesLogin = org.login.toLowerCase().includes(searchLower);
      const matchesDescription = org.description?.toLowerCase().includes(searchLower) || false;
      return matchesLogin || matchesDescription;
    });
  }, [data, debouncedSearchTerm]);

  // Sorting (memoized) - no more year filtering, it's done server-side
  const sortedOrgs = useMemo(() => {
    const sorted = [...searchedOrgs];

    sorted.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case "name":
          compareValue = a.login.localeCompare(b.login);
          break;
        case "repos":
          compareValue = (a.public_repos || 0) - (b.public_repos || 0);
          break;
        case "created":
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          compareValue = dateA - dateB;
          break;
      }

      return sortDirection === "asc" ? compareValue : -compareValue;
    });

    return sorted;
  }, [searchedOrgs, sortBy, sortDirection]);

  // Use sorted data for pagination
  const totalPages = Math.ceil(sortedOrgs.length / itemsPerPage);
  const currentData = sortedOrgs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number, shouldScroll = true) => {
    setCurrentPage(page);
    if (shouldScroll && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSortChange = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle direction if clicking same option
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New option: default to ascending
      setSortBy(option);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div ref={topRef} className="px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Organizations</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search organizations by name or description..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          {searchTerm && (
            <Button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Year Filter */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by Year:</span>
          <Select
            value={selectedYear}
            onValueChange={(value) => {
              setIsYearChanging(true);
              if (value === "recent") {
                router.push("/organizations");
              } else {
                router.push(`/organizations?year=${value}`);
              }
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Recent" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
              <SelectItem value="recent">Recent</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-muted-foreground mr-2">Sort by:</span>

        <Button
          onClick={() => handleSortChange("name")}
          variant={sortBy === "name" ? "default" : "outline"}
          size="sm"
          className="gap-2"
        >
          Name
          {sortBy === "name" && (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </Button>

        <Button
          onClick={() => handleSortChange("repos")}
          variant={sortBy === "repos" ? "default" : "outline"}
          size="sm"
          className="gap-2"
        >
          Repositories
          {sortBy === "repos" && (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </Button>

        <Button
          onClick={() => handleSortChange("created")}
          variant={sortBy === "created" ? "default" : "outline"}
          size="sm"
          className="gap-2"
        >
          Created Date
          {sortBy === "created" && (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </Button>
      </div>

      {/* Screen reader heading for semantic structure */}
      <h2 className="sr-only">Organization List</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-[600px]">
        {currentData.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              No organizations found
            </h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          currentData.map((org) => (
            <Card key={org.id} className="p-6 transition-shadow hover:shadow-lg relative">
            {/* GitHub Link Icon */}
            <Link
              href={`https://github.com/${org.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-muted transition-colors"
              title="View on GitHub"
            >
              <Building2 className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>

            <div className="mb-4 flex items-center space-x-4">
              <Image
                src={org.avatar_url}
                alt={`${org.login} avatar`}
                width={64}
                height={64}
                className="rounded-full border border-border"
              />
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {org.login}
                </h3>
              </div>
            </div>

            {org.description && (
              <p className="mb-4 text-sm text-muted-foreground">
                {org.description}
              </p>
            )}

            <div className="space-y-2 text-sm">
              {org.location && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{org.location}</span>
                </div>
              )}

              {org.blog && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Link2 className="h-4 w-4" />
                  <Link
                    href={org.blog}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </Link>
                </div>
              )}

              <div className="flex items-center space-x-2 text-muted-foreground">
                <GitFork className="h-4 w-4" />
                <span>{org.public_repos || 0} Repositories</span>
              </div>

              {org.created_at && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created {new Date(org.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              {org.type && (
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{org.type}</span>
                </div>
              )}
              {org.is_verified && (
                <Badge variant="success" className="p-1.5" title="Verified Organization">
                  <BadgeCheck className="h-4 w-4" />
                </Badge>
              )}
            </div>
          </Card>
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => handlePageChange(page, true)}
      />

      {/* Full-page loading overlay */}
      {isYearChanging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading organizations...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Organization);
