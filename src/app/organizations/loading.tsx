import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Organizations</h1>

      {/* Search Bar Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Filter and Sort Skeletons */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <Skeleton className="h-9 w-[80px]" />
        <Skeleton className="h-9 w-[120px]" />
        <Skeleton className="h-9 w-[130px]" />
      </div>

      {/* Organization Cards Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-[600px]">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="mb-4 flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-6 w-32 mb-2" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-10 w-[300px]" />
      </div>
    </div>
  );
}
