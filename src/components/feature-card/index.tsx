import React from "react";
import { featureItems } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function FeatureCard() {
  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featureItems.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-6 transition-all duration-200 hover:shadow-lg"
            >
              {/* Icon container */}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="text-xl">{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
