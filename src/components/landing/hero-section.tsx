"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { landingContent } from "@/lib/constants/landing-content";
import StaggerContainer, { StaggerItem } from "./animation-wrappers/stagger-container";

export default function HeroSection() {
  const { hero } = landingContent;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-6">
        <StaggerContainer className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <StaggerItem>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              {hero.badge}
            </Badge>
          </StaggerItem>

          {/* Headline with gradient */}
          <StaggerItem className="w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {hero.headline}{" "}
              <span className="gradient-text">{hero.headlineGradient}</span>
            </h1>
          </StaggerItem>

          {/* Subheadline */}
          <StaggerItem className="w-full">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {hero.subheadline}
            </p>
          </StaggerItem>

          {/* CTAs */}
          <StaggerItem className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 min-w-[200px]">
                <Link href={hero.primaryCTA.href}>{hero.primaryCTA.text} →</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 min-w-[200px]"
              >
                <Link href={hero.secondaryCTA.href}>
                  {hero.secondaryCTA.text}
                </Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
