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
import FeaturesShowcase from "@/components/landing/features-showcase";
import FinalCTASection from "@/components/landing/final-cta-section";
import EnhancedFooter from "@/components/landing/enhanced-footer";

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
              <a
                href="#features"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Features
              </a>
              <a
                href="#use-cases"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Use Cases
              </a>
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
              <a
                href="https://buymeacoffee.com/gauravpatel09"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-gray-900 transition-colors"
              >
                <span>☕</span>
                <span>Support</span>
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* New Hero Section */}
      <HeroSection />

      {/* Search Form Section - Core Feature */}
      <section className="container px-4 py-12">
        {/* Highlighted Container for Core Search Feature */}
        <div className="w-full max-w-[600px] mx-auto relative">
          {/* Glow effect background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl" />

          {/* Main search container with emphasis */}
          <div className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-6 shadow-2xl shadow-primary/10 space-y-4">
            {/* Optional: Add a badge or label */}
            <div className="flex items-center justify-center mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                Start Your Search Here
              </span>
            </div>

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
                className="flex-1 border-primary/30 focus-visible:ring-primary"
              />
              <Button type="submit" size="lg" className="px-8">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* New Stats Section */}
      <StatsSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Benefits Grid */}
      <BenefitsGrid />

      {/* Features Showcase */}
      <FeaturesShowcase />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </main>
  );
}
