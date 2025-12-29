"use client";

import { Card } from "@/components/ui/card";
import { landingContent } from "@/lib/constants/landing-content";
import StaggerContainer, { StaggerItem } from "./animation-wrappers/stagger-container";
import {
  Filter,
  Database,
  Zap,
  UserCheck,
  Share2,
  Sparkles
} from "lucide-react";

const iconMap = {
  Filter: Filter,
  Database: Database,
  Zap: Zap,
  UserCheck: UserCheck,
  Share2: Share2,
  Sparkles: Sparkles,
};

export default function BenefitsGrid() {
  const { benefits } = landingContent;

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why RepoVision Beats Manual Search
          </h2>
          <p className="text-lg text-muted-foreground">
            Advanced features that make GitHub discovery faster, smarter, and more efficient
          </p>
        </div>

        {/* Benefits Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];

            return (
              <StaggerItem key={index}>
                <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                  <div className="space-y-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
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
