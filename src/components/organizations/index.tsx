"use client";

import React, { useState } from "react";
import { Users, Link2, MapPin, Calendar, GitFork, Building2 } from "lucide-react";
import Pagination from "../pagination";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function Organization({ data }: OrganizationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Paginated Data
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-4 py-2">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Organizations</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentData.map((org) => (
          <Card key={org.id} className="p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex items-center space-x-4">
              <Image
                src={org.avatar_url}
                alt={`${org.login} avatar`}
                width={64}
                height={64}
                className="rounded-full border border-border"
              />
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {org.login}
                </h2>
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
                <Users className="h-4 w-4" />
                <span>{org.public_members_count || 0} Members</span>
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <GitFork className="h-4 w-4" />
                <span>{org.public_repos || 0} Repositories</span>
              </div>

              {org.created_at && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created {new Date(org.created_at).toLocaleDateString()}
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
                <Badge variant="success">Verified</Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
