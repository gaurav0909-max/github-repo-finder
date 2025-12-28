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
              className="group p-6 transition-all duration-300 bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/5"
            >
              {/* Icon container */}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-400 dark:bg-slate-800 text-primary transition-colors duration-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-600">
                <span className="text-xl">{feature.icon}</span>
              </div>

              {/* Title */}
              <h2 className="mb-3 text-xl font-semibold text-primary">
                {feature.title}
              </h2>

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
