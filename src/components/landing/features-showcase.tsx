"use client";

import Image from "next/image";
import { landingContent } from "@/lib/constants/landing-content";
import FadeInWrapper from "./animation-wrappers/fade-in-wrapper";

export default function FeaturesShowcase() {
  const { features } = landingContent;

  return (
    <section className="section-padding" id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Serious Developers
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to master GitHub discovery and find exactly what you're looking for
          </p>
        </div>

        {/* Features */}
        <div className="space-y-32">
          {features.map((feature, index) => {
            const isLeft = feature.imagePosition === "left";

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-16 items-center`}
              >
                {/* Image Side */}
                <FadeInWrapper
                  direction={isLeft ? "left" : "right"}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-2xl bg-muted/50">
                    {/* Placeholder or actual image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4 text-primary/20">
                          {index === 0 ? "🔍" : index === 1 ? "👥" : "🏢"}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Feature Screenshot Placeholder
                        </p>
                      </div>
                    </div>
                    {/* Uncomment when you have actual images */}
                    {/* <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    /> */}
                  </div>
                </FadeInWrapper>

                {/* Content Side */}
                <FadeInWrapper
                  direction={isLeft ? "right" : "left"}
                  className="flex-1 w-full"
                >
                  <div className="space-y-6">
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-3 list-disc list-inside">
                      {feature.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="text-muted-foreground leading-relaxed"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
