import { Skeleton } from "@/src/components/ui/skeleton";

interface CategoryFilterSkeletonProps {
    count?: number;
}

export default function CategoryFilterSkeleton({
    count = 6
}: CategoryFilterSkeletonProps) {
    
    return (
        <div className="flex flex-wrap justify-center gap-2 px-4 py-2">
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton
                    className="h-8 w-24 rounded-md"
                    key={`category-skeleton-${index}`}
                />
            ))}
        </div>
    );
}
