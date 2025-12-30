"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { landingContent } from "@/lib/constants/landing-content";
import StaggerContainer, { StaggerItem } from "./animation-wrappers/stagger-container";
import {
  Search,
  Users,
  TrendingUp,
  BookOpen,
  Activity,
  GitPullRequest
} from "lucide-react";

const iconMap = {
  Search: Search,
  Users: Users,
  TrendingUp: TrendingUp,
  BookOpen: BookOpen,
  Activity: Activity,
  GitPullRequest: GitPullRequest,
};

export default function UseCasesSection() {
  const { useCases } = landingContent;

  return (
    <section className="section-padding" id="use-cases" aria-labelledby="use-cases-heading">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="use-cases-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Built for Every Developer Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            From open-source discovery to hiring talent, RepoVision adapts to your workflow
          </p>
        </div>

        {/* Use Cases Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const IconComponent = iconMap[useCase.icon as keyof typeof iconMap];

            return (
              <StaggerItem key={index}>
                <Card className="group p-6 h-full hover-lift border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground">
                      {useCase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Benefit Tag */}
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 border-none"
                    >
                      {useCase.benefitTag}
                    </Badge>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
