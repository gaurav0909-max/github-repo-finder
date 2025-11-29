import Link from "next/link";
import React from "react";
import { Building2 } from "lucide-react";

export default function Explore() {
  return (
    <div className="flex items-center justify-center">
      <Link
        href="/organizations"
        className="group my-6 flex max-w-[400px] items-center justify-center gap-3 rounded-lg border border-border bg-card px-6 py-4 font-semibold text-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/50"
      >
        <Building2 className="h-5 w-5 text-primary" />
        <span className="text-base sm:text-lg">Explore Organizations</span>
      </Link>
    </div>
  );
}
