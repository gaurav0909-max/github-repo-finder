export const landingContent = {
  hero: {
    badge: "Search 1M+ GitHub repositories • Access 100K+ developer profiles",
    headline: "Discover GitHub's Hidden Gems",
    headlineGradient: "in Seconds",
    subheadline:
      "Stop wasting hours manually searching GitHub. RepoVision helps developers, recruiters, and teams find repositories, talent, and insights 10x faster.",
    primaryCTA: { text: "Start Exploring", href: "/github" },
    secondaryCTA: { text: "View Demo", href: "#features" },
  },

  stats: [
    { value: "1M+", label: "Repositories", sublabel: "Searchable on GitHub" },
    { value: "100K+", label: "Developers", sublabel: "Developer profiles" },
    {
      value: "50K+",
      label: "Organizations",
      sublabel: "Public organizations",
    },
    { value: "10 min", label: "Time Saved", sublabel: "Per search session" },
  ],

  useCases: [
    {
      icon: "Search",
      title: "Find the Perfect Library",
      description:
        "Compare charting libraries, authentication tools, or any package by stars, activity, and community health. Make informed decisions in minutes, not hours.",
      benefitTag: "Save 5+ hours",
    },
    {
      icon: "Users",
      title: "Hire Top Developer Talent",
      description:
        "Search developers by location, language expertise, and contribution history. Assess candidates beyond resumes by viewing real code and project involvement.",
      benefitTag: "Find candidates faster",
    },
    {
      icon: "TrendingUp",
      title: "Analyze Competitor Tech Stacks",
      description:
        "Research any company's open-source strategy, technology choices, and development velocity. Uncover insights from public repositories.",
      benefitTag: "Strategic intelligence",
    },
    {
      icon: "BookOpen",
      title: "Learn from Production Code",
      description:
        "Study well-architected, battle-tested examples of React, Node.js, Python, and more. Browse 1000+ star projects with active maintenance.",
      benefitTag: "Real-world examples",
    },
    {
      icon: "Activity",
      title: "Track Emerging Technologies",
      description:
        "Discover trending AI/ML tools, blockchain projects, or web3 frameworks. Identify market gaps and adoption patterns before competitors.",
      benefitTag: "Stay ahead",
    },
    {
      icon: "GitPullRequest",
      title: "Find Contribution Opportunities",
      description:
        "Filter beginner-friendly projects by language and activity. Connect with welcoming maintainers and grow your portfolio.",
      benefitTag: "Give back to OSS",
    },
  ],

  benefits: [
    {
      title: "Advanced Filtering",
      description:
        "20+ languages, date ranges, topics, stars/forks minimums - filters that actually work",
      icon: "Filter",
    },
    {
      title: "Massive Scale",
      description:
        "Access 295,000+ search results vs GitHub's 1,000 result limit",
      icon: "Database",
    },
    {
      title: "Smart Caching",
      description:
        "10-minute intelligent cache = instant results + 60% fewer rate limits",
      icon: "Zap",
    },
    {
      title: "Developer Profiles",
      description:
        "Filter users by location, company, contributions - perfect for recruiting",
      icon: "UserCheck",
    },
    {
      title: "Shareable Results",
      description:
        "URL-based state management - bookmark and share filtered searches",
      icon: "Share2",
    },
    {
      title: "Beautiful UX",
      description:
        "Dark mode, responsive design, keyboard shortcuts, and smooth animations",
      icon: "Sparkles",
    },
  ],

  features: [
    {
      title: "Search 1M+ Repositories with Surgical Precision",
      description:
        "Full-text search across GitHub's entire database. Filter by language, stars, forks, topics, and dates. Sort by relevance, popularity, or recent activity.",
      bullets: [
        "295,000+ accessible results (vs GitHub's 1,000)",
        "20+ programming language filters",
        "Real-time sorting and filtering",
      ],
      image: "/images/feature-1.png",
      imagePosition: "left" as const,
    },
    {
      title: "Find Top Talent by Location & Expertise",
      description:
        "Access 100K+ developer profiles with filters GitHub doesn't offer. Perfect for recruiting, hiring, or finding collaborators.",
      bullets: [
        "Location and company filters",
        "View contribution history and repositories",
        "Export candidate profiles",
      ],
      image: "/images/feature-2.png",
      imagePosition: "right" as const,
    },
    {
      title: "Research 50K+ Companies & Communities",
      description:
        "Explore tech companies, open-source foundations, and developer communities. Analyze their tech stack, repo activity, and team size.",
      bullets: [
        "Verified organization badges",
        "Browse by creation year",
        "View member counts and repositories",
      ],
      image: "/images/feature-3.png",
      imagePosition: "left" as const,
    },
  ],

  finalCTA: {
    headline: "Ready to Discover Better Code?",
    subheadline:
      "Search millions of GitHub repositories and find projects 10x faster",
    cta: { text: "Start Exploring Now", href: "/github" },
    trustSignal: "Free forever • No signup required • Access 1M+ repositories",
  },

  footer: {
    brand: {
      name: "RepoVision",
      tagline: "Explore GitHub Projects · Discover Developers",
      description: "The fastest way to discover GitHub repositories, developers, and organizations.",
    },
    product: [
      { text: "Features", href: "#features" },
      { text: "Use Cases", href: "#use-cases" },
      { text: "Organizations", href: "/organizations" },
      { text: "GitHub Search", href: "/github" },
    ],
    resources: [
      { text: "GitHub Repository", href: "https://github.com/gaurav0909-max/github-repo-finder", external: true },
      { text: "Report Bug", href: "https://github.com/gaurav0909-max/github-repo-finder/issues", external: true },
      { text: "Request Feature", href: "https://github.com/gaurav0909-max/github-repo-finder/issues", external: true },
    ],
    legal: [
      { text: "MIT License", href: "https://github.com/gaurav0909-max/github-repo-finder/blob/master/LICENSE", external: true },
    ],
    bottomBar: "© 2025 RepoVision. Built with Next.js & GitHub API",
  },
};
