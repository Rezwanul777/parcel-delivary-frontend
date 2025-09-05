import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] rounded-md border border-gray-800">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 border-b bg-gray-600 px-4 py-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 border-b px-4 py-4"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;