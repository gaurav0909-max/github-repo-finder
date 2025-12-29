"use client";

import { Card } from "@/components/ui/card";
import { landingContent } from "@/lib/constants/landing-content";
import CounterAnimation from "./animation-wrappers/counter-animation";
import StaggerContainer, { StaggerItem } from "./animation-wrappers/stagger-container";

export default function StatsSection() {
  const { stats } = landingContent;

  return (
    <section className="section-padding-sm bg-muted/30">
      <div className="container mx-auto px-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            // Parse numeric value for counter animation
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ""), 10);
            const hasPlus = stat.value.includes("+");
            const hasK = stat.value.includes("K");
            const hasM = stat.value.includes("M");
            const hasMin = stat.value.includes("min");

            return (
              <StaggerItem key={index}>
                <Card className="p-6 text-center hover-lift border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="space-y-2">
                    {/* Animated Counter */}
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {numericValue ? (
                        <CounterAnimation
                          target={numericValue}
                          suffix={
                            hasM ? "M+" : hasK ? "K+" : hasPlus ? "+" : hasMin ? " min" : ""
                          }
                        />
                      ) : (
                        stat.value
                      )}
                    </div>

                    {/* Label */}
                    <div className="text-lg font-semibold text-foreground">
                      {stat.label}
                    </div>

                    {/* Sublabel */}
                    <div className="text-sm text-muted-foreground">
                      {stat.sublabel}
                    </div>
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
