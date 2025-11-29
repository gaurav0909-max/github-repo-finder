import Image from "next/image";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitFork, Star } from "lucide-react";

interface Profile {
  avatar_url: string;
  name?: string;
  bio?: string;
  location?: string;
  company?: string;
  blog?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

interface GithubHeaderProps {
  profile: Profile | null;
  searchType: "repos" | "users";
  repos: any[];
  users: any[];
  username: string;
  total: number;
}

export default function GithubHeader({
  profile,
  searchType,
  repos,
  users,
  username,
  total,
}: GithubHeaderProps) {
  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {profile && (
          <Image
            src={profile.avatar_url}
            alt={`${username}'s profile`}
            className="rounded-full border-2 border-border"
            width={80}
            height={80}
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {searchType === "repos" ? username : `Users: ${username}`}
            </h1>
            {searchType === "repos" && (
              <Badge variant="outline">{repos.length} repos</Badge>
            )}
          </div>

          {profile?.bio && (
            <p className="text-muted-foreground mb-3">{profile.bio}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {searchType === "repos" ? (
              <>
                {profile?.public_repos !== undefined && (
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>{profile.public_repos} repositories</span>
                  </div>
                )}
                {profile?.followers !== undefined && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{profile.followers} followers</span>
                  </div>
                )}
              </>
            ) : (
              <p>Found {total} users</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
