import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonUserCard() {
  return (
    <Card className="p-6">
      <div className="mt-2 flex items-center justify-between space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <Skeleton className="h-8 w-8 rounded" />
      </div>

      {/* Skeleton for additional data */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  );
}
