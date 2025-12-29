"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import HeroSection from "@/components/landing/hero-section";
import StatsSection from "@/components/landing/stats-section";
import UseCasesSection from "@/components/landing/use-cases-section";
import BenefitsGrid from "@/components/landing/benefits-grid";
import FeatureCard from "@/components/feature-card";
import Footer from "@/components/Footer";

export default function Home() {
  const [username, setUsername] = useState("");
  const [searchType, setSearchType] = useState<"users" | "repos">("users");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      if (searchType === "repos") {
        // Global repository search - use 'q' parameter
        router.push(`/github?searchType=repos&q=${encodeURIComponent(username)}`);
      } else {
        // User search - use 'username' parameter
        router.push(`/github?searchType=users&username=${encodeURIComponent(username)}`);
      }
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Github className="h-6 w-6" />
              <span className="font-bold">RepoVision</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/organizations"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Organizations
              </Link>
              <a
                href="https://github.com/gaurav0909-max/github-repo-finder"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                GitHub
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* New Hero Section */}
      <HeroSection />

      {/* Search Form Section */}
      <section className="container px-4 py-12">
        <div className="w-full max-w-[600px] mx-auto space-y-4">
          <Tabs
            value={searchType}
            onValueChange={(value) => setSearchType(value as "users" | "repos")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">Search Users</TabsTrigger>
              <TabsTrigger value="repos">Search Repositories</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder={
                searchType === "users"
                  ? "Enter GitHub username..."
                  : "Search repositories (e.g., 'react', 'socket.io')..."
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* New Stats Section */}
      <StatsSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Benefits Grid */}
      <BenefitsGrid />

      {/* Features Section */}
      <FeatureCard />

      {/* Footer */}
      <Footer />
    </main>
  );
}
