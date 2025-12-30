"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { landingContent } from "@/lib/constants/landing-content";
import FadeInWrapper from "./animation-wrappers/fade-in-wrapper";

export default function FinalCTASection() {
  const { finalCTA } = landingContent;

  return (
    <section className="section-padding gradient-bg-subtle" aria-labelledby="cta-heading">
      <div className="container mx-auto px-6">
        <FadeInWrapper direction="up" className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {finalCTA.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground">
            {finalCTA.subheadline}
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button asChild size="lg" className="text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-shadow">
              <Link href={finalCTA.cta.href}>
                {finalCTA.cta.text} →
              </Link>
            </Button>
          </div>

          {/* Trust Signal */}
          <p className="text-sm text-muted-foreground pt-4">
            {finalCTA.trustSignal}
          </p>
        </FadeInWrapper>
      </div>
    </section>
  );
}
