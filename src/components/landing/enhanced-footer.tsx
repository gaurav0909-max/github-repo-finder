"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { landingContent } from "@/lib/constants/landing-content";

export default function EnhancedFooter() {
  const { footer } = landingContent;

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Github className="h-6 w-6" />
              <span className="font-bold text-lg">{footer.brand.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {footer.brand.description}
            </p>
            <p className="text-xs text-muted-foreground italic">
              {footer.brand.tagline}
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2">
              {footer.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              {footer.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              {footer.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Buy Me a Coffee Button */}
            <div className="pt-2">
              <a
                href="https://buymeacoffee.com/gauravpatel09"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-gray-900 transition-colors shadow-sm hover:shadow-md"
              >
                <span>☕</span>
                <span>Buy me a coffee</span>
              </a>
            </div>

            {/* GitHub Icon */}
            <div className="pt-2">
              <a
                href="https://github.com/gaurav0909-max/github-repo-finder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-muted hover:bg-muted-foreground/20 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {footer.bottomBar}
            </p>
            <a
              href="https://buymeacoffee.com/gauravpatel09"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-gray-900 transition-colors shadow-sm hover:shadow-md"
            >
              <span>☕</span>
              <span>Support this project</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
