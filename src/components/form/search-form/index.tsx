"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchFormProps } from "@/types/types";
import { usernameWithoutSpaces } from "@/lib/helper";

export default function SearchForm({
  username,
  setUsername,
  searchType,
  setSearchType,
}: SearchFormProps) {
  const router = useRouter();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const TrimmedUsername = usernameWithoutSpaces(username);
      if (TrimmedUsername) {
        router.push(
          `/github?searchType=${searchType}&username=${TrimmedUsername}`
        );
      }
    },
    [username, searchType, router]
  );

  const changeSearchType = useCallback(() => {
    setSearchType(searchType === "users" ? "repos" : "users");
  }, [searchType, setSearchType]);

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-0 sm:flex sm:gap-4"
    >
      <div className="relative w-full">
        <div className="flex w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Enter GitHub ${searchType}`}
            className="w-full px-4 py-4 pr-20 rounded-xl text-lg bg-foreground/10 backdrop-blur-md
           text-foreground placeholder:text-muted-foreground border border-border/20
           shadow-lg focus:ring-2 focus:ring-ring focus:border-transparent
           outline-none transition-all duration-300"
          />

          <button
            type="button"
            onClick={changeSearchType}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-4 text-sm text-muted-foreground
           rounded-xl border-2 border-border/20 bg-foreground/10 backdrop-blur-md
           hover:bg-foreground/20 transition-all duration-300 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {searchType === "users" ? "Users" : "Repositories"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={!username.trim()}
        className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent to-accent
        text-white rounded-xl font-medium text-lg shadow-lg
        transition-all duration-300 focus:ring-2
        focus:ring-ring focus:ring-offset-2
        focus:ring-offset-transparent
        ${
          !username.trim()
            ? "cursor-not-allowed opacity-50"
            : "hover:shadow-accent/25 hover:from-accent hover:to-primary"
        }`}
      >
        Search
      </button>
    </form>
  );
}
