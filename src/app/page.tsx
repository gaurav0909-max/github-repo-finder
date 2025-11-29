"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import FeatureCard from "@/components/feature-card";
import Footer from "@/components/Footer";

export default function Home() {
  const [username, setUsername] = useState("");
  const [searchType, setSearchType] = useState<"users" | "repos">("users");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/github?searchType=${searchType}&username=${username}`);
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

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center space-y-8 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-[800px] text-center">
          <Badge variant="outline" className="mb-4">
            Discover Open Source
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Explore GitHub
            <span className="gradient-text"> Projects</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Search for repositories, discover talented developers, and explore
            amazing open-source projects all in one place.
          </p>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-[600px] space-y-4">
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
                  : "Enter username to see repos..."
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

        {/* Stats */}
        <div className="grid w-full max-w-[800px] gap-4 sm:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">1M+</div>
            <div className="text-sm text-muted-foreground">Repositories</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">100K+</div>
            <div className="text-sm text-muted-foreground">Developers</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Organizations</div>
          </Card>
        </div>

        {/* CTA Link */}
        <Link href="/organizations">
          <Button variant="outline" size="lg">
            Explore Organizations →
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <FeatureCard />

      {/* Footer */}
      <Footer />
    </main>
  );
}
