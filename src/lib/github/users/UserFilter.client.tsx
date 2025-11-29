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
  // Local state for filter inputs (for debouncing)
  const [localLocationFilter, setLocalLocationFilter] = useState("");
  const [localOrganizationFilter, setLocalOrganizationFilter] = useState("");

  // Debounced values (300ms delay)
  const debouncedLocationFilter = useDebouncedValue(localLocationFilter, 300);
  const debouncedOrganizationFilter = useDebouncedValue(localOrganizationFilter, 300);

  const [componentData, setComponentData] = useState<{
    detailedUsers: UserData[];
    isLoading: boolean;
    searchTerm: string;
    locationFilter: string;
    organizationFilter: string;
    currentPage: number;
    expandedUsers: Record<string, boolean>;
  }>({
    detailedUsers: [],
    isLoading: true,
    searchTerm: "",
    locationFilter: "",
    organizationFilter: "",
    currentPage: 1,
    expandedUsers: {},
  });

  // Memoize users to prevent unnecessary re-fetches
  const userLogins = useMemo(() => users.map(u => u.login).join(','), [users]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      // Check if we already have this data cached
      if (componentData.detailedUsers.length === users.length) {
        const allUsersMatch = users.every((user, index) =>
          componentData.detailedUsers[index]?.login === user.login
        );
        if (allUsersMatch) {
          return; // Skip fetch if data hasn't changed
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
                throw new Error(`Failed to fetch data for ${user.login}`);
              }
              const data = await response.json();
              return { ...user, ...data };
            } catch (error) {
              console.error(`Error fetching data for ${user.login}:`, error);
              return { ...user, bio: "Error fetching bio" };
            }
          })
        );

        if (isMounted) {
          setComponentData((prev) => ({
            ...prev,
            detailedUsers: updatedUsers,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        if (isMounted) {
          setComponentData((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, [userLogins]);

  const filteredUsers = useMemo(() => {
    return componentData.detailedUsers.filter((user) => {
      const searchLower = componentData.searchTerm.toLowerCase();
      const locationLower = componentData.locationFilter.toLowerCase();
      const organizationLower = componentData.organizationFilter.toLowerCase();

      const matchesSearch =
        !componentData.searchTerm ||
        user.login.toLowerCase().includes(searchLower) ||
        user.type.toLowerCase().includes(searchLower) ||
        (user.bio && user.bio.toLowerCase().includes(searchLower));

      const matchesLocation =
        !componentData.locationFilter ||
        (user.location && user.location.toLowerCase().includes(locationLower));

      const matchesOrganization =
        !componentData.organizationFilter ||
        (user?.company &&
          user?.company.toLowerCase().includes(organizationLower));

      return matchesSearch && matchesLocation && matchesOrganization;
    });
  }, [
    componentData.detailedUsers,
    componentData.searchTerm,
    componentData.locationFilter,
    componentData.organizationFilter,
  ]);

  const { currentUsers, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (componentData.currentPage - 1) * ITEMS_PER_PAGE;
    const current = filteredUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    return {
      currentUsers: current,
      totalPages: total,
    };
  }, [filteredUsers, componentData.currentPage]);

  const topRef = useRef<HTMLDivElement>(null);

  const handlePageChange = useCallback((page: number, shouldScroll = true) => {
    setComponentData((prev) => ({
      ...prev,
      currentPage: page,
    }));
    if (shouldScroll && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Sync debounced filter values to actual state (without triggering scroll)
  useEffect(() => {
    if (debouncedLocationFilter !== componentData.locationFilter) {
      setComponentData((prev) => ({
        ...prev,
        locationFilter: debouncedLocationFilter,
        currentPage: 1,
      }));
    }
  }, [debouncedLocationFilter, componentData.locationFilter]);

  useEffect(() => {
    if (debouncedOrganizationFilter !== componentData.organizationFilter) {
      setComponentData((prev) => ({
        ...prev,
        organizationFilter: debouncedOrganizationFilter,
        currentPage: 1,
      }));
    }
  }, [debouncedOrganizationFilter, componentData.organizationFilter]);

  const handleSearch = useCallback((value: string) => {
    setComponentData((prev) => ({
      ...prev,
      searchTerm: value,
      currentPage: 1,
    }));
  }, []);

  const handleLocationFilter = useCallback((value: string) => {
    setComponentData((prev) => ({
      ...prev,
      locationFilter: value,
      currentPage: 1,
    }));
  }, []);

  const handleOrganizationFilter = useCallback((value: string) => {
    setComponentData((prev) => ({
      ...prev,
      organizationFilter: value,
      currentPage: 1,
    }));
  }, []);

  const toggleExpanded = useCallback((userId: string) => {
    setComponentData((prev) => {
      const newExpandedUsers = { ...prev.expandedUsers };
      newExpandedUsers[userId] = !newExpandedUsers[userId];
      return { ...prev, expandedUsers: newExpandedUsers };
    });
  }, []);

  if (componentData.isLoading) {
    return <LoaderPage />;
  }

  return (
    <div ref={topRef} className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search users..."
            value={componentData.searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
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
                  onClick={() => {
                    setLocalLocationFilter("");
                    handleLocationFilter("");
                  }}
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
                  onClick={() => {
                    setLocalOrganizationFilter("");
                    handleOrganizationFilter("");
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
        </div>
      </div>

      {currentUsers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[800px]">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className="group relative bg-card/50 backdrop-blur-sm border border-border
                      rounded-xl p-6 hover:bg-card/70 transition-all duration-300"
              >
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <Image
                      src={user.avatar_url}
                      alt={user.login}
                      className="rounded-full"
                      width={100}
                      height={100}
                    />
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {user.login}
                    </h3>
                    <Link
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 rounded-lg bg-muted hover:bg-secondary
                          transition-colors duration-300"
                    >
                      <ExternalLink
                        size={20}
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </Link>
                  </div>
                </div>

                <div className="mt-4 text-muted-foreground">
                  {user.bio && (
                    <>
                      <p className="text-sm text-balance">{user.bio}</p>
                      {(user.blog ||
                        user.location ||
                        user.twitter_username ||
                        user.email) && (
                        <button
                          onClick={() => toggleExpanded(user.login)}
                          className="text-accent hover:text-accent"
                        >
                          Show More
                        </button>
                      )}
                    </>
                  )}

                  {componentData.expandedUsers[user.login] && (
                    <>
                      <DynamicData user={user} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={componentData.currentPage}
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
