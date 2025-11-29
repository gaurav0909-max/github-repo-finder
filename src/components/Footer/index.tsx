import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground md:text-base">
            Powered by{" "}
            <span className="gradient-text font-semibold">RepoVision</span> -
            Your gateway to discovering open-source greatness.
          </p>
        </div>
      </div>
    </footer>
  );
}
