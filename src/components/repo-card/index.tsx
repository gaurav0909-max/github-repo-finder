import { getLanguageColor } from "@/lib/languageColor";
import { Repo } from "@/types/types";
import { ExternalLink, Globe } from "lucide-react";
import Link from "next/link";

type RepoCardProps = {
  repo: Repo;
};

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div
      key={repo.id}
      className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 
                 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className="text-xl font-semibold text-gray-100 group-hover:text-teal-400 
                     transition-colors duration-300"
          >
            {repo.name}
          </h3>
          <p className="mt-2 text-gray-400 line-clamp-2 text-pretty">
            {repo.description || "No description provided."}
          </p>
        </div>
        <div className="ml-4 flex flex-col gap-2">
          <Link
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 
                     transition-colors duration-300"
            title="View Repository"
          >
            <ExternalLink
              size={20}
              className="text-gray-400 hover:text-white"
            />
          </Link>
          {repo.homepage && (
            <Link
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 
                       transition-colors duration-300"
              title="View Deployed Site"
            >
              <Globe size={20} className="text-teal-400 hover:text-teal-300" />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {repo.language && (
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${getLanguageColor(
                  repo.language
                )}`}
              />
              <span className="text-sm text-gray-400">{repo.language}</span>
            </div>
          )}
        </div>
        {repo.updated_at && (
          <div className="flex items-center gap-2 text-gray-400">
            <p className="text-md">Last updated:</p>
            <span className="text-sm">
              {new Date(repo.updated_at).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
