import { getLanguageColor } from "@/lib/languageColor";
import { Repo } from "@/types/types";
import { ExternalLink, Globe, Star, GitFork, Eye, Calendar } from "lucide-react";
import Link from "next/link";

type RepoCardProps = {
  repo: Repo;
};

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div
      key={repo.id}
      className="group relative bg-card border border-border rounded-xl overflow-hidden
                 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
    >
      {/* Header Section */}
      <div className="p-6 pb-4 border-b border-border/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {repo.owner && (
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm text-muted-foreground">
                  {repo.owner.login} /
                </span>
              </div>
            )}
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {repo.name}
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                title="View Repository"
              >
                View Repo <ExternalLink size={12} />
              </Link>
              {repo.homepage && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    title="View Live Site"
                  >
                    Live Demo <Globe size={12} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-4 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {repo.description || "No description provided."}
        </p>

        {/* Language and Stats */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {repo.language && (
            <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
              <span
                className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}
              />
              <span className="text-xs">{repo.language}</span>
            </div>
          )}
          {repo.stargazers_count !== undefined && repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star size={13} />
              <span className="text-xs">{repo.stargazers_count}</span>
            </div>
          )}
          {repo.forks_count !== undefined && repo.forks_count > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <GitFork size={13} />
              <span className="text-xs">{repo.forks_count}</span>
            </div>
          )}
          {repo.watchers_count !== undefined && repo.watchers_count > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye size={13} />
              <span className="text-xs">{repo.watchers_count}</span>
            </div>
          )}
        </div>

        {/* Last Updated */}
        {repo.updated_at && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <Calendar size={12} />
            <span>Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        )}
      </div>
    </div>
  );
}
