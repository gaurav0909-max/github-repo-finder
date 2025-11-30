import { ExternalLink, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BsTwitter } from "react-icons/bs";

interface User {
  bio?: string;
  location?: string;
  blog?: string;
  twitter_username?: string;
  email?: string;
}

interface DynamicDataProps {
  user: User;
}

export default function DynamicData({ user }: DynamicDataProps) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {user.blog && (
        <Link
          href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink size={16} />
          <span>{user.blog}</span>
        </Link>
      )}
      {user.twitter_username && (
        <Link
          href={`https://x.com/${user.twitter_username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <BsTwitter size={16} />
          <span>@{user.twitter_username}</span>
        </Link>
      )}
      {user.email && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail size={16} />
          <span>{user.email}</span>
        </p>
      )}
    </div>
  );
}
