import { Skeleton } from "@/src/components/ui/skeleton";

interface ProductGridSkeletonProps {
    count?: number;
}

export default function ProductGridSkeleton({
    count = 6
}: ProductGridSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div className="rounded-xl p-4 w-full sm:w-1/2 lg:w-1/3" key={`product-skeleton-${index}`}>
                    <div className="relative mx-auto w-full rounded-xl border bg-card p-4">
                        <Skeleton className="h-[240px] w-full rounded-xl" />
                        <div className="mt-4 space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-7 w-1/3" />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-10 w-1/4" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
