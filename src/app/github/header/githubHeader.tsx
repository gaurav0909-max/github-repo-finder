import Image from "next/image";
import React from "react";

interface Profile {
  avatar_url: string;
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
    <div className="flex items-center justify-center space-x-12">
      {profile && (
        <Image
          src={profile.avatar_url}
          alt={`${username}'s profile`}
          className="rounded-full border-4 border-primary"
          width={100}
          height={100}
        />
      )}
      <div>
        <h1 className="gradient-text text-4xl font-bold">
          {searchType === "repos"
            ? `Repositories of ${username}`
            : `Users starting with ${username}`}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {searchType === "repos"
            ? `Exploring ${repos.length} repositories`
            : `Found ${total} users`}
        </p>
      </div>
    </div>
  );
}
