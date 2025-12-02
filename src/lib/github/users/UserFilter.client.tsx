"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Building2, ExternalLink, MapPin, X } from "lucide-react";
import Image from "next/image";
import Pagination from "@/components/pagination";
import DynamicData from "@/components/ui/dynamic-data/index";
import LoaderPage from "./../../../components/Loader/index";
import { token } from "@/lib/helper";
import { UserData, UserFilterProps } from "@/types/types";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Custom debounce hook
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const ITEMS_PER_PAGE = 6;

export default function UsersFilter({ users }: UserFilterProps) {
  const [detailedUsers, setDetailedUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [localLocationFilter, setLocalLocationFilter] = useState("");
  const [localOrganizationFilter, setLocalOrganizationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});

  const debouncedLocationFilter = useDebouncedValue(localLocationFilter, 300);
  const debouncedOrganizationFilter = useDebouncedValue(localOrganizationFilter, 300);

  // Memoize users to prevent unnecessary re-fetches
  const userLogins = useMemo(() => users.map(u => u.login).join(','), [users]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      if (detailedUsers.length === users.length) {
        const allUsersMatch = users.every((user, index) =>
          detailedUsers[index]?.login === user.login
        );
        if (allUsersMatch) {
          return;
        }
      }

      try {
        const updatedUsers = await Promise.all(
          users.map(async (user) => {
            try {
              const response = await fetch(
                `https://api.github.com/users/${user.login}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (!response.ok) {
                return { ...user, bio: "Unable to load bio" };
              }
              const data = await response.json();
              return { ...user, ...data };
            } catch {
              return { ...user, bio: "Unable to load bio" };
            }
          })
        );

        if (isMounted) {
          setDetailedUsers(updatedUsers);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, [userLogins]);

  const filteredUsers = useMemo(() => {
    return detailedUsers.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      const locationLower = debouncedLocationFilter.toLowerCase();
      const organizationLower = debouncedOrganizationFilter.toLowerCase();

      const matchesSearch =
        !searchTerm ||
        user.login.toLowerCase().includes(searchLower) ||
        user.type.toLowerCase().includes(searchLower) ||
        (user.bio && user.bio.toLowerCase().includes(searchLower));

      const matchesLocation =
        !debouncedLocationFilter ||
        (user.location && user.location.toLowerCase().includes(locationLower));

      const matchesOrganization =
        !debouncedOrganizationFilter ||
        (user?.company &&
          user?.company.toLowerCase().includes(organizationLower));

      return matchesSearch && matchesLocation && matchesOrganization;
    });
  }, [
    detailedUsers,
    searchTerm,
    debouncedLocationFilter,
    debouncedOrganizationFilter,
  ]);

  const { currentUsers, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const current = filteredUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    return {
      currentUsers: current,
      totalPages: total,
    };
  }, [filteredUsers, currentPage]);

  const topRef = useRef<HTMLDivElement>(null);

  const handlePageChange = useCallback((page: number, shouldScroll = true) => {
    setCurrentPage(page);
    if (shouldScroll && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedLocationFilter, debouncedOrganizationFilter, searchTerm]);

  const toggleExpanded = useCallback((userId: string) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  }, []);

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <div ref={topRef} className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            {/* Location Filter */}
            <div className="relative group flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10">
                <MapPin size={18} />
              </div>
              <Input
                type="text"
                placeholder="Filter by location"
                value={localLocationFilter}
                onChange={(e) => setLocalLocationFilter(e.target.value)}
                className="pl-11 pr-10"
              />
              {localLocationFilter && (
                <Button
                  onClick={() => setLocalLocationFilter("")}
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <X size={16} />
                </Button>
              )}
            </div>

            {/* Organization Filter */}
            <div className="relative group flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10">
                <Building2 size={18} />
              </div>
              <Input
                type="text"
                placeholder="Filter by organization"
                value={localOrganizationFilter}
                onChange={(e) => setLocalOrganizationFilter(e.target.value)}
                className="pl-11 pr-10"
              />
              {localOrganizationFilter && (
                <Button
                  onClick={() => setLocalOrganizationFilter("")}
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentUsers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className="group relative bg-card border border-border rounded-xl overflow-hidden
                      hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                {/* Header Section - Fixed Height */}
                <div className="p-6 pb-4 border-b border-border/50">
                  <div className="flex items-start gap-4">
                    <Image
                      src={user.avatar_url}
                      alt={user.login}
                      className="rounded-full flex-shrink-0 ring-2 ring-border group-hover:ring-primary/50 transition-all"
                      width={64}
                      height={64}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {user.login}
                      </h3>
                      {user.name && (
                        <p className="text-sm text-muted-foreground truncate mt-0.5">{user.name}</p>
                      )}
                      <Link
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
                        title="View on GitHub"
                      >
                        View Profile <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Content Section - Variable Height */}
                <div className="p-6 pt-4 space-y-3">
                  {user.bio && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {user.bio}
                    </p>
                  )}

                  {(user.location || user.company) && (
                    <div className="flex flex-wrap gap-3 text-sm pt-2">
                      {user.location && (
                        <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                          <MapPin size={13} />
                          <span className="text-xs">{user.location}</span>
                        </div>
                      )}
                      {user.company && (
                        <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                          <Building2 size={13} />
                          <span className="text-xs">{user.company.replace('@', '')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {(user.blog || user.twitter_username || user.email) && (
                    <>
                      <button
                        onClick={() => toggleExpanded(user.login)}
                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium pt-2"
                      >
                        {expandedUsers[user.login] ? '▲ Show Less' : '▼ Show More'}
                      </button>

                      {expandedUsers[user.login] && (
                        <div className="pt-3 mt-3 border-t border-border/50">
                          <DynamicData user={user} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center text-gray-400 py-8">
          No users found matching your search criteria.
        </div>
      )}
    </div>
  );
}
